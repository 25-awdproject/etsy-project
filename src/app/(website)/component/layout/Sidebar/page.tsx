
import Link from "next/link";

const pages = [
  { name: "Dashboard", href: "/" },
  { name: "Shop Analyzer", href: "/shop-analyzer" },
  { name: "Keyword Research", href: "/keyword-research" },
  { name: "Product Research", href: "/product-research" },
  { name: "Keyword Difficulty", href: "/keyword-difficulty" },
  { name: "Keyword Clustering", href: "/keyword-clustering" },
  { name: "Saved Shops", href: "/saved-shops" },
  { name: "Favorites", href: "/favorites" },
  { name: "Search History", href: "/search-history" },
  { name: "Market Trends", href: "/market-trends" },
  { name: "Reports", href: "/reports" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-full md:sticky md:top-16 md:h-[calc(100vh-0.5rem)] md:self-start shrink-0 border-b border-gray-800 bg-gray-900 p-4 text-white md:w-60 md:border-b-0 md:border-r">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
        Workspace
      </h2>

      <nav className="flex flex-wrap gap-2 md:flex-col">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-400"
          >
            {page.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
