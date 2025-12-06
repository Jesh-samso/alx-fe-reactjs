// src/services/githubService.js
import axios from "axios";

const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: apiKey ? { Authorization: `token ${apiKey}` } : {}
});

export async function searchUsers(query) {
  // Returns the API response data for a search
  const res = await axiosInstance.get(`/search/users`, {
    params: { q: query }
  });
  return res.data; // has items array
}

export async function getUser(username) {
  const res = await axiosInstance.get(`/users/${username}`);
  return res.data;
}
