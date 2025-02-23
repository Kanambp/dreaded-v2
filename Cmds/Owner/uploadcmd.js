const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); const fs = require('fs'); const path = require('path');

module.exports = async (context) => { await ownerMiddleware(context, async () => { const { m, text, prefix } = context;

if (!text.includes('|')) {
        return m.reply(`Provide command name, category, and code separated by '|'. Example:

${prefix}uploadcmd myCommand|General|console.log('Hello, World!');`); }

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
        m.reply(`✅ Command '${fileName}.js' successfully uploaded to '${category}' category!`);
    } catch (error) {
        m.reply(`❌ Error writing file in '${category}': ${error.message}`);
    }
});

};

