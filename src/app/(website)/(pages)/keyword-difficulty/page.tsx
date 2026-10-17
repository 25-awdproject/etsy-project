
"use client";

import { useState } from "react";
import PageHeader from "../../component/layout/PageHeader/page";

export default function KeywordDifficultyPage() {
  const [keyword, setKeyword] = useState("");
  const [analyzedKeyword, setAnalyzedKeyword] = useState("");

  function handleAnalyze(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnalyzedKeyword(keyword.trim());
  }

  const sampleScore = analyzedKeyword ? (analyzedKeyword.length * 7) % 101 : 0;

  const difficulty = sampleScore < 35 ? "Low" : sampleScore < 70 ? "Medium" : "High";

  return (
    <div>
      <PageHeader
        title="Keyword Difficulty"
        description="Explore a demonstration interface for evaluating keyword competition."
      />

      <form
        onSubmit={handleAnalyze}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Enter a keyword..."
          required
          className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-orange-400"
        />

        <button
          type="submit"
          className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Analyze Keyword
        </button>
      </form>

      {analyzedKeyword && (
        <section className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <p className="text-sm text-gray-400">Keyword entered</p>

          <h2 className="mt-1 text-2xl font-bold">
            {analyzedKeyword}
          </h2>

          <div className="mt-6">
            <p className="text-sm text-gray-400">
              Demonstration score
            </p>

            <p className="mt-1 text-4xl font-bold text-orange-400">
              {sampleScore}/100
            </p>

            <p className="mt-3 text-gray-300">
              Example category: <strong>{difficulty}</strong>
            </p>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            This score is generated for demonstration only. It does not
            measure actual Etsy competition or search volume.
          </p>
        </section>
      )}
    </div>
  );
}
