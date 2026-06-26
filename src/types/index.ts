export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  sizes: ProductSize[];
  options: ProductOptions;
  enabled: boolean;
  created_at: string;
}

export interface ProductSize {
  weight: string;
  price: number;
  serving: string;
}

export interface ProductOptions {
  garlic: boolean;
  spiceLevels: string[];
  oilPreferences: string[];
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  size: string;
  quantity: number;
  garlic: "with" | "without";
  spice_level: string;
  oil_preference: string;
  price: number;
}

export interface Order {
  id: string;
  batch_id: string;
  customer: CustomerInfo;
  items: OrderItem[];
  delivery: DeliveryInfo;
  payment: PaymentInfo;
  status: OrderStatus;
  special_instructions: string;
  need_by_date: string;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  address: string;
  lat?: number;
  lng?: number;
}

export interface DeliveryInfo {
  method: "pickup" | "rapido" | "uber";
  distance?: number;
  estimated_cost?: number;
  estimated_time?: string;
}

export interface PaymentInfo {
  method: "upi_qr" | "google_pay" | "phone_pe" | "bank_transfer" | "cash";
  status: "pending" | "paid";
  transaction_id?: string;
}

export type OrderStatus =
  | "received"
  | "preparing"
  | "quality_check"
  | "packed"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface BatchInfo {
  id: string;
  date: string;
  capacity: number;
  filled: number;
  closing_time: string;
  preparation_hours: number;
  status: "open" | "closed" | "full";
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DeliverySettings {
  office_address: string;
  office_lat: number;
  office_lng: number;
  pickup_timings: string;
  default_radius_km: number;
}
