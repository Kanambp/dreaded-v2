const fetch = require("node-fetch");

module.exports = async function ({ client, m }) {
  try {
    // Define the GitHub API endpoint for the repository.
    const repoUrl = "https://api.github.com/repos/Kanambp/dreaded-v2";

    // Fetch repository data from GitHub.
    const response = await fetch(repoUrl);

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const repoData = await response.json();

    // Extract details from the API response.
    const ownerLogin = repoData.owner?.login || "Unknown";
    const forksCount = repoData.forks_count || 0;
    const starsCount = repoData.stargazers_count || 0;
    const createdAt = new Date(repoData.created_at).toLocaleDateString("en-GB");
    const updatedAt = new Date(repoData.updated_at).toLocaleDateString("en-GB");

    // Build a message text that includes repository details.
    const messageText = 
      `*🖇️Repo: ${repoData.html_url}*\n\n` +
      `*🥷Owner: ${ownerLogin}*\n\n` +
      `*🌟Stars: ${starsCount}*\n\n` +
      `*⚓Forks: ${forksCount}*\n\n` +
      `*⚒️Created At: ${createdAt}*\n\n` +
      `*🕐 Last Updated: ${updatedAt}*\n`;

    // Send the message with an image from a URL.
    await client.sendMessage(
      m.chat,
      {
        image: { url: "https://files.catbox.moe/dcoxvf.jpg" },
        caption: messageText,
      },
      { quoted: m }
    );
  } catch (error) {
    console.error("Error fetching GitHub repository:", error.message);
    await client.sendMessage(
      m.chat,
      { text: "Failed to fetch repository details. Please try again later." },
      { quoted: m }
    );
  }
};
