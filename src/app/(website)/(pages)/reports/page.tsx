
import Link from "next/link";
import PageHeader from "../../component/layout/PageHeader/page";

const reports = [
  {
    title: "Shop Analysis",
    description: "Search Etsy shops and review their available information.",
    href: "/",
    status: "Available",
  },
  {
    title: "Keyword Research",
    description: "Explore keyword ideas and their research categories.",
    href: "/keyword-research",
    status: "Available",
  },
  {
    title: "Product Research",
    description: "Explore product research ideas and opportunities.",
    href: "/product-research",
    status: "Available",
  },
];

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Access your Etsy research tools and prepare reports from your findings."
      />

      <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 p-5">
        <h2 className="text-lg font-semibold">Research Reports</h2>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          Your research tools are available below. Automatic report generation
          and PDF downloads can be added in a future development step.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report.title}
            className="rounded-xl border border-gray-800 bg-gray-900 p-5"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-orange-400">
              {report.status}
            </span>

            <h2 className="mt-3 text-xl font-bold">{report.title}</h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {report.description}
            </p>

            <Link
              href={report.href}
              className="mt-5 inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Open Research →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
