const simpleGit = require("simple-git"); const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');

module.exports = async (context) => { await ownerMiddleware(context, async () => { const { client, m, text, Owner } = context; const git = simpleGit();

if (text.trim() === ".update") {
 try {
 await git.addRemote('upstream', 'https://github.com/Kanambp/dreaded-v2.git').catch(() => {});
 await git.fetch('upstream');
 
 const commits = await git.log(['main' + '..upstream/main']);
 
 if (commits.total > 0) {
 let updateMessage = `Updates available: ${commits.total} commits\n\n`;
 commits.all.forEach(commit => {
 updateMessage += `● ${commit.date.substring(0, 10)}: ${commit.message} - By: ${commit.author_name}\n`;
 });
 
 await m.reply(updateMessage + "\nUpdating bot...");
 
 await git.pull('upstream', 'main');
 await m.reply("Update complete! Restarting bot...");
 
 process.exit(1); // Restart bot
 } else {
 await m.reply('You are already using the latest version.');
 }
 } catch (error) {
 await m.reply('Failed to update bot. ' + error.message);
 }
}

}); };