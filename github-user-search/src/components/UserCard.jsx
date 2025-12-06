// src/components/UserCard.jsx
import React from "react";

export default function UserCard({ user }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: 12,
      borderRadius: 8,
      display: "flex",
      gap: 12,
      alignItems: "center",
      maxWidth: 600,
      marginBottom: 12
    }}>
      <img src={user.avatar_url} alt="" width="64" height="64" style={{ borderRadius: 8 }} />
      <div>
        <a href={user.html_url} target="_blank" rel="noreferrer" style={{ fontWeight: "bold" }}>
          {user.login}
        </a>
        <div>Score: {user.score ? user.score.toFixed(2) : "—"}</div>
      </div>
    </div>
  );
}
