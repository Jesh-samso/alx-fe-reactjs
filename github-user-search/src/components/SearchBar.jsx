// src/components/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search GitHub users (e.g., octocat)"
        style={{ padding: 8, width: 300 }}
      />
      <button type="submit" style={{ marginLeft: 8, padding: 8 }}>
        Search
      </button>
    </form>
  );
}
