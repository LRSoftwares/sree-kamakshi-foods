"use client";

import { formatCurrency } from "@/lib/utils";

const dailySales = [
  { date: "2026-06-26", orders: 18, revenue: 5760 },
  { date: "2026-06-25", orders: 25, revenue: 8200 },
  { date: "2026-06-24", orders: 22, revenue: 7040 },
  { date: "2026-06-23", orders: 28, revenue: 9100 },
  { date: "2026-06-22", orders: 15, revenue: 4800 },
  { date: "2026-06-21", orders: 20, revenue: 6400 },
  { date: "2026-06-20", orders: 24, revenue: 7680 },
];

const productBreakdown = [
  { product: "Gongura Pickle 500g", orders: 45, revenue: 14400, percentage: 42 },
  { product: "Gongura Pickle 1kg", orders: 30, revenue: 18000, percentage: 35 },
  { product: "Gongura Pickle 250g", orders: 25, revenue: 4500, percentage: 23 },
];

export default function ReportsPage() {
  const totalWeeklyRevenue = dailySales.reduce((sum, d) => sum + d.revenue, 0);
  const totalWeeklyOrders = dailySales.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = Math.round(totalWeeklyRevenue / totalWeeklyOrders);
  const maxRevenue = Math.max(...dailySales.map((d) => d.revenue));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Reports</h1>
          <p className="text-text-light">Sales analytics and insights</p>
        </div>
        <div className="flex gap-2">
          {["Daily", "Weekly", "Monthly"].map((period) => (
            <button
              key={period}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                period === "Weekly"
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-text-light hover:text-text"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid sm:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-border">
          <p className="text-sm text-text-muted">Weekly Revenue</p>
          <p className="text-3xl font-bold text-primary">{formatCurrency(totalWeeklyRevenue)}</p>
          <p className="text-xs text-green-600 mt-1">+18% vs last week</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border">
          <p className="text-sm text-text-muted">Weekly Orders</p>
          <p className="text-3xl font-bold text-text">{totalWeeklyOrders}</p>
          <p className="text-xs text-green-600 mt-1">+12% vs last week</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border">
          <p className="text-sm text-text-muted">Avg. Order Value</p>
          <p className="text-3xl font-bold text-secondary-dark">{formatCurrency(avgOrderValue)}</p>
          <p className="text-xs text-green-600 mt-1">+5% vs last week</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border">
          <p className="text-sm text-text-muted">Repeat Rate</p>
          <p className="text-3xl font-bold text-accent">42%</p>
          <p className="text-xs text-green-600 mt-1">+3% vs last week</p>
        </div>
      </div>

      {/* Revenue Chart (bar chart using divs) */}
      <div className="bg-white rounded-2xl p-6 border border-border mb-8">
        <h3 className="font-bold text-text mb-6">Daily Revenue (Last 7 Days)</h3>
        <div className="flex items-end gap-3 h-48">
          {dailySales.map((day) => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
              <p className="text-xs font-semibold text-primary">{formatCurrency(day.revenue)}</p>
              <div
                className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-lg transition-all"
                style={{ height: `${(day.revenue / maxRevenue) * 100}%` }}
              />
              <div className="text-center">
                <p className="text-xs text-text-muted">
                  {new Date(day.date).toLocaleDateString("en-IN", { weekday: "short" })}
                </p>
                <p className="text-xs text-text-muted">{day.orders} orders</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-text mb-4">Best Selling Products</h3>
          <div className="space-y-4">
            {productBreakdown.map((item) => (
              <div key={item.product}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-text">{item.product}</span>
                  <span className="text-text-muted">{item.orders} orders</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary rounded-full h-2.5"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-primary w-16 text-right">
                    {formatCurrency(item.revenue)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-text mb-4">Delivery Breakdown</h3>
          <div className="space-y-4">
            {[
              { method: "Self Pickup", count: 45, percentage: 45, color: "bg-primary" },
              { method: "Rapido Parcel", count: 35, percentage: 35, color: "bg-secondary" },
              { method: "Uber Package", count: 20, percentage: 20, color: "bg-accent" },
            ].map((item) => (
              <div key={item.method}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-text">{item.method}</span>
                  <span className="text-text-muted">{item.count} orders ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${item.color} rounded-full h-2.5`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
