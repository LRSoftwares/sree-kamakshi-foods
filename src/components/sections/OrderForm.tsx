"use client";

import { useState } from "react";
import { PRODUCTS, DELIVERY_SETTINGS } from "@/lib/constants";
import {
  formatCurrency,
  getDeliveryRecommendation,
  estimateDeliveryCost,
  estimateDeliveryTime,
  generateBatchId,
} from "@/lib/utils";

interface OrderFormData {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  productId: string;
  size: string;
  quantity: number;
  garlic: "with" | "without";
  spiceLevel: string;
  oilPreference: string;
  needByDate: string;
  specialInstructions: string;
  deliveryMethod: "pickup" | "rapido" | "uber";
  paymentMethod: string;
}

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [batchId, setBatchId] = useState("");
  const [estimatedDistance, setEstimatedDistance] = useState<number | null>(null);

  const [form, setForm] = useState<OrderFormData>({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    productId: "gongura-pickle",
    size: "500g",
    quantity: 1,
    garlic: "with",
    spiceLevel: "Regular",
    oilPreference: "Default Recipe",
    needByDate: "",
    specialInstructions: "",
    deliveryMethod: "pickup",
    paymentMethod: "upi_qr",
  });

  const selectedProduct = PRODUCTS.find((p) => p.id === form.productId);
  const selectedSize = selectedProduct?.sizes.find(
    (s) => s.weight === form.size
  );
  const itemTotal = (selectedSize?.price || 0) * form.quantity;
  const deliveryCost =
    form.deliveryMethod !== "pickup" && estimatedDistance
      ? estimateDeliveryCost(estimatedDistance, form.deliveryMethod)
      : 0;
  const total = itemTotal + deliveryCost;

  const recommendation = estimatedDistance
    ? getDeliveryRecommendation(estimatedDistance)
    : null;

  const update = (field: keyof OrderFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const R = 6371;
        const dLat = ((latitude - DELIVERY_SETTINGS.office_lat) * Math.PI) / 180;
        const dLon = ((longitude - DELIVERY_SETTINGS.office_lng) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((DELIVERY_SETTINGS.office_lat * Math.PI) / 180) *
            Math.cos((latitude * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = parseFloat((R * c).toFixed(1));
        setEstimatedDistance(distance);
      },
      () => {
        setEstimatedDistance(8.5);
      }
    );
  };

  const handleSubmit = () => {
    const id = generateBatchId();
    setBatchId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="order" className="py-16 md:py-24 bg-background">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-primary/20">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-text-light mb-4">
              Your fresh pickle is being prepared with love.
            </p>
            <div className="bg-primary/5 rounded-xl p-4 mb-6">
              <p className="text-sm text-text-muted">Batch ID</p>
              <p className="text-xl font-bold text-primary font-mono">
                {batchId}
              </p>
            </div>
            <div className="space-y-2 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-text-light">Product</span>
                <span className="font-medium">
                  {selectedProduct?.name} ({form.size})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-light">Quantity</span>
                <span className="font-medium">{form.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-light">Total</span>
                <span className="font-bold text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="flex-1 bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                Order Again
              </button>
              <a
                href={`https://wa.me/919840044268?text=Hi, I just placed order ${batchId}. Please confirm.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white py-3 rounded-full font-semibold hover:bg-[#1da851] transition-colors text-center"
              >
                Confirm on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Place Your <span className="text-primary">Fresh Order</span>
          </h2>
          <p className="text-text-light">
            Complete your order in under 90 seconds
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => setStep(s)}
                className={`w-10 h-10 rounded-full font-semibold text-sm transition-all ${
                  step === s
                    ? "bg-primary text-white shadow-md"
                    : step > s
                      ? "bg-primary/20 text-primary"
                      : "bg-gray-200 text-text-muted"
                }`}
              >
                {step > s ? "✓" : s}
              </button>
              {s < 4 && (
                <div
                  className={`w-8 h-0.5 ${
                    step > s ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-border">
              {/* Step 1: Product Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-text">
                    Choose Your Pickle
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Product
                    </label>
                    <select
                      value={form.productId}
                      onChange={(e) => update("productId", e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 bg-background text-text"
                    >
                      {PRODUCTS.filter((p) => p.enabled).map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Size
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProduct?.sizes.map((size) => (
                        <button
                          key={size.weight}
                          onClick={() => update("size", size.weight)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            form.size === size.weight
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <p className="font-bold text-lg">{size.weight}</p>
                          <p className="text-primary font-semibold">
                            {formatCurrency(size.price)}
                          </p>
                          <p className="text-xs text-text-muted mt-1">
                            {size.serving}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          update("quantity", Math.max(1, form.quantity - 1))
                        }
                        className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold w-12 text-center">
                        {form.quantity}
                      </span>
                      <button
                        onClick={() => update("quantity", form.quantity + 1)}
                        className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {selectedProduct?.options.garlic && (
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        Garlic Preference
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["with", "without"] as const).map((opt) => (
                          <button
                            key={opt}
                            onClick={() => update("garlic", opt)}
                            className={`p-3 rounded-xl border-2 text-center transition-all ${
                              form.garlic === opt
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/30"
                            }`}
                          >
                            {opt === "with" ? "🧄 With Garlic" : "Without Garlic"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Spice Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProduct?.options.spiceLevels.map((level) => (
                        <button
                          key={level}
                          onClick={() => update("spiceLevel", level)}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${
                            form.spiceLevel === level
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-accent/30"
                          }`}
                        >
                          {level === "Mild" && "🌶️ "}
                          {level === "Regular" && "🌶️🌶️ "}
                          {level === "Extra Spicy" && "🌶️🌶️🌶️ "}
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Oil Preference
                    </label>
                    <select
                      value={form.oilPreference}
                      onChange={(e) => update("oilPreference", e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 bg-background text-text"
                    >
                      {selectedProduct?.options.oilPreferences.map((oil) => (
                        <option key={oil} value={oil}>
                          {oil}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-md"
                  >
                    Continue to Details →
                  </button>
                </div>
              )}

              {/* Step 2: Customer Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-text">Your Details</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Enter your name"
                        className="w-full border border-border rounded-xl px-4 py-3 bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full border border-border rounded-xl px-4 py-3 bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={form.whatsapp}
                        onChange={(e) => update("whatsapp", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full border border-border rounded-xl px-4 py-3 bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="your@email.com"
                        className="w-full border border-border rounded-xl px-4 py-3 bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      placeholder="Enter your full delivery address"
                      rows={3}
                      className="w-full border border-border rounded-xl px-4 py-3 bg-background resize-none"
                    />
                    <button
                      onClick={handleGetLocation}
                      className="mt-2 text-sm text-primary font-medium hover:underline flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      Use my current location
                    </button>
                    {estimatedDistance && (
                      <p className="mt-1 text-sm text-primary">
                        Estimated distance: {estimatedDistance} km from our
                        kitchen
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Need By Date
                    </label>
                    <input
                      type="date"
                      value={form.needByDate}
                      onChange={(e) => update("needByDate", e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Special Instructions
                    </label>
                    <textarea
                      value={form.specialInstructions}
                      onChange={(e) =>
                        update("specialInstructions", e.target.value)
                      }
                      placeholder="Any special requests?"
                      rows={2}
                      className="w-full border border-border rounded-xl px-4 py-3 bg-background resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border border-border text-text py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!form.name || !form.phone || !form.whatsapp}
                      className="flex-1 bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Delivery */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-text">
                    Delivery Method
                  </h3>

                  {recommendation && (
                    <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4">
                      <p className="text-sm font-medium text-secondary-dark">
                        💡 {recommendation.message}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {(
                      [
                        {
                          value: "pickup",
                          label: "Self Pickup",
                          desc: "Pick up from our kitchen: Free!",
                          icon: "🏠",
                        },
                        {
                          value: "rapido",
                          label: "Rapido Parcel",
                          desc: "Quick and affordable delivery",
                          icon: "🏍️",
                        },
                        {
                          value: "uber",
                          label: "Uber Package",
                          desc: "Reliable package delivery",
                          icon: "🚗",
                        },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          update("deliveryMethod", option.value);
                          if (option.value !== "pickup" && !estimatedDistance) {
                            handleGetLocation();
                          }
                        }}
                        className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${
                          form.deliveryMethod === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-text">
                            {option.label}
                            {recommendation?.method === option.value && (
                              <span className="ml-2 text-xs bg-secondary text-white px-2 py-0.5 rounded-full">
                                Recommended
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-text-light">
                            {option.desc}
                          </p>
                        </div>
                        {option.value !== "pickup" && estimatedDistance && (
                          <div className="text-right">
                            <p className="font-bold text-primary">
                              {formatCurrency(
                                estimateDeliveryCost(
                                  estimatedDistance,
                                  option.value
                                )
                              )}
                            </p>
                            <p className="text-xs text-text-muted">
                              ~{estimateDeliveryTime(estimatedDistance, option.value)}
                            </p>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {form.deliveryMethod === "pickup" && (
                    <div className="bg-primary/5 rounded-xl p-4">
                      <h4 className="font-semibold text-text mb-2">
                        Pickup Details
                      </h4>
                      <p className="text-sm text-text-light">
                        📍 {DELIVERY_SETTINGS.office_address}
                      </p>
                      <p className="text-sm text-text-light">
                        🕐 {DELIVERY_SETTINGS.pickup_timings}
                      </p>
                    </div>
                  )}

                  {form.deliveryMethod !== "pickup" && estimatedDistance && (
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-text-muted">Distance</p>
                          <p className="font-bold text-text">
                            {estimatedDistance} km
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-text-muted">Est. Cost</p>
                          <p className="font-bold text-primary">
                            {formatCurrency(deliveryCost)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-text-muted">
                            Delivery Time
                          </p>
                          <p className="font-bold text-text">
                            {estimateDeliveryTime(
                              estimatedDistance,
                              form.deliveryMethod
                            )}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-text-muted mt-3 text-center">
                        Actual charges depend on Uber/Rapido pricing at the time
                        of delivery.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border border-border text-text py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="flex-1 bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-md"
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-text">Payment</h3>

                  <div className="space-y-3">
                    {[
                      { value: "upi_qr", label: "UPI QR Code", icon: "📱" },
                      { value: "google_pay", label: "Google Pay", icon: "💳" },
                      { value: "phone_pe", label: "PhonePe", icon: "💜" },
                      {
                        value: "bank_transfer",
                        label: "Bank Transfer",
                        icon: "🏦",
                      },
                      {
                        value: "cash",
                        label: "Cash on Pickup",
                        icon: "💵",
                        disabled: form.deliveryMethod !== "pickup",
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => update("paymentMethod", option.value)}
                        disabled={"disabled" in option && option.disabled}
                        className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${
                          form.paymentMethod === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        } ${"disabled" in option && option.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-semibold text-text">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 border border-border text-text py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-accent text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-colors shadow-md"
                    >
                      Place Order: {formatCurrency(total)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border sticky top-24">
              <h3 className="font-bold text-text mb-4">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-light">
                    {selectedProduct?.name} ({form.size})
                  </span>
                  <span className="font-medium">
                    {formatCurrency(selectedSize?.price || 0)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-light">Quantity</span>
                  <span className="font-medium">x{form.quantity}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-light">Garlic</span>
                  <span className="font-medium capitalize">{form.garlic}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-light">Spice Level</span>
                  <span className="font-medium">{form.spiceLevel}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-light">Oil</span>
                  <span className="font-medium">{form.oilPreference}</span>
                </div>

                <hr className="border-border" />

                <div className="flex justify-between">
                  <span className="text-text-light">Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(itemTotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-light">Delivery</span>
                  <span className="font-medium">
                    {form.deliveryMethod === "pickup"
                      ? "Free"
                      : deliveryCost > 0
                        ? formatCurrency(deliveryCost)
                        : "Calculating..."}
                  </span>
                </div>

                <hr className="border-border" />

                <div className="flex justify-between text-lg">
                  <span className="font-bold text-text">Total</span>
                  <span className="font-bold text-primary">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-3 h-3 text-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-green-700">
                    Maximum Freshness Guaranteed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
