"use client";

import { create } from "zustand";
import { OrderItem, CustomerInfo, DeliveryInfo, PaymentInfo } from "@/types";

interface OrderStore {
  items: OrderItem[];
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  payment: PaymentInfo;
  specialInstructions: string;
  needByDate: string;

  addItem: (item: OrderItem) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, item: OrderItem) => void;
  setCustomer: (customer: Partial<CustomerInfo>) => void;
  setDelivery: (delivery: Partial<DeliveryInfo>) => void;
  setPayment: (payment: Partial<PaymentInfo>) => void;
  setSpecialInstructions: (instructions: string) => void;
  setNeedByDate: (date: string) => void;
  getSubtotal: () => number;
  getTotal: () => number;
  reset: () => void;
}

const initialCustomer: CustomerInfo = {
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
};

const initialDelivery: DeliveryInfo = {
  method: "pickup",
};

const initialPayment: PaymentInfo = {
  method: "upi_qr",
  status: "pending",
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  items: [],
  customer: initialCustomer,
  delivery: initialDelivery,
  payment: initialPayment,
  specialInstructions: "",
  needByDate: "",

  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (index) =>
    set((state) => ({ items: state.items.filter((_, i) => i !== index) })),
  updateItem: (index, item) =>
    set((state) => ({
      items: state.items.map((existing, i) => (i === index ? item : existing)),
    })),
  setCustomer: (customer) =>
    set((state) => ({ customer: { ...state.customer, ...customer } })),
  setDelivery: (delivery) =>
    set((state) => ({ delivery: { ...state.delivery, ...delivery } })),
  setPayment: (payment) =>
    set((state) => ({ payment: { ...state.payment, ...payment } })),
  setSpecialInstructions: (instructions) =>
    set({ specialInstructions: instructions }),
  setNeedByDate: (date) => set({ needByDate: date }),
  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  getTotal: () => {
    const { items, delivery } = get();
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return subtotal + (delivery.estimated_cost || 0);
  },
  reset: () =>
    set({
      items: [],
      customer: initialCustomer,
      delivery: initialDelivery,
      payment: initialPayment,
      specialInstructions: "",
      needByDate: "",
    }),
}));
