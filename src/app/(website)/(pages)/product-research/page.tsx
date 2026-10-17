
import PageHeader from "../../component/layout/PageHeader/page";

const researchFeatures = [
  {
    title: "Product Discovery",
    description:
      "Explore product ideas and discover opportunities in the Etsy marketplace.",
  },
  {
    title: "Shop Comparison",
    description:
      "Compare shops using available listing counts and shop information.",
  },
  {
    title: "Product Opportunities",
    description:
      "Organize product ideas for further research and analysis.",
  },
];

export default function ProductResearchPage() {
  return (
    <div>
      <PageHeader
        title="Product Research"
        description="Explore Etsy product ideas and discover potential market opportunities."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {researchFeatures.map((feature) => (
          <section
            key={feature.title}
            className="rounded-xl border border-gray-800 bg-gray-900 p-6"
          >
            <h2 className="text-xl font-semibold text-white">
              {feature.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              {feature.description}
            </p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="text-lg font-semibold">
          Research Workspace
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Product research tools will be added here in future development.
        </p>
      </section>
    </div>
  );
}
