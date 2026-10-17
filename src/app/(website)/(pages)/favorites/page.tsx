
"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../component/layout/PageHeader/page";

type Favorite = {
  id: number;
  name: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("etsy-favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("etsy-favorites", JSON.stringify(favorites));
    }
  }, [favorites, loaded]);

  function addFavorite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = name.trim();

    if (!value || favorites.some(
      (favorite) => favorite.name.toLowerCase() === value.toLowerCase()
    )) {
      return;
    }

    setFavorites((previous) => [
      ...previous,
      { id: Date.now(), name: value },
    ]);

    setName("");
  }

  function removeFavorite(id: number) {
    setFavorites((previous) =>
      previous.filter((favorite) => favorite.id !== id)
    );
  }

  return (
    <div>
      <PageHeader
        title="Favorites"
        description="Keep a separate list of your favorite research ideas or items."
      />

      <form
        onSubmit={addFavorite}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter a favorite idea or item"
          required
          className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-orange-400"
        />

        <button
          type="submit"
          className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Add Favorite
        </button>
      </form>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">
          Your Favorites ({favorites.length})
        </h2>

        {favorites.length === 0 ? (
          <p className="rounded-xl border border-gray-800 bg-gray-900 p-5 text-gray-400">
            No favorites yet. Add an idea to get started.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4"
              >
                <span className="wrap-break-word">{favorite.name}</span>

                <button
                  type="button"
                  onClick={() => removeFavorite(favorite.id)}
                  className="shrink-0 rounded-lg border border-gray-700 px-3 py-2 text-sm hover:bg-gray-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
