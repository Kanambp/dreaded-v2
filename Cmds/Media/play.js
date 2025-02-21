const yts = require("yt-search"); const ytdl = require("ytdl-core");

module.exports = async (context) => { const { client, m, text } = context;

try {
    if (!text) return m.reply("What song do you want to download?");

    const { videos } = await yts(text);
    if (!videos || videos.length === 0) {
        return m.reply("No songs found!");
    }

    const urlYt = videos[0].url;

    try {
        const info = await ytdl.getInfo(urlYt);
        const format = ytdl.chooseFormat(info.formats, { filter: "audioonly" });
        
        if (!format || !format.url) {
            throw new Error("No suitable audio format found.");
        }

        const { title, author } = info.videoDetails;
        
        await m.reply(`_Downloading ${title} by ${author}_`);

        await client.sendMessage(
            m.chat,
            {
                document: { url: format.url },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`,
            },
            { quoted: m }
        );
    } catch (primaryError) {
        console.error("Primary method failed:", primaryError.message);
        m.reply("Download failed: Unable to retrieve audio.");
    }
} catch (error) {
    m.reply("Download failed\n" + error.message);
}

};

            
