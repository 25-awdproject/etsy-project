

"use client";

import { useState } from "react";

type EtsyListing = {
  listing_id: number;
  title: string;
  url?: string;
  price?: {
    amount: number;
    divisor: number;
    currency_code: string;
  };
  images?: {
    url_75x75?: string;
    url_170x135?: string;
    url_570xN?: string;
  }[];
  tags?: string[];
  shop_id?: number;
  creation_timestamp?: number;
};

type EtsyResponse = {
  count?: number;
  results?: EtsyListing[];
  error?: string;
};

export default function KeywordResearchPage() {
  const [keyword, setKeyword] = useState("");
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [listings, setListings] = useState<EtsyListing[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const limit = 20;

  async function searchKeyword(nextOffset = 0) {
    const term = keyword.trim();

    if (!term) {
      setError("Please enter a keyword.");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);
    setSearchedKeyword(term);

    try {
      const response = await fetch(
        `/api/keyword-research?keywords=${encodeURIComponent(
          term
        )}&limit=${limit}&offset=${nextOffset}`
      );

      const data: EtsyResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Keyword search failed.");
      }

      const results = data.results ?? [];

      setListings(results);
      setTotal(data.count ?? results.length);
      setOffset(nextOffset);

      if (results.length === 0) {
        setError("No listings were found for this keyword.");
      }
    } catch (err) {
      setListings([]);
      setTotal(0);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const prices = listings
    .map((listing) => {
      const price = listing.price;

      if (!price || !price.divisor) return null;

      const amount = price.amount / price.divisor;

      return Number.isFinite(amount) && amount >= 0
        ? amount
        : null;
    })
    .filter((price): price is number => price !== null);

  const averagePrice = prices.length
    ? prices.reduce((sum, price) => sum + price, 0) /
      prices.length
    : null;

  const currency =
    listings.find((listing) => listing.price?.currency_code)
      ?.price?.currency_code ?? "";

  const phraseCounts = new Map<string, number>();

  listings.forEach((listing) => {
    const phrases = [
      ...(listing.tags ?? []),
      ...listing.title
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((word) => word.length > 2),
    ];

    phrases.forEach((phrase) => {
      const normalized = phrase.trim().toLowerCase();

      if (normalized) {
        phraseCounts.set(
          normalized,
          (phraseCounts.get(normalized) ?? 0) + 1
        );
      }
    });
  });

  const topPhrases = Array.from(phraseCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  function formatPrice(amount: number) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currency || "USD",
      }).format(amount);
    } catch {
      return `${amount.toFixed(2)} ${currency}`;
    }
  }

  return (
    <div className="space-y-8 text-white">
      {/* Page heading */}
      <header>
        <p className="text-sm font-semibold tracking-widest text-orange-500">
          ETSY SELLER TOOLS
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Keyword Research
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
          Research Etsy listings, compare listed prices, and discover
          frequently appearing words and phrases.
        </p>
      </header>

      {/* Search */}
      <form
        className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          void searchKeyword(0);
        }}
      >
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 focus-within:border-orange-500">
          <span className="text-orange-500" aria-hidden="true">
            ⌕
          </span>

          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Try canvas tote bag..."
            aria-label="Search Etsy keywords"
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Searching..." : "Research Keyword"}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <div
          role="status"
          className="rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      {loading && (
        <p className="text-sm text-gray-400">
          Fetching matching listings from Etsy...
        </p>
      )}

      {/* Research results */}
      {hasSearched && !loading && (
        <>
          {/* Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              label="Reported Matching Listings"
              value={total.toLocaleString()}
              note="Count reported by Etsy API"
            />

            <Metric
              label="Listings on This Page"
              value={listings.length.toString()}
              note="Results currently displayed"
            />

            <Metric
              label="Average Listed Price"
              value={
                averagePrice === null
                  ? "—"
                  : formatPrice(averagePrice)
              }
              note={`${prices.length} listings with valid prices`}
            />

            <Metric
              label="Unique Phrases"
              value={phraseCounts.size.toLocaleString()}
              note="Words and tags from this page"
            />
          </div>

          {/* Keyword phrase discovery */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold">
                  Keyword Phrase Discovery
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Frequently appearing words and tags for{" "}
                  <span className="font-medium text-orange-400">
                    {searchedKeyword}
                  </span>
                </p>
              </div>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-gray-300">
                Current page only
              </span>
            </div>

            {topPhrases.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {topPhrases.map(([phrase, count]) => (
                  <button
                    key={phrase}
                    type="button"
                    onClick={() => {
                      setKeyword(phrase);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm transition hover:border-orange-500 hover:text-orange-400"
                    title="Use this phrase as a new search"
                  >
                    {phrase}
                    <span className="ml-2 text-gray-500">
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-400">
                No phrases available yet.
              </p>
            )}
          </section>

          {/* Etsy listings */}
          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">
                  Matching Etsy Listings
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Page {Math.floor(offset / limit) + 1} ·{" "}
                  {listings.length} results
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={loading || offset === 0}
                  onClick={() =>
                    void searchKeyword(Math.max(0, offset - limit))
                  }
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={
                    loading ||
                    offset + limit >= total ||
                    listings.length === 0
                  }
                  onClick={() => void searchKeyword(offset + limit)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>

            {listings.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {listings.map((listing) => {
                  const image =
                    listing.images?.find((item) => item.url_570xN)
                      ?.url_570xN ??
                    listing.images?.find((item) => item.url_170x135)
                      ?.url_170x135 ??
                    listing.images?.[0]?.url_75x75;

                  const price = listing.price;

                  const amount =
                    price && price.divisor
                      ? price.amount / price.divisor
                      : null;

                  return (
                    <article
                      key={listing.listing_id}
                      className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:border-orange-500/60"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={listing.title}
                          loading="lazy"
                          className="h-52 w-full bg-slate-800 object-cover"
                        />
                      ) : (
                        <div className="flex h-52 items-center justify-center bg-slate-800 text-sm text-gray-500">
                          No image available
                        </div>
                      )}

                      <div className="space-y-3 p-4">
                        <h3 className="line-clamp-2 min-h-12 font-medium">
                          {listing.title}
                        </h3>

                        <p className="text-lg font-bold text-orange-400">
                          {amount === null
                            ? "Price unavailable"
                            : formatPrice(amount)}
                        </p>

                        {listing.tags && listing.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {listing.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-slate-800 px-2 py-1 text-xs text-gray-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {listing.url && (
                          <a
                            href={listing.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex text-sm font-medium text-orange-400 transition hover:text-orange-300"
                          >
                            View on Etsy ↗
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <p className="text-xs leading-5 text-gray-500">
            These metrics describe the Etsy API results. They are not
            verified search volume, sales, clicks, or a validated
            keyword difficulty score.
          </p>
        </>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-3 wrap-break-word text-2xl font-bold">{value}</p>
      <p className="mt-2 text-xs text-gray-500">{note}</p>
    </div>
  );
}

