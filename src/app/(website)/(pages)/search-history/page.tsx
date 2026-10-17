
"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../component/layout/PageHeader/page";

export default function SearchHistoryPage() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("etsy-search-history");

      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      setHistory([]);
    }
  }, []);

  function clearHistory() {
    localStorage.removeItem("etsy-search-history");
    setHistory([]);
  }

  return (
    <div>
      <PageHeader
        title="Search History"
        description="Review previous Etsy shop searches from this browser."
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-400">
          {history.length} recent searches
        </p>

        {history.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-lg font-semibold">No searches yet</h2>
          <p className="mt-2 text-sm text-gray-400">
            Search for a shop on the Shop Analyzer page to build your history.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-orange-400">⌕</span>

                <span className="wrap-break-word">{item}</span>
              </div>

              <a
                href={`/?shop_name=${encodeURIComponent(item)}`}
                className="shrink-0 text-sm font-semibold text-orange-400 hover:text-orange-300"
              >
                Search again →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
