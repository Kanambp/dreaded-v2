const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'place_token';
// GitHub Configuration (Replace with your details)
const GITHUB_USERNAME = 'Kanambp';
const REPO_NAME = 'https://github.com/Kanambp/dreaded-v2';
const BRANCH = 'main'; // Change if using a different branch

module.exports = async (context) => {
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
        
        try {
            // Encode file content in Base64 (required by GitHub API)
            const encodedContent = Buffer.from(fileContent, 'utf8').toString('base64');
            
            // Check if file exists in GitHub
            const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${filePath}`;
            let sha = '';
            
            try {
                const response = await axios.get(url, {
                    headers: { Authorization: `token ${GITHUB_TOKEN}` }
                });
                sha = response.data.sha; // Existing file SHA (required for updating files)
            } catch (err) {
                // File does not exist, so it will be created
            }
            
            // Upload the file to GitHub
            await axios.put(url, {
                message: `Added ${fileName}.js to ${category}`,
                content: encodedContent,
                branch: BRANCH,
                sha: sha || undefined
            }, {
                headers: { Authorization: `token ${GITHUB_TOKEN}` }
            });
            
            m.reply(`✅ Command '${fileName}.js' successfully uploaded to '${category}' and pushed to GitHub!`);
        } catch (error) {
            m.reply(`❌ Error uploading to GitHub: ${error.response?.data?.message || error.message}`);
        }
    });
};
    
