const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));
console.log(uuid()); // random ids, different each time
console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));
//
// ^3.4.0
// 3 as major version, 4 minor version, 0 a patch
// the ^ means allow to update a minor version and a patch if needed, but do not update a major version
// the ~ means that it should only update a patch version 
// the * means use the absolute latest version of the package
// and to install a specific version: npm i date-fns@version
// npm update to update all the packages
// npm rm nodemon to uninstall a package

