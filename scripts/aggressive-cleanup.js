const fs = require('fs');
const path = require('path');
function removeComments(content) {
    return content
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^\s*\/\/.*$/gm, '')
        .replace(/\s\/\/.*$/gm, (match) => {
            if (match.includes('://')) return match;
            return '';
        })
        .replace(/^\s*[\r\n]/gm, '');
}
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const cleaned = removeComments(content);
        if (content !== cleaned) {
            fs.writeFileSync(filePath, cleaned, 'utf8');
            console.log(`Cleaned: ${filePath}`);
        }
    } catch (e) {
        console.error(`Error processing ${filePath}:`, e);
    }
}
function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!['node_modules', '.next', '.git', 'out', 'build'].includes(file)) {
                walkDir(filePath);
            }
        } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
            processFile(filePath);
        }
    });
}
walkDir(process.cwd());
