const fs = require("fs");

const rs = fs.createReadStream("./files/example.txt", {encoding: "utf8"});
const ws = fs.createWriteStream("./files/new-example.txt");

// rs.on("data", (dataChunk) => {
//     ws.write(dataChunk)
// })

rs.pipe(ws);
