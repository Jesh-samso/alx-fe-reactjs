// src/App.jsx
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import { searchUsers } from "./services/githubService";

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(q) {
    setLoading(true);
    setError("");
    try {
      const data = await searchUsers(q);
      setResults(data.items || []);
    } catch (err) {
      console.error(err);
      setError("Failed to search. Check console or your token.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <div>Loading…</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {results.length === 0 && !loading && <div>No results yet</div>}
      {results.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
