// const fs = require("fs"); 
const fsPromises = require("fs").promises; //
const path = require("path"); //filesystem
// Node is asynchronous
//
const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, "files", "lorem.txt"), "utf8");
        console.log(data);
        // unlink to delete a file
        await fsPromises.unlink(path.join(__dirname, "files", "lorem.txt"));
        await fsPromises.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), data);
        await fsPromises.appendFile(path.join(__dirname, "files", "promiseWrite.txt"), "Nice to meet you.");
        await fsPromises.rename(path.join(__dirname, "files", "promiseWrite.txt"), path.join(__dirname, "files", "promiseComplete.txt"));
        const newData = await fsPromises.readFile(path.join(__dirname, "files", "promiseComplete.txt"), "utf8");
        console.log(newData);
    }catch(err){
        console.error(err);
    }
}

fileOps();

// fs.readFile(path.join(__dirname, "files", "lorem.txt"), "utf8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// console.log("Hello");

// Callback hell
// fs.writeFile(path.join(__dirname, "files", "reply.txt"), "Nice to meet you", (err) => {
//     if (err) throw err;
//     console.log("Write complete.");

//     fs.appendFile(path.join(__dirname, "files", "reply.txt"), "\n\nYes it is!", (err) => {
//         if (err) throw err;
//         console.log("Append complete.");

//         fs.rename(path.join(__dirname, "files", "reply.txt"), path.join(__dirname, "files", "newReply.txt"), (err) => {
//             if (err) throw err;
//             console.log("Rename complete.");
//         });
//     });
// });

// It will modify existing a existing file and can append content to it
// but it will also create a file if it doesnt exist

//exit on uncaught error
process.on("uncaughtException", err => {
    console.error(`There was an uncaught error ${err}`);
    process.exit(1);
})
