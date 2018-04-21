const fs = require('fs');

console.log('dirname', __dirname);
const path = __dirname;
console.log('files', fs.readdirSync(path));
