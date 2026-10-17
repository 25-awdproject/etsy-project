

"use client";

import { useEffect, useState } from "react";

type EtsyShop = {
  shop_id: number;
  shop_name: string;
  title?: string;
  announcement?: string;
  currency_code?: string;
  is_vacation?: boolean;
  listing_active_count?: number;
};

type EtsyResponse = {
  count: number;
  results: EtsyShop[];
};

export default function ShopAnalyzer() {
  const [shopName, setShopName] = useState("");
  const [shopData, setShopData] = useState<EtsyResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [savedShopIds, setSavedShopIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("etsy-saved-shops");

      if (stored) {
        const savedShops: EtsyShop[] = JSON.parse(stored);
        setSavedShopIds(savedShops.map((shop) => shop.shop_id));
      }
    } catch {
      setSavedShopIds([]);
    }
  }, []);

  function toggleSavedShop(shop: EtsyShop) {
    let savedShops: EtsyShop[] = [];

    try {
      const stored = localStorage.getItem("etsy-saved-shops");
      savedShops = stored ? JSON.parse(stored) : [];
    } catch {
      savedShops = [];
    }

    const alreadySaved = savedShops.some(
      (savedShop) => savedShop.shop_id === shop.shop_id
    );

    const updatedShops = alreadySaved
      ? savedShops.filter(
        (savedShop) => savedShop.shop_id !== shop.shop_id
      )
      : [...savedShops, shop];

    localStorage.setItem(
      "etsy-saved-shops",
      JSON.stringify(updatedShops)
    );

    setSavedShopIds(updatedShops.map((savedShop) => savedShop.shop_id));
  }

  const shopsPerPage = 20;
  const totalPages = Math.ceil(
    (shopData?.count ?? 0) / shopsPerPage
  );

  async function fetchShops(name: string, page: number) {
    setLoading(true);
    setError("");

    try {
      const offset = (page - 1) * shopsPerPage;

      const response = await fetch(
        `/api/etsy-test?shop_name=${encodeURIComponent(name)}&limit=${shopsPerPage}&offset=${offset}`
      );

      const data: EtsyResponse | { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(
          "error" in data ? data.error : "Failed to fetch shops."
        );
      }

      setShopData(data as EtsyResponse);
      setCurrentPage(page);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleAnalyze(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!shopName.trim()) {
      setError("Please enter an Etsy shop name.");
      return;
    }

    const query = shopName.trim();

    try {
      const stored = localStorage.getItem("etsy-search-history");
      const history: string[] = stored ? JSON.parse(stored) : [];

      const updatedHistory = [
        query,
        ...history.filter(
          (item) => item.toLowerCase() !== query.toLowerCase()
        ),
      ].slice(0, 20);

      localStorage.setItem(
        "etsy-search-history",
        JSON.stringify(updatedHistory)
      );
    } catch {
      // Continue searching even if history cannot be saved.
    }

    setShopData(null);
    fetchShops(shopName.trim(), 1);
  }

  return (
    <main className="min-h-screen bg-gray-950 px-5 py-14 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-400">
            Etsy Seller Tools
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Etsy Shop Analyzer
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Explore shop information and active listings using Etsy data.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
            onSubmit={handleAnalyze}
          >
            <input
              value={shopName}
              onChange={(event) => setShopName(event.target.value)}
              placeholder="Enter an Etsy shop name"
              className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 outline-none focus:border-orange-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Searching..." : "Analyze Shop"}
            </button>
          </form>
        </header>

        {error && (
          <p className="mt-8 rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
            {error}
          </p>
        )}

        {shopData && (
          <section className="mt-10">
            <p className="mb-5 text-sm text-gray-400">
              {shopData.count.toLocaleString()} matching shops.
              {" "}Page {currentPage} of {Math.max(totalPages, 1)}.
              {" "}Showing {shopData.results.length} shops on this page.
            </p>

            {shopData.results.length === 0 ? (
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                No shops found on this page.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {shopData.results.map((shop) => (
                  <div key={shop.shop_id} className="rounded-xl border border-gray-800 bg-gray-900 p-5">

                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-xl font-bold">
                        {shop.shop_name}
                      </h2>

                      <button
                        type="button"
                        onClick={() => toggleSavedShop(shop)}
                        aria-label={
                          savedShopIds.includes(shop.shop_id)
                            ? "Remove saved shop"
                            : "Save shop"
                        }
                        title={
                          savedShopIds.includes(shop.shop_id)
                            ? "Remove from saved shops"
                            : "Save shop"
                        }
                        className="shrink-0 rounded-lg border border-gray-700 p-2 text-orange-400 hover:bg-gray-800"
                      >
                        {savedShopIds.includes(shop.shop_id) ? "★" : "☆"}
                      </button>
                    </div>

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
                      <p>
                        Status:{" "}
                        {shop.is_vacation ? "On vacation" : "Not on vacation"}
                      </p>
                    </div>

                    <a
                      href={`https://www.etsy.com/shop/${encodeURIComponent(shop.shop_name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-block font-semibold text-orange-400 hover:text-orange-300"
                    >
                      Visit shop on Etsy ↗
                    </a>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  fetchShops(shopName.trim(), currentPage - 1)
                }
                disabled={loading || currentPage <= 1}
                className="rounded-lg border border-gray-700 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-gray-400">
                Page {currentPage} of {Math.max(totalPages, 1)}
              </span>

              <button
                onClick={() =>
                  fetchShops(shopName.trim(), currentPage + 1)
                }
                disabled={loading || currentPage >= totalPages}
                className="rounded-lg bg-orange-500 px-5 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}