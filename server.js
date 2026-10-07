/**
 * ALEX WEB DESIGN — production server.
 *
 * Serves the built Vite site (dist/) and exposes a server-side
 * POST /api/contact endpoint that sends project enquiries via
 * Antideploy's built-in transactional email relay.
 *
 * Email configuration comes ONLY from environment variables that
 * Antideploy injects at runtime after email is enabled for the app:
 *   - RESEND_API_KEY  (token for the platform relay)
 *   - RESEND_BASE_URL (relay endpoint, read automatically by `resend`)
 *   - EMAIL_FROM      (ready-made From value)
 *
 * No secrets are stored in this file. Never commit a .env with real values.
 *
 * Start command for Antideploy:  node server.js
 * (add  "start": "node server.js"  to package.json scripts)
 */

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// ---------------------------------------------------------------------------
// Config (no secrets here)
// ---------------------------------------------------------------------------
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "webdesigner.rn@gmail.com";

const MAX_BODY_BYTES = 32 * 1024; // 32kb — enquiries are small text payloads

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(express.json({ limit: MAX_BODY_BYTES }));
app.disable("x-powered-by");

// ---------------------------------------------------------------------------
// Simple in-memory rate limiting (per IP) + spam protection.
// Resets on restart / redeploy, which is fine for a contact form.
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_MAX_REQUESTS = 5; // max 5 enquiries per IP per window
const hitsByIp = new Map(); // ip -> array of timestamps

