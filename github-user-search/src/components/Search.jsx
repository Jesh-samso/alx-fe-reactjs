import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      console.error(err);
      setError("like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>GitHub User Search</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 8, width: 250 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 10 }}>
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Success State */}
      {user && (
        <div style={{ marginTop: 20 }}>
          <img
            src={user.avatar_url}
            alt="avatar"
            width="100"
            style={{ borderRadius: "50%" }}
          />
          <h3>{user.login}</h3>
          <a href={user.html_url} target="_blank">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}
