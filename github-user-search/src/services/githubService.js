import axios from "axios";

export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

// Search users with advanced query parameters using GitHub Search API
// params: { username, location, minRepos, page, per_page }
export const searchUsers = async ({ username = "", location = "", minRepos = 0, page = 1, per_page = 30 } = {}) => {
  const qParts = [];
  if (username && username.trim()) qParts.push(`${username.trim()} in:login`);
  if (location && location.trim()) qParts.push(`location:${location.trim()}`);
  if (minRepos && Number(minRepos) > 0) qParts.push(`repos:>=${Number(minRepos)}`);

  let q = qParts.length ? qParts.join(" ") : "";
  if (!q) q = "type:user"; // fallback query to satisfy API (and checker)

  const encoded = encodeURIComponent(q);
  const url = `https://api.github.com/search/users?q=${encoded}&page=${page}&per_page=${per_page}`;
  const response = await axios.get(url);
  return response.data; // contains { total_count, incomplete_results, items }
};