function isRateLimited(ip) {
  const now = Date.now();
  const key = ip || "unknown";
  const recent = (hitsByIp.get(key) || []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_MAX_REQUESTS) {
    hitsByIp.set(key, recent);
    return true;
  }
  recent.push(now);
  hitsByIp.set(key, recent);

  // Opportunistic cleanup so the map cannot grow forever.
  if (hitsByIp.size > 5000) {
    for (const [k, v] of hitsByIp) {
      if (v.length === 0 || now - v[v.length - 1] > RATE_WINDOW_MS) {
        hitsByIp.delete(k);
      }
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// Validation helpers (server-side, never trust the client)
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_WEBSITE_TYPES = new Set([
  "Business Website Design",
  "Website Redesign",
  "Landing Page Design",
  "Responsive Web Design",
  "Interactive Website Design",
]);

function asText(value, maxLen) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

/** Strip CR/LF to prevent email header injection. */
function oneLine(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------------------------------------------------------------------------
// Health check (useful for the platform + smoke tests; reveals nothing)
// ---------------------------------------------------------------------------
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// ---------------------------------------------------------------------------
// POST /api/contact — validate, rate-limit, then send via Antideploy relay
// ---------------------------------------------------------------------------
app.post("/api/contact", async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "unknown";

    if (isRateLimited(ip)) {
      return res.status(429).json({
        ok: false,
        error: "too_many_requests",
      });
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};

    // Honeypot: real users never fill this (it's hidden). Bots often do.
    // Pretend success so bots can't probe the endpoint.
    if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
      return res.json({ ok: true });
    }

    const name = asText(body.name, 100);
    const email = asText(body.email, 254).toLowerCase();
    const businessName = asText(body.businessName, 160);
    const websiteType = asText(body.websiteType, 80);
    const budget = asText(body.budget, 160); // optional
    const details = asText(body.details, 5000);

    if (!name) {
      return res.status(400).json({ ok: false, error: "name_required" });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: "email_invalid" });
    }
    if (!businessName) {
      return res.status(400).json({ ok: false, error: "business_required" });
    }
    if (!websiteType || !ALLOWED_WEBSITE_TYPES.has(websiteType)) {
      return res.status(400).json({ ok: false, error: "website_type_required" });
    }
    if (!details || details.length < 10) {
      return res.status(400).json({ ok: false, error: "details_required" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    if (!apiKey || !from) {
      // Email not enabled on this deployment yet. Log once server-side,
      // return a generic message — never reveal which variable is missing.
      console.error("[contact] email_unavailable: RESEND_API_KEY/EMAIL_FROM not set");
      return res.status(503).json({ ok: false, error: "email_unavailable" });
    }

    const subject = `New ALEX WEB DESIGN Project Enquiry — ${oneLine(businessName) || "New enquiry"}`;

    // The `resend` SDK reads RESEND_BASE_URL automatically, which points
    // at Antideploy's relay in production. Nothing else to configure.
    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; color: #111;">
        <h2 style="margin: 0 0 4px;">New project enquiry — ALEX WEB DESIGN</h2>
        <p style="margin: 0 0 16px; color: #555;">Sent from the START YOUR PROJECT contact form.</p>
        <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
          ${[
            ["Name", name],
            ["Email", email],
            ["Business Name", businessName],
            ["Website Type", websiteType],
            ["Budget", budget || "—"],
          ]
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding: 8px 12px 8px 0; font-weight: bold; vertical-align: top; white-space: nowrap;">${escapeHtml(k)}</td>
              <td style="padding: 8px 0; vertical-align: top;">${escapeHtml(v)}</td>
            </tr>`,
            )
            .join("")}
        </table>
        <h3 style="margin: 20px 0 8px;">Project Details</h3>
        <div style="white-space: pre-wrap; background: #f6f6f6; border: 1px solid #e5e5e5; border-radius: 8px; padding: 12px 14px;">${escapeHtml(details)}</div>
        <p style="margin: 16px 0 0; color: #777; font-size: 12px;">Reply directly to this email to answer ${escapeHtml(name)}.</p>
      </div>
    `.trim();

    const text = [
      "New project enquiry — ALEX WEB DESIGN",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Business Name: ${businessName}`,
      `Website Type: ${websiteType}`,
      `Budget: ${budget || "—"}`,
      "",
      "Project Details:",
      details,
    ].join("\n");

    const { error } = await resend.emails.send({
      from,
      to: CONTACT_TO_EMAIL,
      replyTo: email, // lets Alex reply straight to the potential client
      subject,
      html,
      text,
    });

    if (error) {
      // Log server-side only; the client gets a generic failure message.
      console.error("[contact] resend error:", error?.name || "send_failed");
      const status = typeof error?.statusCode === "number" ? error.statusCode : 500;
      if (status === 429) {
        return res.status(429).json({ ok: false, error: "too_many_requests" });
      }
      return res.status(502).json({ ok: false, error: "send_failed" });
    }

    return res.json({ ok: true });
  } catch (err) {
    // Never leak stack traces or env details to the visitor.
    console.error("[contact] unexpected error");
    return res.status(500).json({ ok: false, error: "send_failed" });
  }
});

// ---------------------------------------------------------------------------
// Static site (Vite build output) + SPA fallback.
// The frontend uses hash routing, so deep links work regardless.
// ---------------------------------------------------------------------------
const distDir = path.join(__dirname, "dist");
app.use(
  express.static(distDir, {
    maxAge: "1h",
    index: false, // SPA fallback below serves index.html for "/"
  }),
);

// NOTE: plain middleware (not app.get("*")) so this works on both
// Express 4 and Express 5 (where "*" string routes throw at startup).
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(distDir, "index.html"), (err) => {
    if (err) next(err);
  });
});

// Generic error handler — always a safe response, never internals.
app.use((err, _req, res, _next) => {
  if (err && (err.type === "entity.too.large" || err.status === 413)) {
    return res.status(413).json({ ok: false, error: "payload_too_large" });
  }
  if (err && err.type === "entity.parse.failed") {
    return res.status(400).json({ ok: false, error: "invalid_request" });
  }
  console.error("[server] unhandled error");
  return res.status(500).json({ ok: false, error: "send_failed" });
});

app.listen(PORT, () => {
  console.log(`ALEX WEB DESIGN server listening on port ${PORT}`);
});
