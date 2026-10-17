
import Link from "next/link";
import PageHeader from "../component/layout/PageHeader/page";

const tools = [
  {
    title: "Shop Analyzer",
    description: "Search Etsy shops and explore their available listings and shop information.",
    href: "/shop-analyzer",
    icon: "🔎",
  },
  {
    title: "Product Research",
    description: "Explore product ideas and identify opportunities for further research.",
    href: "/product-research",
    icon: "🛍️",
  },
  {
    title: "Keyword Research",
    description: "Discover keyword ideas to guide your Etsy research.",
    href: "/keyword-research",
    icon: "⌕",
  },
  {
    title: "Keyword Difficulty",
    description: "Explore the keyword difficulty demonstration tool.",
    href: "/keyword-difficulty",
    icon: "📊",
  },
  {
    title: "Keyword Clustering",
    description: "Organize related keywords into groups.",
    href: "/keyword-clustering",
    icon: "🗂️",
  },
  {
    title: "Market Trends",
    description: "Explore categories and potential market research topics.",
    href: "/market-trends",
    icon: "📈",
  },
  {
    title: "Saved Shops",
    description: "Review Etsy shops you've bookmarked.",
    href: "/saved-shops",
    icon: "⭐",
  },
  {
    title: "Search History",
    description: "Review and revisit your recent shop searches.",
    href: "/search-history",
    icon: "🕘",
  },
  {
    title: "Reports",
    description: "Access your research tools and report-related features.",
    href: "/reports",
    icon: "📄",
  },
];

export default function Home() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome to your Etsy research workspace. Choose a tool to get started."
      />

      <div className="mb-8 rounded-2xl border border-orange-500/20 bg-linear-to-r from-orange-500/10 to-gray-900 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">
          Etsy Seller Tools
        </p>

        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
          Research smarter with Etsy data
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-gray-400">
          Search shops, explore product and keyword research tools, organize
          your saved shops, and review your research in one place.
        </p>

        <Link
          href="/shop-analyzer"
          className="mt-6 inline-block rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Open Shop Analyzer →
        </Link>
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Your Research Tools</h2>
        <span className="text-sm text-gray-500">
          {tools.length} tools
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:border-orange-500/60 hover:bg-gray-900/80"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">
                {tool.icon}
              </span>
              <h3 className="text-lg font-semibold group-hover:text-orange-400">
                {tool.title}
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              {tool.description}
            </p>

            <p className="mt-5 text-sm font-semibold text-orange-400">
              Open tool →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

