

"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../component/layout/PageHeader/page";

type SavedShop = {
  shop_id: number;
  shop_name: string;
  title?: string;
  currency_code?: string;
  listing_active_count?: number;
};

export default function SavedShopsPage() {
  const [savedShops, setSavedShops] = useState<SavedShop[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("etsy-saved-shops");

      if (stored) {
        setSavedShops(JSON.parse(stored));
      }
    } catch {
      setSavedShops([]);
    }
  }, []);

  function removeShop(shopId: number) {
    const updated = savedShops.filter(
      (shop) => shop.shop_id !== shopId
    );

    setSavedShops(updated);
    localStorage.setItem("etsy-saved-shops", JSON.stringify(updated));
  }

  return (
    <div>
      <PageHeader
        title="Saved Shops"
        description="View and manage Etsy shops saved from your search results."
      />

      <p className="mb-5 text-sm text-gray-400">
        {savedShops.length} saved{" "}
        {savedShops.length === 1 ? "shop" : "shops"}
      </p>

      {savedShops.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-lg font-semibold">No saved shops yet</h2>
          <p className="mt-2 text-sm text-gray-400">
            Open the Shop Analyzer and click the bookmark icon on a shop
            you want to save.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {savedShops.map((shop) => (
            <article
              key={shop.shop_id}
              className="rounded-xl border border-gray-800 bg-gray-900 p-5"
            >
              <h2 className="text-xl font-bold">{shop.shop_name}</h2>

              <p className="mt-2 text-sm text-gray-300">
                {shop.title || "No shop title provided"}
              </p>

              <div className="mt-4 space-y-2 text-sm text-gray-400">
                <p>Shop ID: {shop.shop_id}</p>
                <p>
                  Active listings:{" "}
                  {shop.listing_active_count?.toLocaleString() ?? "—"}
                </p>
                <p>Currency: {shop.currency_code || "—"}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`https://www.etsy.com/shop/${encodeURIComponent(shop.shop_name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Visit on Etsy ↗
                </a>

                <button
                  type="button"
                  onClick={() => removeShop(shop.shop_id)}
                  className="rounded-lg border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
