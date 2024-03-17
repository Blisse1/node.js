const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// Common core modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, "logs"))){
            await fsPromises.mkdir(path.join(__dirname, "logs"));
        }
        await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
    }catch (err) {
        console.log(err)
    }
}
module.exports = logEvents;

// ^3.4.0
// 3 as major version, 4 minor version, 0 a patch
// the ^ means allow to update a minor version and a patch if needed, but do not update a major version
// the ~ means that it should only update a patch version 
// the * means use the absolute latest version of the package
// and to install a specific version: npm i date-fns@version
// npm update to update all the packages
// npm rm nodemon to uninstall a package

