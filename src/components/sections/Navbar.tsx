"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#order", label: "Order" },
  { href: "#freshness", label: "Freshness" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">SK</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-primary text-lg leading-tight">
                {BRAND.name}
              </p>
              <p className="text-xs text-text-light leading-tight">
                Fresh Homemade Pickles
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-light hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#order"
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors shadow-md"
            >
              Order Now
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-text-light hover:text-primary font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#order"
              onClick={() => setIsOpen(false)}
              className="block bg-primary text-white text-center px-5 py-3 rounded-full font-semibold mt-3"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
