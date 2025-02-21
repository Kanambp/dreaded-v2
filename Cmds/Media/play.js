const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

const app = express();
const PORT = process.env.PORT || 5000;

ffmpeg.setFfmpegPath(ffmpegPath);
app.use(cors());

app.get("/download", async (req, res) => {
    const url = req.query.url;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    try {
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, ""); // Clean filename
        const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });

        res.setHeader("Content-Disposition", `attachment; filename="${title}.mp3"`);
        res.setHeader("Content-Type", "audio/mpeg");

        ffmpeg(stream)
            .audioCodec("libmp3lame")
            .toFormat("mp3")
            .pipe(res, { end: true });
    } catch (error) {
        console.error("Error downloading:", error.message);
        res.status(500).json({ error: "Failed to process the audio" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
