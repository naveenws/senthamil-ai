const fs = require('fs');
const brainPath = 'C:/Users/Naveen/.gemini/antigravity/brain/e5e61e7c-a9c1-4abd-90ea-257c8bdc4cf9/tamil_ai_studio.html';
let html = fs.readFileSync(brainPath, 'utf8');
const litData = fs.readFileSync('literature_data.js', 'utf8');
const appLit = fs.readFileSync('app_literature.js', 'utf8');

html = html.replace('<script src="literature_data.js"></script>', '<script>\n' + litData + '\n</script>');
html = html.replace('<script src="app_literature.js"></script>', '<script>\n' + appLit + '\n</script>');

fs.writeFileSync(brainPath, html, 'utf8');
console.log('Standalone tamil_ai_studio.html successfully bundled, size:', fs.statSync(brainPath).size);
