export interface Project {
  id: string;
  name: string;
  category: string;
  label: "DEMO PROJECT";
  description: string;
  image: string;
  url: string;
  year: string;
  palette: string[];
  overview: string;
  approach: string;
  features: string[];
  techStack: string[];
}

export const projects: Project[] = [
  {
    id: "may-timber",
    name: "MAY TIMBER",
    category: "Furniture / Interior",
    label: "DEMO PROJECT",
    description:
      "A premium, editorial-style furniture showcase presenting handcrafted solid-wood tables, seating and custom commissions.",
    image: "/images/project-timber.jpg",
    url: "https://may-house-timber.antideploy.app",
    year: "2025",
    palette: ["#1C1A17", "#D1C2B0", "#A38F75", "#F2EFE9"],
    overview:
      "A visually immersive, magazine-like concept website designed for a boutique timber artisan workshop. The design prioritises fine details, wood-grain photography, and custom timber commission enquiries.",
    approach:
      "Using fine-lined typography, generous whitespace, and warm earth tones, the layout mirrors the premium, organic quality of handcrafted wooden pieces. Large full-screen galleries allow clients to inspect every hand-cut joint.",
    features: [
      "Full-bleed high-resolution furniture galleries",
      "Interactive material and timber species selectors",
      "Clean product grid categorization with seamless page transitions",
      "High-converting bespoke commission contact form",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Motion Animations"],
  },
  {
    id: "wellspring-clinic",
    name: "WELLSPRING CLINIC",
    category: "Healthcare",
    label: "DEMO PROJECT",
    description:
      "A calm, highly professional medical and wellness clinic website with smooth navigation and streamlined appointment booking flows.",
    image: "/images/project-clinic.jpg",
    url: "https://wellspring-clinic.antideploy.app",
    year: "2025",
    palette: ["#0F1E1B", "#8CA69E", "#DFE6E3", "#FAFDFD"],
    overview:
      "A concept designed to redefine how modern, premium medical practices and wellness retreats engage patients online. The focus is on reassurance, clarity, and ease of action.",
    approach:
      "The design uses soft, healing tones, minimal architectural layouts, and beautiful serif-and-sans typography to inspire immediate confidence and clinical authority. Navigation remains prominent and accessible at all times.",
    features: [
      "Streamlined multi-step digital patient onboarding placeholder",
      "Clean treatments and clinical specialties layout",
      "Serene medical practitioner profiles",
      "Integrated booking call-to-actions",
    ],
    techStack: ["Vite", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "ashoka-interiors",
    name: "ASHOKA INTERIORS",
    category: "Interior Design",
    label: "DEMO PROJECT",
    description:
      "A dark, sophisticated interior design portfolio featuring luxury spatial concepts and story-driven architectural showcases.",
    image: "/images/project-interior.jpg",
    url: "https://project-folder-.antideploy.app",
    year: "2025",
    palette: ["#121210", "#A3907A", "#2B2A26", "#F2EFEA"],
    overview:
      "A sleek portfolio concept designed for an award-winning high-end architectural and interior design studio. The site operates as a digital art gallery, treating each room as a canvas.",
    approach:
      "Built with a dark charcoal and sand palette, the focus remains entirely on lighting, contrast, and spatial harmony. Slow, elegant fade transitions create a sensory walking-through-the-space experience.",
    features: [
      "Story-driven portfolio layouts with narrative text overlays",
      "tactile moodboard style grid structures",
      "Services breakdown covering spatial planning and soft styling",
      "High-end consultation enquiry builder",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "iron-throttle",
    name: "IRON & THROTTLE",
    category: "Custom Motorcycle / Automotive",
    label: "DEMO PROJECT",
    description:
      "A high-impact, dark custom motorcycle brand experience with immersive layouts and customized specification guides.",
    image: "/images/project-moto.jpg",
    url: "https://iron-throttle.antideploy.app",
    year: "2025",
    palette: ["#09090B", "#1C1C20", "#B22222", "#E4E4E7"],
    overview:
      "An energetic brand hub concept for a custom cafe racer workshop. The page is designed around powerful photography and high-spec custom bike customizers to captivate serious riders.",
    approach:
      "Deep blacks, heavy industrial typography, and a fiery red accent build an athletic, high-octane feeling. Hover effects reveal precise technical specifications on interactive parts of the build.",
    features: [
      "Cinematic motorcycle showcase pages",
      "Interactive technical spec sheet drawers",
      "Responsive, touch-friendly parts and services grid",
      "Build request contact form with dynamic part select",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    id: "iron-line-customs",
    name: "IRON LINE CUSTOMS",
    category: "Automotive / Custom Builds",
    label: "DEMO PROJECT",
    description:
      "A premium custom automotive detailing and fabrication website with detailed package tiers and interactive comparison sliders.",
    image: "/images/project-detailing.jpg",
    url: "https://iron-line-customs.antideploy.app",
    year: "2025",
    palette: ["#0A0B0E", "#2A5BFF", "#181A20", "#F4F6F9"],
    overview:
      "A premium, professional web design concept for a luxury car tuning and detailing workshop. It showcases the high-quality craftsmanship of ceramic coatings, detailing, and custom bespoke modifications.",
    approach:
      "Glossy black surfaces and a striking blue electric accent emphasize a clean, pristine, high-end engineering feel. Visual comparisons prove work quality immediately to prospective luxury car owners.",
    features: [
      "Draggable before/after image comparison sliders (built-in mockup)",
      "Three-tier clear detailing package layout with direct CTAs",
      "Interactive process timeline demonstrating high care standards",
      "Simple, conversion-optimised booking pipeline",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "luxe-stay",
    name: "LUXE STAY",
    category: "Luxury Hotel",
    label: "DEMO PROJECT",
    description:
      "An upscale boutique hotel digital experience presenting cinematic suites, fine amenities, and integrated room-booking hooks.",
    image: "/images/project-hotel.jpg",
    url: "https://luxe-stay.antideploy.app",
    year: "2025",
    palette: ["#101014", "#C3A470", "#EAE6DF", "#333336"],
    overview:
      "An elegant digital presence concept for an independent high-end retreat. The architecture of the site highlights comfort, peace, and immediate escape.",
    approach:
      "A rich, classic editorial layout with subtle champagne accents and serif headings creates a timeless, high-hospitality feel. Clear sticky CTAs make reserving rooms a continuous option.",
    features: [
      "Cinematic header showing slow-motion lifestyle imagery",
      "Detailed suite showcases listing individual premium amenities",
      "Smooth visual scroll effects for room cards",
      "Highly visible booking trigger points",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS"],
  },
];
