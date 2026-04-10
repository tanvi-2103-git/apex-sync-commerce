import helmet1 from "@/assets/helmet-1.jpg";
import helmet2 from "@/assets/helmet-2.jpg";
import helmet3 from "@/assets/helmet-3.jpg";
import helmet4 from "@/assets/helmet-4.jpg";
import helmet5 from "@/assets/helmet-5.jpg";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  retailPrice: number;
  wholesalePrice: number;
  retailStock: number;
  wholesaleStock: number;
  image: string;
  category: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: "hm-001",
    name: "Phantom X1",
    slug: "phantom-x1",
    description: "Full-face matte black helmet with advanced ventilation system and anti-fog visor. Built for riders who demand stealth and performance.",
    retailPrice: 4999,
    wholesalePrice: 3499,
    retailStock: 45,
    wholesaleStock: 200,
    image: helmet1,
    category: "Full Face",
    features: ["DOT Certified", "Anti-fog Visor", "Ventilation System", "Removable Liner"],
  },
  {
    id: "hm-002",
    name: "Vortex Carbon R",
    slug: "vortex-carbon-r",
    description: "Carbon fiber racing helmet with aggressive aerodynamics. Red racing stripes meet lightweight carbon construction.",
    retailPrice: 8499,
    wholesalePrice: 5999,
    retailStock: 20,
    wholesaleStock: 80,
    image: helmet2,
    category: "Racing",
    features: ["Carbon Fiber Shell", "ECE 22.06", "Race Aero", "Quick-release Visor"],
  },
  {
    id: "hm-003",
    name: "Apex Modular GT",
    slug: "apex-modular-gt",
    description: "Premium modular helmet with gold accents. Flip-up design for touring comfort with sport-level protection.",
    retailPrice: 6999,
    wholesalePrice: 4999,
    retailStock: 30,
    wholesaleStock: 120,
    image: helmet3,
    category: "Modular",
    features: ["Flip-up Design", "Bluetooth Ready", "Pinlock Included", "Sun Visor"],
  },
  {
    id: "hm-004",
    name: "Terra ADV",
    slug: "terra-adv",
    description: "Adventure touring helmet in military green. Built for riders who take the road less traveled.",
    retailPrice: 5499,
    wholesalePrice: 3799,
    retailStock: 35,
    wholesaleStock: 150,
    image: helmet4,
    category: "Adventure",
    features: ["Peak Visor", "Off-road Ready", "Hydration Compatible", "Wide Vision"],
  },
  {
    id: "hm-005",
    name: "Heritage Classic",
    slug: "heritage-classic",
    description: "Retro open-face helmet with chrome trim. Timeless design meets modern safety standards.",
    retailPrice: 3499,
    wholesalePrice: 2499,
    retailStock: 50,
    wholesaleStock: 250,
    image: helmet5,
    category: "Open Face",
    features: ["Classic Design", "Chrome Trim", "Leather Liner", "ISI Certified"],
  },
];
