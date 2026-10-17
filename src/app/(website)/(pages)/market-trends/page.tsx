
import PageHeader from "../../component/layout/PageHeader/page";

const trends = [
  {
    category: "Home & Living",
    trend: "Home Decor",
    demand: "Popular category",
    description: "Explore products such as wall art, decorative items, and home accessories.",
  },
  {
    category: "Jewelry",
    trend: "Personalized Jewelry",
    demand: "Research opportunity",
    description: "Explore customized necklaces, bracelets, and meaningful gifts.",
  },
  {
    category: "Gifts",
    trend: "Personalized Gifts",
    demand: "Seasonal opportunity",
    description: "Explore customized products for birthdays and special occasions.",
  },
  {
    category: "Art & Collectibles",
    trend: "Digital Downloads",
    demand: "Research opportunity",
    description: "Explore printable artwork, planners, and digital designs.",
  },
];

export default function MarketTrendsPage() {
  return (
    <div>
      <PageHeader
        title="Market Trends"
        description="Explore product categories and discover ideas for further Etsy market research."
      />

      <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 p-5">
        <h2 className="text-lg font-semibold">Market Overview</h2>
        <p className="mt-2 text-sm text-gray-400">
          These are example research topics, not verified live market trends.
          Live trend analysis can be added using reliable data sources later.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {trends.map((item) => (
          <div
            key={item.trend}
            className="rounded-xl border border-gray-800 bg-gray-900 p-5"
          >
            <p className="text-sm text-orange-400">{item.category}</p>

            <h2 className="mt-2 text-xl font-bold">{item.trend}</h2>

            <p className="mt-3 text-sm font-medium text-gray-300">
              {item.demand}
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
