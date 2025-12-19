import React, { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState(0);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const fetchAndEnrich = async (items) => {
    // fetch extra details (location, public_repos) for each user
    const detailed = await Promise.all(
      items.map(async (item) => {
        try {
          const d = await fetchUserData(item.login);
          return d;
        } catch (err) {
          return item; // fallback to basic item
        }
      })
    );
    return detailed;
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);
    setResults([]);
    setPage(1);
    setTotalCount(0);

    try {
      const data = await searchUsers({ username, location, minRepos, page: 1, per_page: perPage });
      const detailed = await fetchAndEnrich(data.items || []);
      setResults(detailed);
      setTotalCount(data.total_count || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users. You may have hit the GitHub rate limit.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    setError("");

    try {
      const data = await searchUsers({ username, location, minRepos, page: nextPage, per_page: perPage });
      const detailed = await fetchAndEnrich(data.items || []);
      setResults((prev) => [...prev, ...detailed]);
      setPage(nextPage);
      setTotalCount(data.total_count || totalCount);
    } catch (err) {
      console.error(err);
      setError("Failed to load more results.");
    } finally {
      setLoadingMore(false);
    }

  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">GitHub User Search</h2>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end mb-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            aria-label="username"
            type="text"
            placeholder="Search GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            aria-label="location"
            type="text"
            placeholder="e.g. London"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Min repos</label>
          <input
            aria-label="min-repos"
            type="number"
            min={0}
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="md:col-span-4 mt-2">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="space-y-4">
        {results.map((u) => (
          <div key={u.login} className="flex items-center gap-4 p-3 border rounded-md">
            <img src={u.avatar_url} alt={`${u.login} avatar`} className="w-16 h-16 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <a href={u.html_url} target="_blank" rel="noreferrer" className="text-lg font-medium text-indigo-600">
                    {u.login}
                  </a>
                  {u.name && <span className="ml-2 text-sm text-gray-600">{u.name}</span>}
                </div>
                <div className="text-sm text-gray-600">Repos: {u.public_repos ?? "-"}</div>
              </div>
              <div className="text-sm text-gray-500">{u.location ?? "Location not set"}</div>
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="mt-4">Loading...</p>}

      {!loading && results.length === 0 && <p className="mt-4 text-gray-600">No results yet.</p>}

      {results.length > 0 && results.length < totalCount && (
        <div className="mt-4 text-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            {loadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}

