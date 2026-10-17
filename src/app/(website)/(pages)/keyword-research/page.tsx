
"use client";

import PageHeader from "../../component/layout/PageHeader/page";
import { useState } from "react";

const keywordExamples = [
  { keyword: "Personalized Gift", intent: "Gift", competition: "High" },
  { keyword: "Ceramic Mug", intent: "Home & Kitchen", competition: "Medium" },
  { keyword: "Custom Wall Art", intent: "Decor", competition: "Medium" },
];

export default function KeywordResearchPage() {
  const [keyword, setKeyword] = useState("");
  const [searchedKeyword, setSearchedKeyword] = useState("");

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchedKeyword(keyword.trim());
  }

  const filteredKeywords = keywordExamples.filter((item) =>
    item.keyword.toLowerCase().includes(searchedKeyword.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Keyword Research"
        description="Explore example Etsy keywords and organize ideas for further research."
      />

      <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Search example keywords..."
          className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-orange-400"
        />

        <button
          type="submit"
          className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Search
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th className="p-4">Keyword</th>
              <th className="p-4">Category / Intent</th>
              <th className="p-4">Example Competition</th>
            </tr>
          </thead>

          <tbody>
            {filteredKeywords.map((item) => (
              <tr key={item.keyword} className="border-t border-gray-800">
                <td className="p-4">{item.keyword}</td>
                <td className="p-4 text-gray-400">{item.intent}</td>
                <td className="p-4 text-gray-400">{item.competition}</td>
              </tr>
            ))}

            {filteredKeywords.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-gray-400">
                  No matching example keywords. Try another search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Note: These are demonstration examples, not live Etsy keyword metrics.
      </p>
    </div>
  );
}
