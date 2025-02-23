const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const githubToken = process.env.GITHUB_TOKEN || 'your_github_personal_access_token';
const githubUsername = process.env.GITHUB_USERNAME || 'your_github_username';
const repoName = process.env.REPO_NAME || 'your_github_repo_name';
const branch = process.env.BRANCH || 'main';

const UploadCommand = async (context) => {
    await ownerMiddleware(context, async () => {
        const { m, text, prefix } = context;

        if (!text.includes('|')) {
            return m.reply(`Provide command name, category, and code separated by '|'. Example:
${prefix}uploadcmd yes|Owner|console.log('Hello, Owner!');`);
        }

        const [fileName, category, ...fileContentArr] = text.split('|').map(str => str.trim());
        const fileContent = fileContentArr.join('|');

        if (!fileName || !category || !fileContent) {
            return m.reply(`Invalid format. Use: ${prefix}uploadcmd commandName|category|command code`);
        }

        const categoryPath = `Cmds/${category}`;
        const filePath = `${categoryPath}/${fileName}.js`;
        const encodedContent = Buffer.from(fileContent, 'utf8').toString('base64');
        const url = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`;

        try {
            let sha = '';
            try {
                const response = await axios.get(url, {
                    headers: { Authorization: `token ${githubToken}` }
                });
                sha = response.data.sha;
            } catch (err) {
                // File does not exist, so it will be created
            }

            await axios.put(url, {
                message: `Added ${fileName}.js to ${category}`,
                content: encodedContent,
                branch: branch,
                sha: sha || undefined
            }, {
                headers: { Authorization: `token ${githubToken}` }
            });

            m.reply(`✅ Command '${fileName}.js' successfully uploaded to '${category}' and pushed to GitHub!`);
        } catch (error) {
            m.reply(`❌ Error uploading to GitHub: ${error.response?.data?.message || error.message}`);
        }
    });
};

module.exports = UploadCmd;
