"use client";

import { formatCurrency } from "@/lib/utils";

const stats = [
  {
    label: "Today's Orders",
    value: "18",
    change: "+3 from yesterday",
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Revenue Today",
    value: formatCurrency(5760),
    change: "+12% this week",
    color: "bg-secondary/20 text-secondary-dark",
  },
  {
    label: "Batch Capacity",
    value: "18/30",
    change: "12 slots remaining",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Repeat Customers",
    value: "42%",
    change: "+5% this month",
    color: "bg-green-50 text-green-600",
  },
];

const recentOrders = [
  {
    id: "GK-2026-00018",
    customer: "Lakshmi Devi",
    product: "Gongura Pickle 500g",
    total: 418,
    status: "preparing",
    time: "10 min ago",
  },
  {
    id: "GK-2026-00017",
    customer: "Ramesh Kumar",
    product: "Gongura Pickle 1kg",
    total: 698,
    status: "received",
    time: "25 min ago",
  },
  {
    id: "GK-2026-00016",
    customer: "Priya Sharma",
    product: "Gongura Pickle 250g",
    total: 278,
    status: "quality_check",
    time: "1 hour ago",
  },
  {
    id: "GK-2026-00015",
    customer: "Venkat Rao",
    product: "Gongura Pickle 500g",
    total: 320,
    status: "packed",
    time: "2 hours ago",
  },
  {
    id: "GK-2026-00014",
    customer: "Sita Reddy",
    product: "Gongura Pickle 1kg",
    total: 600,
    status: "delivered",
    time: "3 hours ago",
  },
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

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-text-light">
          Welcome back! Here&apos;s today&apos;s overview.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 border border-border"
          >
            <p className="text-sm text-text-muted mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-text mb-1">{stat.value}</p>
            <p className="text-xs text-text-muted">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Batch Status */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-text mb-4">Today&apos;s Batch</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-light">Status</span>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                Open
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-light">Capacity</span>
              <span className="font-semibold">18 / 30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-light">Closes At</span>
              <span className="font-semibold">7:00 PM</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-primary rounded-full h-2"
                style={{ width: "60%" }}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-text mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "New Order", icon: "➕", color: "bg-primary" },
              { label: "Close Batch", icon: "🔒", color: "bg-accent" },
              { label: "Export Data", icon: "📥", color: "bg-blue-500" },
              { label: "Send Updates", icon: "📤", color: "bg-[#25D366]" },
            ].map((action) => (
              <button
                key={action.label}
                className={`${action.color} text-white p-4 rounded-xl text-center hover:opacity-90 transition-opacity`}
              >
                <div className="text-2xl mb-1">{action.icon}</div>
                <p className="text-xs font-medium">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-text">Recent Orders</h3>
          <a
            href="/admin/orders"
            className="text-sm text-primary font-medium hover:underline"
          >
            View All →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">
                  Batch ID
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-border hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-mono text-sm font-medium text-primary">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-text-light">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {order.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
