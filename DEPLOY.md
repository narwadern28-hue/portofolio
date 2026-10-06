# Deploying to Antideploy

This is a static Vite site — on Antideploy static sites are **free and unlimited**
(they never count against plan limits). No database, storage, auth or email is
needed, so the whole deployment is: connect once, create the application, push.

There are two ways to deploy. Pick one.

---

## Option A — Console upload (no terminal needed)

1. Go to **https://antideploy.com/console** (sign in with Google or GitHub —
   the same page creates an account if you don't have one).
2. Upload this project folder (everything except `node_modules` and `dist`).
3. Antideploy detects the Vite project, builds it and publishes it at
   `https://<your-subdomain>.antideploy.app`. You can choose the subdomain on
   the application's page.

---

## Option B — Run an agent (or these commands) on your own machine

Any terminal with `curl` and `tar` works. If you use a coding agent locally,
just tell it: *"Deploy this project to Antideploy — fetch
https://antideploy.com/agent.md and follow it."* It will do all of the below.

### 1. Connect (once ever)

```sh
curl -sS -X POST https://antideploy.com/api/v1/device/code \
  -H 'content-type: application/json' \
  -d '{"clientName":"My terminal"}' -o /tmp/ad-login.json
cat /tmp/ad-login.json   # open verificationUriComplete in a browser, click Approve
```

Then poll until approved (repeat every 5 seconds while it says
`authorization_pending`):

```sh
DEVICE_CODE=$(sed -n 's/.*"deviceCode":"\([^"]*\)".*/\1/p' /tmp/ad-login.json)
curl -sS -X POST https://antideploy.com/api/v1/device/token \
  -H 'content-type: application/json' \
  -d "{\"deviceCode\":\"$DEVICE_CODE\"}"
```

When it returns a token, save it **straight to a file — never print it**:

```sh
mkdir -p ~/.antideploy && chmod 700 ~/.antideploy
# write {"token":"<the token>"} into ~/.antideploy/config.json, then:
chmod 600 ~/.antideploy/config.json
TOKEN=$(sed -n 's/.*"token"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' ~/.antideploy/config.json)
```

### 2. Create the application (once per project)

Check your preferred address first, then create:

```sh
curl -sS "https://antideploy.com/api/v1/hostnames/check?label=atlas-studio" \
  -H "authorization: Bearer $TOKEN"

curl -sS -X POST https://antideploy.com/api/v1/applications \
  -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' \
  -d '{"name":"atlas-studio","subdomain":"atlas-studio"}'
```

Save the returned `applicationId` into `.antideploy.json` in this folder
(it holds no secret and is safe to commit):

```json
{ "applicationId": "<applicationId from the response>" }
```

### 3. Deploy (every time)

From this project's root:

```sh
APP_ID=$(sed -n 's/.*"applicationId"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' .antideploy.json)
tar czf - --exclude=.git --exclude=node_modules --exclude=dist . | \
  curl -sS -X POST "https://antideploy.com/api/v1/deploy?applicationId=$APP_ID" \
  -H "authorization: Bearer $TOKEN" -F "archive=@-"
```

The response includes a `watch` URL — poll it until `status` is `succeeded`,
and `summary` tells you the live address, e.g.
`https://atlas-studio.antideploy.app`.

---

## Notes

- **No database / storage / auth / email needed** — this site is fully static;
  the contact form is front-end only. Skip those provisioning steps.
- `.env` is git-ignored and nothing secret lives in this repo.
- Subdomain rules: 2–40 chars, lowercase letters, digits and hyphens.
  `atlas-studio` is a suggestion — pick the address you want to share.
- Every live deploy gets an automatic security scan; check `security` in the
  deploy status and fix anything it recommends.
