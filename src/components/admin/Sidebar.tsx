"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/orders", label: "Orders", icon: "📋" },
  { href: "/admin/products", label: "Products", icon: "🫙" },
  { href: "/admin/batches", label: "Batches", icon: "📦" },
  { href: "/admin/customers", label: "Customers", icon: "👥" },
  { href: "/admin/reports", label: "Reports", icon: "📈" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-border min-h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">SK</span>
          </div>
          <div>
            <p className="font-bold text-primary text-sm">Sree Kamakshi</p>
            <p className="text-xs text-text-muted">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-text-light hover:bg-gray-50 hover:text-text"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-light hover:bg-gray-50 hover:text-text transition-colors"
        >
          <span className="text-lg">🌐</span>
          View Website
        </Link>
      </div>
    </aside>
  );
}
