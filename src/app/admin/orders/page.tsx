"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

const allOrders = [
  { id: "GK-2026-00018", customer: "Lakshmi Devi", phone: "+91 98765 43210", product: "Gongura Pickle", size: "500g", quantity: 1, garlic: "With", spice: "Regular", delivery: "Rapido", total: 418, status: "preparing", payment: "paid", date: "2026-06-26" },
  { id: "GK-2026-00017", customer: "Ramesh Kumar", phone: "+91 98765 43211", product: "Gongura Pickle", size: "1kg", quantity: 1, garlic: "Without", spice: "Extra Spicy", delivery: "Pickup", total: 600, status: "received", payment: "pending", date: "2026-06-26" },
  { id: "GK-2026-00016", customer: "Priya Sharma", phone: "+91 98765 43212", product: "Gongura Pickle", size: "250g", quantity: 2, garlic: "With", spice: "Mild", delivery: "Uber", total: 458, status: "quality_check", payment: "paid", date: "2026-06-26" },
  { id: "GK-2026-00015", customer: "Venkat Rao", phone: "+91 98765 43213", product: "Gongura Pickle", size: "500g", quantity: 1, garlic: "With", spice: "Regular", delivery: "Pickup", total: 320, status: "packed", payment: "paid", date: "2026-06-25" },
  { id: "GK-2026-00014", customer: "Sita Reddy", phone: "+91 98765 43214", product: "Gongura Pickle", size: "1kg", quantity: 1, garlic: "Without", spice: "Regular", delivery: "Rapido", total: 698, status: "delivered", payment: "paid", date: "2026-06-25" },
  { id: "GK-2026-00013", customer: "Anil Prasad", phone: "+91 98765 43215", product: "Gongura Pickle", size: "250g", quantity: 3, garlic: "With", spice: "Extra Spicy", delivery: "Pickup", total: 540, status: "delivered", payment: "paid", date: "2026-06-24" },
];

const statusColors: Record<string, string> = {
  received: "bg-blue-100 text-blue-700",
  preparing: "bg-yellow-100 text-yellow-700",
  quality_check: "bg-purple-100 text-purple-700",
  packed: "bg-indigo-100 text-indigo-700",
  ready: "bg-green-100 text-green-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusFlow = ["received", "preparing", "quality_check", "packed", "ready", "out_for_delivery", "delivered"];

export default function OrdersPage() {
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState(allOrders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const getNextStatus = (current: string) => {
    const idx = statusFlow.indexOf(current);
    return idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Orders</h1>
          <p className="text-text-light">Manage all customer orders</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors">
          Export Excel
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...statusFlow, "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === s
                ? "bg-primary text-white"
                : "bg-white border border-border text-text-light hover:text-text"
            }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase">Batch ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase">Customer</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase">Product</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase">Total</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase">Payment</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-border hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="font-mono text-sm font-medium text-primary hover:underline"
                    >
                      {order.id}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-text-muted">{order.phone}</p>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {order.product} {order.size} x{order.quantity}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold">{formatCurrency(order.total)}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.payment === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}>
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {getNextStatus(order.status) && (
                        <button
                          onClick={() => updateStatus(order.id, getNextStatus(order.status)!)}
                          className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20"
                        >
                          → {getNextStatus(order.status)!.replace("_", " ")}
                        </button>
                      )}
                      {order.status !== "cancelled" && order.status !== "delivered" && (
                        <button
                          onClick={() => updateStatus(order.id, "cancelled")}
                          className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (() => {
        const order = orders.find((o) => o.id === selectedOrder);
        if (!order) return null;
        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
            <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text">Order Details</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-text-muted hover:text-text">✕</button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-text-light">Batch ID</span><span className="font-mono font-bold text-primary">{order.id}</span></div>
                <div className="flex justify-between"><span className="text-text-light">Customer</span><span className="font-medium">{order.customer}</span></div>
                <div className="flex justify-between"><span className="text-text-light">Phone</span><span>{order.phone}</span></div>
                <div className="flex justify-between"><span className="text-text-light">Product</span><span>{order.product} {order.size}</span></div>
                <div className="flex justify-between"><span className="text-text-light">Quantity</span><span>{order.quantity}</span></div>
                <div className="flex justify-between"><span className="text-text-light">Garlic</span><span>{order.garlic}</span></div>
                <div className="flex justify-between"><span className="text-text-light">Spice</span><span>{order.spice}</span></div>
                <div className="flex justify-between"><span className="text-text-light">Delivery</span><span>{order.delivery}</span></div>
                <div className="flex justify-between"><span className="text-text-light">Total</span><span className="font-bold text-primary">{formatCurrency(order.total)}</span></div>
                <div className="flex justify-between"><span className="text-text-light">Date</span><span>{order.date}</span></div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark">Print Invoice</button>
                <a
                  href={`https://wa.me/${order.phone.replace(/[^0-9]/g, "")}?text=Hi ${order.customer}, your order ${order.id} is being processed.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#1da851] text-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
