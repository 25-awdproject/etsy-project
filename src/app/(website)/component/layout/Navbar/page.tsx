
import Link from "next/link";

const navLinks = [
  { name: "Dashboard", href: "/" },
  { name: "Shop Analyzer", href: "/shop-analyzer" },
  { name: "Product Research", href: "/product-research" },
  { name: "Keyword Research", href: "/keyword-research" },
];

export default function Navbar() {
  return (
    <header className="border-b border-gray-800 bg-gray-950 text-white">
      <nav className="mx-auto sticky top-0 z-50 flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="text-xl font-bold">
          Etsy<span className="text-orange-400">Analyzer</span>
        </Link>

        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-orange-400"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
