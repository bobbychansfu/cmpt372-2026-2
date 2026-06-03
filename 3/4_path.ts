import path from 'path'; // const path = require('path');
import fs from 'fs';

var pathObj = path.parse(__filename);
console.log(path.join(pathObj.dir, "..", "data", "file.txt"));

var filename = process.argv[2];
var content = fs.readFileSync(filename, "utf-8");
console.log(content);