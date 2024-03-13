// 1. Node runs on a server - not in a browser
// 2. CommonJS modules instead of ES6 modules
// 3. Common core modules
// 4. Missing some JS API's like fetch
//
const os = require("os");
const path = require("path");
// const math = require("./math")
const {add} = require("./math")

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname);
// console.log(__filename);
// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));
console.log(add(2, 3));

