import { Product, Testimonial, FAQItem, DeliverySettings } from "@/types";

export const BRAND = {
  name: "Sree Kamakshi Foods",
  tagline: "Homemade with Love. Prepared Fresh on Order.",
  phone: "+91 9876543210",
  whatsapp: "+91 9876543210",
  email: "info@sreekamakshifoods.com",
  instagram: "sreekamakshifoods",
} as const;

export const COLORS = {
  primary: "#2E7D32",
  secondary: "#FBC02D",
  accent: "#C62828",
  background: "#FFFDF7",
  text: "#333333",
} as const;

export const PRODUCTS: Product[] = [
  {
    id: "gongura-pickle",
    name: "Gongura Pickle",
    description:
      "Traditional Andhra Gongura Pickle made using handpicked Gongura leaves, premium spices, and fresh ingredients.",
    image: "/images/gongura-pickle.jpg",
    sizes: [
      { weight: "250g", price: 180, serving: "2–3 People" },
      { weight: "500g", price: 320, serving: "4–6 People" },
      { weight: "1kg", price: 600, serving: "Large Families" },
    ],
    options: {
      garlic: true,
      spiceLevels: ["Mild", "Regular", "Extra Spicy"],
      oilPreferences: ["Default Recipe", "Groundnut Oil", "Gingelly Oil"],
    },
    enabled: true,
    created_at: "2026-01-01",
  },
  {
    id: "mango-pickle",
    name: "Mango Pickle",
    description:
      "Classic Andhra Avakaya made with raw mangoes, red chilli powder, and mustard seeds. A staple in every Telugu household.",
    image: "/images/mango-pickle.jpg",
    sizes: [
      { weight: "250g", price: 200, serving: "2–3 People" },
      { weight: "500g", price: 360, serving: "4–6 People" },
      { weight: "1kg", price: 680, serving: "Large Families" },
    ],
    options: {
      garlic: true,
      spiceLevels: ["Mild", "Regular", "Extra Spicy"],
      oilPreferences: ["Default Recipe", "Gingelly Oil"],
    },
    enabled: false,
    created_at: "2026-01-01",
  },
  {
    id: "lemon-pickle",
    name: "Lemon Pickle",
    description:
      "Tangy and spicy lemon pickle made with fresh lemons, turmeric, and aromatic spices. Perfect with rice and dal.",
    image: "/images/lemon-pickle.jpg",
    sizes: [
      { weight: "250g", price: 160, serving: "2–3 People" },
      { weight: "500g", price: 290, serving: "4–6 People" },
      { weight: "1kg", price: 540, serving: "Large Families" },
    ],
    options: {
      garlic: false,
      spiceLevels: ["Mild", "Regular", "Extra Spicy"],
      oilPreferences: ["Default Recipe", "Gingelly Oil"],
    },
    enabled: false,
    created_at: "2026-01-01",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Lakshmi Devi",
    rating: 5,
    text: "Tastes exactly like my grandmother's pickle. The freshness is unbelievable!",
    date: "2026-05-15",
  },
  {
    id: "2",
    name: "Ramesh Kumar",
    rating: 5,
    text: "Fresh and authentic. You can taste the quality of ingredients in every bite.",
    date: "2026-05-20",
  },
  {
    id: "3",
    name: "Priya Sharma",
    rating: 5,
    text: "Ordered for my family in Hyderabad. They loved it! Will order again soon.",
    date: "2026-06-01",
  },
  {
    id: "4",
    name: "Venkat Rao",
    rating: 5,
    text: "No preservatives, pure homemade taste. This is what real pickle should taste like.",
    date: "2026-06-10",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How long will the pickle last?",
    answer:
      "Our pickles last 3–6 months when stored in a cool, dry place. Since we use no preservatives, we recommend refrigeration after opening for maximum freshness.",
  },
  {
    question: "Do you use preservatives?",
    answer:
      "Absolutely not. All our pickles are 100% natural with no preservatives, no artificial colors, and no additives. Just pure, traditional ingredients.",
  },
  {
    question: "Is it really homemade?",
    answer:
      "Yes! Every batch is prepared fresh in our home kitchen using traditional Andhra recipes passed down through generations. We prepare only after receiving your order.",
  },
  {
    question: "Can I customize the spice level?",
    answer:
      "Yes! You can choose from Mild, Regular, or Extra Spicy. You can also choose with or without garlic, and your preferred oil type.",
  },
  {
    question: "Can I order in bulk?",
    answer:
      "Yes, we accept bulk orders for events, functions, and corporate gifting. Please contact us on WhatsApp for bulk pricing and availability.",
  },
  {
    question: "How long before I receive my order?",
    answer:
      "Since every order is freshly prepared, it takes approximately 24 hours from order confirmation. You'll receive live updates on your order status.",
  },
];

export const DELIVERY_SETTINGS: DeliverySettings = {
  office_address: "Hyderabad, Telangana",
  office_lat: 17.385,
  office_lng: 78.4867,
  pickup_timings: "10:00 AM – 7:00 PM",
  default_radius_km: 25,
};

export const ORDER_STATUSES = [
  { key: "received", label: "Order Received", icon: "📋" },
  { key: "preparing", label: "Preparing", icon: "👩‍🍳" },
  { key: "quality_check", label: "Quality Check", icon: "✅" },
  { key: "packed", label: "Packed", icon: "📦" },
  { key: "ready", label: "Ready", icon: "🎁" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: "🚀" },
  { key: "delivered", label: "Delivered", icon: "🏠" },
] as const;

export const FRESHNESS_STEPS = [
  { label: "Order Received", description: "Your order is confirmed" },
  { label: "Ingredients Prepared", description: "Fresh ingredients sourced" },
  { label: "Freshly Cooked", description: "Prepared with traditional recipes" },
  { label: "Quality Checked", description: "Taste and quality verified" },
  { label: "Packed", description: "Hygienically packed for you" },
  { label: "Ready", description: "Your order is ready" },
  { label: "Delivered", description: "Enjoy your fresh pickle!" },
] as const;
