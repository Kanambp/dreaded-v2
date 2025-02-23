// This module fetches details of a GitHub repository and sends a formatted message. const fetch = require("node-fetch");

module.exports = async function ({ client, m }) { try { // Define the GitHub API endpoint for the repository. const repoUrl = "https://api.github.com/repos/Kanambp/dreaded-v2";

// Fetch repository data from GitHub.
const response = await fetch(repoUrl);
if (!response.ok) throw new Error("Failed to fetch repository data");
const repoData = await response.json();

// Extract details from the API response.
const ownerLogin = repoData.owner?.login || "Unknown";
const forksCount = repoData.forks_count || 0;
const starsCount = repoData.stargazers_count || 0;
const createdAt = new Date(repoData.created_at).toLocaleDateString("en-GB");
const updatedAt = new Date(repoData.updated_at).toLocaleDateString("en-GB");

// Build a message text that includes repository details.
const messageText = `*Repository: ${repoData.html_url}*\n` +
  `Owner: ${ownerLogin}\n` +
  `Stars: ${starsCount}\n` +
  `Forks: ${forksCount}\n` +
  `Created At: ${createdAt}\n\n` +
  `🕐 Last Updated: ${updatedAt}\n` +
  `Owner: ${ownerLogin}`;

// Send the message with the provided image URL.
await client.sendMessage(
  m.chat,
  { image: { url: "https://files.catbox.moe/dcoxvf.jpg" }, caption: messageText },
  { quoted: m }
);

} catch (error) { console.error("Error fetching repository details:", error); await client.sendMessage(m.chat, { text: "Failed to fetch repository details. Please try again later." }); } };

                                
