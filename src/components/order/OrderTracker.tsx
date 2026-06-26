"use client";

import { useState } from "react";
import { ORDER_STATUSES } from "@/lib/constants";

const DEMO_ORDER = {
  id: "GK-2026-00018",
  product: "Gongura Pickle",
  size: "500g",
  quantity: 1,
  garlic: "With Garlic",
  spice: "Regular",
  total: 418,
  status: "preparing",
  customer: "Lakshmi Devi",
  createdAt: "2026-06-26 10:30 AM",
};

export default function OrderTracker() {
  const [batchId, setBatchId] = useState("");
  const [order, setOrder] = useState<typeof DEMO_ORDER | null>(null);
  const [error, setError] = useState("");

  const handleTrack = () => {
    if (!batchId.trim()) {
      setError("Please enter your Batch ID");
      return;
    }
    setError("");
    setOrder(DEMO_ORDER);
  };

  const currentStatusIndex = order
    ? ORDER_STATUSES.findIndex((s) => s.key === order.status)
    : -1;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            Track Your Order
          </h1>
          <p className="text-text-light">
            Enter your Batch ID to see your order status
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-border mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value.toUpperCase())}
              placeholder="Enter Batch ID (e.g., GK-2026-00018)"
              className="flex-1 border border-border rounded-xl px-4 py-3 bg-background font-mono"
            />
            <button
              onClick={handleTrack}
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              Track
            </button>
          </div>
          {error && <p className="text-accent text-sm mt-2">{error}</p>}
        </div>

        {order && (
          <>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-text-muted">Batch ID</p>
                  <p className="text-xl font-bold text-primary font-mono">
                    {order.id}
                  </p>
                </div>
                <span className="bg-secondary/20 text-secondary-dark px-3 py-1 rounded-full text-sm font-semibold capitalize">
                  {order.status.replace("_", " ")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-text-muted">Product</p>
                  <p className="font-medium">
                    {order.product} ({order.size})
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Quantity</p>
                  <p className="font-medium">{order.quantity}</p>
                </div>
                <div>
                  <p className="text-text-muted">Options</p>
                  <p className="font-medium">
                    {order.garlic}, {order.spice}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Ordered</p>
                  <p className="font-medium">{order.createdAt}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border">
              <h3 className="font-bold text-text mb-6">Order Progress</h3>
              <div className="space-y-0">
                {ORDER_STATUSES.map((status, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;

                  return (
                    <div key={status.key} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 ${
                            isCompleted
                              ? "bg-primary border-primary text-white"
                              : "bg-white border-gray-200 text-gray-400"
                          } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                        >
                          {isCompleted ? "✓" : status.icon}
                        </div>
                        {index < ORDER_STATUSES.length - 1 && (
                          <div
                            className={`w-0.5 h-8 ${
                              index < currentStatusIndex
                                ? "bg-primary"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-8">
                        <p
                          className={`font-semibold ${
                            isCompleted ? "text-text" : "text-text-muted"
                          }`}
                        >
                          {status.label}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-primary font-medium">
                            In progress...
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
