module.exports = async (context) => {
 const { client, m, prefix } = context;

const botname = process.env.BOTNAME||"KANAMBO";

 await client.sendMessage(m.chat, { image: { url: 'https://avatars.githubusercontent.com/u/106575586?v=4' }, caption: `Hello ${m.pushName}, KANAMBO is active now.\n\nType ${prefix}menu to see my command list..\n\nSome important links concerning the bot are given below.\n\nOfficial website:\n Soon😔\n\nPairing site:\n https://kanambo-qr-a4290a594f02.herokuapp.com\n\nRandom APIs site:\nwill come soon stay tune\n\nThis free random APIs are meant for other developers and may not always work.\n\nXd );`, fileLength: "9999999999898989899999999" }, { quoted: m }); 

}