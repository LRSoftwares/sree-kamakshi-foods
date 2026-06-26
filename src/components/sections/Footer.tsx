import { BRAND } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SK</span>
              </div>
              <div>
                <p className="font-bold text-lg">{BRAND.name}</p>
                <p className="text-white/70 text-sm">
                  Traditional Homemade Andhra Pickles
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm">{BRAND.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#order" className="hover:text-white transition-colors">
                  Order Now
                </a>
              </li>
              <li>
                <a href="#freshness" className="hover:text-white transition-colors">
                  Freshness Promise
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Phone: {BRAND.phone}</li>
              <li>WhatsApp: {BRAND.whatsapp}</li>
              <li>Email: {BRAND.email}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/50">
          <p>
            &copy; {currentYear} {BRAND.name}. All rights reserved. Prepared
            Fresh on Order.
          </p>
        </div>
      </div>
    </footer>
  );
}
