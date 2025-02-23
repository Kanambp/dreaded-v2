const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); const fs = require('fs'); const path = require('path'); const { exec } = require('child_process');

module.exports = async (context) => { await ownerMiddleware(context, async () => { const { m, text, prefix } = context;

if (!text.includes('|')) {
        return m.reply(`Provide command name, category, and code separated by '|'. Example:

${prefix}uploadcmd yes|Owner|console.log('Hello, Owner!');`); }

const [fileName, category, ...fileContentArr] = text.split('|').map(str => str.trim());
    const fileContent = fileContentArr.join('|');
    
    if (!fileName || !category || !fileContent) {
        return m.reply(`Invalid format. Use: ${prefix}uploadcmd commandName|category|command code`);
    }
    
    const categoryPath = path.join(__dirname, `../../Cmds/${category}`);
    const filePath = path.join(categoryPath, `${fileName}.js`);
    
    try {
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath, { recursive: true });
        }
        
        fs.writeFileSync(filePath, fileContent, 'utf8');
        
        // Commit and push to GitHub
        exec(`git add ${filePath} && git commit -m "Added ${fileName}.js to ${category}" && git push`, (err, stdout, stderr) => {
            if (err) {
                return m.reply(`✅ File saved, but GitHub update failed: ${stderr}`);
            }
            m.reply(`✅ Command '${fileName}.js' successfully uploaded and pushed to GitHub! Changes will be applied automatically by the server.`);
        });
    } catch (error) {
        m.reply(`❌ Error writing file in '${category}': ${error.message}`);
    }
});

};

