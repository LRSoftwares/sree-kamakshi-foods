"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/constants";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editingId, setEditingId] = useState<string | null>(null);

  const toggleProduct = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const updatePrice = (productId: string, sizeWeight: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              sizes: p.sizes.map((s) =>
                s.weight === sizeWeight ? { ...s, price: newPrice } : s
              ),
            }
          : p
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Products</h1>
          <p className="text-text-light">Manage your pickle products</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors">
          + Add Product
        </button>
      </div>

      <div className="grid gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-2xl border overflow-hidden ${
              product.enabled ? "border-border" : "border-red-200 opacity-70"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-3xl">
                    🫙
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text">
                      {product.name}
                    </h3>
                    <p className="text-sm text-text-light line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setEditingId(editingId === product.id ? null : product.id)
                    }
                    className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100"
                  >
                    {editingId === product.id ? "Done" : "Edit Prices"}
                  </button>
                  <button
                    onClick={() => toggleProduct(product.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      product.enabled ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        product.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <div
                    key={size.weight}
                    className="bg-background rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-text">
                        {size.weight}
                      </span>
                      <span className="text-xs text-text-muted">
                        {size.serving}
                      </span>
                    </div>
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={size.price}
                        onChange={(e) =>
                          updatePrice(
                            product.id,
                            size.weight,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full border border-primary rounded-lg px-3 py-2 text-lg font-bold text-primary mt-1"
                      />
                    ) : (
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(size.price)}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {product.options.garlic && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Garlic Options
                  </span>
                )}
                {product.options.spiceLevels.map((level) => (
                  <span
                    key={level}
                    className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                  >
                    {level}
                  </span>
                ))}
                {product.options.oilPreferences.map((oil) => (
                  <span
                    key={oil}
                    className="text-xs bg-secondary/20 text-secondary-dark px-2 py-1 rounded-full"
                  >
                    {oil}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
