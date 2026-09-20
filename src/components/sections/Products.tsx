"use client";

import { PRODUCTS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export default function Products() {
  const enabledProducts = PRODUCTS.filter((p) => p.enabled);

  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Our <span className="text-primary">Fresh Pickles</span>
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            Each pickle is handcrafted using traditional Andhra recipes. Choose
            your size based on your family needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enabledProducts.map((product) => (
            <div
              key={product.id}
              className="bg-background rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all group"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                <div className="text-7xl">🫙</div>
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Fresh
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-text-light text-sm mb-4">
                  {product.description}
                </p>

                <div className="space-y-2 mb-4">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Family Size Guide
                  </p>
                  {product.sizes.map((size) => (
                    <div
                      key={size.weight}
                      className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-border"
                    >
                      <div>
                        <span className="font-semibold text-text">
                          {size.weight}
                        </span>
                        <span className="text-text-muted text-xs ml-2">
                          {size.serving}
                        </span>
                      </div>
                      <span className="font-bold text-primary text-lg">
                        {formatCurrency(size.price)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.options.garlic && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Garlic Options
                    </span>
                  )}
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {product.options.spiceLevels.length} Spice Levels
                  </span>
                  <span className="text-xs bg-secondary/20 text-secondary-dark px-2 py-1 rounded-full">
                    {product.options.oilPreferences.length} Oil Options
                  </span>
                </div>

                <a
                  href="#order"
                  className="block w-full bg-primary text-white text-center py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-md"
                >
                  Order {product.name}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-text-muted text-sm">
            More varieties coming soon: Ginger, Tomato, Amla, Lemon, Mango,
            Maagai, Pandu Mirchi, Red Chilli Gongura, Raw Tamarind, Red Chilli
            Chintakai, and podis: Andhra Kandhi, Palli, Andhra Senaga, Nalla
            Karam & Nuvvula.
          </p>
        </div>
      </div>
    </section>
  );
}
