"use client";

import { formatCurrency } from "@/lib/utils";

const customers = [
  { id: "1", name: "Lakshmi Devi", phone: "+91 98765 43210", whatsapp: "+91 98765 43210", orders: 5, totalSpent: 2090, lastOrder: "2026-06-26", favouriteProduct: "Gongura Pickle 500g", isRepeat: true },
  { id: "2", name: "Ramesh Kumar", phone: "+91 98765 43211", whatsapp: "+91 98765 43211", orders: 3, totalSpent: 1800, lastOrder: "2026-06-26", favouriteProduct: "Gongura Pickle 1kg", isRepeat: true },
  { id: "3", name: "Priya Sharma", phone: "+91 98765 43212", whatsapp: "+91 98765 43212", orders: 2, totalSpent: 916, lastOrder: "2026-06-26", favouriteProduct: "Gongura Pickle 250g", isRepeat: true },
  { id: "4", name: "Venkat Rao", phone: "+91 98765 43213", whatsapp: "+91 98765 43213", orders: 1, totalSpent: 320, lastOrder: "2026-06-25", favouriteProduct: "Gongura Pickle 500g", isRepeat: false },
  { id: "5", name: "Sita Reddy", phone: "+91 98765 43214", whatsapp: "+91 98765 43214", orders: 4, totalSpent: 2392, lastOrder: "2026-06-25", favouriteProduct: "Gongura Pickle 1kg", isRepeat: true },
  { id: "6", name: "Anil Prasad", phone: "+91 98765 43215", whatsapp: "+91 98765 43215", orders: 3, totalSpent: 1620, lastOrder: "2026-06-24", favouriteProduct: "Gongura Pickle 250g", isRepeat: true },
];

export default function CustomersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Customers</h1>
          <p className="text-text-light">View customer history and details</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#25D366] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1da851] transition-colors">
            Send Reminder to All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-border">
          <p className="text-sm text-text-muted">Total Customers</p>
          <p className="text-3xl font-bold text-text">{customers.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border">
          <p className="text-sm text-text-muted">Repeat Customers</p>
          <p className="text-3xl font-bold text-primary">
            {customers.filter((c) => c.isRepeat).length}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border">
          <p className="text-sm text-text-muted">Avg. Lifetime Value</p>
          <p className="text-3xl font-bold text-secondary-dark">
            {formatCurrency(
              Math.round(
                customers.reduce((sum, c) => sum + c.totalSpent, 0) /
                  customers.length
              )
            )}
          </p>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Customer</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">WhatsApp</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Orders</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Total Spent</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Favourite</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Last Order</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t border-border hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">{customer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{customer.name}</p>
                        <p className="text-xs text-text-muted">{customer.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{customer.whatsapp}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{formatCurrency(customer.totalSpent)}</td>
                  <td className="px-6 py-4 text-sm text-text-light">{customer.favouriteProduct}</td>
                  <td className="px-6 py-4 text-sm">{customer.lastOrder}</td>
                  <td className="px-6 py-4">
                    {customer.isRepeat ? (
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">Repeat</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">New</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://wa.me/${customer.whatsapp.replace(/[^0-9]/g, "")}?text=Hi ${customer.name}! 🫙 It's been a while since your last order. Would you like to order some fresh pickle today?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-[#25D366]/10 text-[#25D366] px-3 py-1.5 rounded-lg font-medium hover:bg-[#25D366]/20"
                    >
                      WhatsApp
                    </a>
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
