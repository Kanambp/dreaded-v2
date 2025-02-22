module.exports = async (context) => {
    const { client, m, text, fetchJson } = context;
    const yts = require("yt-search");

    try {
        if (!text) return m.reply("What song do you want to download?");

        const { videos } = await yts(text);
        if (!videos || videos.length === 0) {
            return m.reply("No songs found!");
        }

        const urlYt = videos[0].url;

        try {
            let data = await fetchJson(`https://gtech-api-xtp1.onrender.com/ytdl?url=${urlYt}`);

            const {
                title,
                thumbnail,
                duration,
                audio: audioUrl,
            } = data.result;

            await m.reply(`_Downloading ${title}_`);

            await client.sendMessage(
                m.chat,
                {
                    document: { url: audioUrl },
                    mimetype: "audio/mpeg",
                    fileName: `${title}.mp3`,
                },
                { quoted: m }
            );
        } catch (primaryError) {
            console.error("Primary API failed:", primaryError.message);

            try {
                const fallbackData = await fetchJson(`https://api.onlinevideoconverter.pro/api/ytdl?url=${urlYt}`);
                if (!fallbackData || !fallbackData.result || !fallbackData.result.audio) {
                    throw new Error("Invalid response from fallback API");
                }

                const { title: name, audio: audioUrl } = fallbackData.result;

                await m.reply(`_Downloading ${name}_`);
                await client.sendMessage(
                    m.chat,
                    {
                        document: { url: audioUrl },
                        mimetype: "audio/mpeg",
                        fileName: `${name}.mp3`,
                    },
                    { quoted: m }
                );
            } catch (fallbackError) {
                console.error("Fallback API failed:", fallbackError.message);
                m.reply("Download failed: Unable to retrieve audio from both APIs.");
            }
        }
    } catch (error) {
        m.reply("Download failed\n" + error.message);
    }
};
            
