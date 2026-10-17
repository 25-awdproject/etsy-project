
"use client";

import { useState } from "react";
import PageHeader from "../../component/layout/PageHeader/page";

export default function KeywordClusteringPage() {
  const [keywords, setKeywords] = useState(
    "personalized mug, custom mug, wall art, canvas print, birthday gift"
  );
  const [clusters, setClusters] = useState<string[][]>([]);

  function handleCluster(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const words = keywords
      .split(",")
      .map((word) => word.trim())
      .filter(Boolean);

    const groups: Record<string, string[]> = {
      Gifts: [],
      Mugs: [],
      Art: [],
      Other: [],
    };

    words.forEach((word) => {
      const lower = word.toLowerCase();

      if (lower.includes("gift") || lower.includes("birthday")) {
        groups.Gifts.push(word);
      } else if (lower.includes("mug") || lower.includes("cup")) {
        groups.Mugs.push(word);
      } else if (
        lower.includes("art") ||
        lower.includes("print") ||
        lower.includes("canvas")
      ) {
        groups.Art.push(word);
      } else {
        groups.Other.push(word);
      }
    });

    setClusters(
      Object.values(groups).filter((group) => group.length > 0)
    );
  }

  const clusterNames = ["Gifts", "Mugs", "Art", "Other"];

  return (
    <div>
      <PageHeader title="Keyword Clustering" description="Organize related keywords into simple groups."/>

      <form onSubmit={handleCluster}>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Enter keywords separated by commas
        </label>

        <textarea
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
          rows={4}
          placeholder="personalized mug, wall art, birthday gift"
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-orange-400"
        />

        <button
          type="submit"
          className="mt-4 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Group Keywords
        </button>
      </form>

      {clusters.length > 0 && (
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {clusters.map((cluster, index) => (
            <div
              key={clusterNames.indexOf(
                ["Gifts", "Mugs", "Art", "Other"].find((name) =>
                  cluster.some((word) => {
                    const lower = word.toLowerCase();
                    if (name === "Gifts")
                      return lower.includes("gift") || lower.includes("birthday");
                    if (name === "Mugs")
                      return lower.includes("mug") || lower.includes("cup");
                    if (name === "Art")
                      return lower.includes("art") || lower.includes("print") || lower.includes("canvas");
                    return !(
                      lower.includes("gift") ||
                      lower.includes("birthday") ||
                      lower.includes("mug") ||
                      lower.includes("cup") ||
                      lower.includes("art") ||
                      lower.includes("print") ||
                      lower.includes("canvas")
                    );
                  })
                ) ?? "Other"
              ) + "-" + index}
              className="rounded-xl border border-gray-800 bg-gray-900 p-5"
            >
              <h2 className="text-lg font-semibold">
                {clusterNames.find((name) =>
                  cluster.some((word) => {
                    const lower = word.toLowerCase();
                    if (name === "Gifts")
                      return lower.includes("gift") || lower.includes("birthday");
                    if (name === "Mugs")
                      return lower.includes("mug") || lower.includes("cup");
                    if (name === "Art")
                      return lower.includes("art") || lower.includes("print") || lower.includes("canvas");
                    return !(
                      lower.includes("gift") ||
                      lower.includes("birthday") ||
                      lower.includes("mug") ||
                      lower.includes("cup") ||
                      lower.includes("art") ||
                      lower.includes("print") ||
                      lower.includes("canvas")
                    );
                  })
                ) ?? "Other"}
              </h2>

              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-400">
                {cluster.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <p className="mt-6 text-sm text-gray-500">
        Groups are based on simple word matching, not AI or live Etsy data.
      </p>
    </div>
  );
}
