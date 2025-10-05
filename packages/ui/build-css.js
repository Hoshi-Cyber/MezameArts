const fs = require('fs');
const tokens = require('./src/tokens.json');
let css = ':root {\n';
for (const [key, val] of Object.entries(tokens.colors)) {
  css += `  --color-${key}: ${val};\n`;
}
css += '}\n';
fs.writeFileSync('dist/tokens.css', css);
