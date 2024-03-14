const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter { };

// initialize object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const extension = path.extname(req.url);

    let contentType;

    switch(extension){
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "text/json";
            break;
        case ".jpg":
            contentType = "text/jpg";
            break;
        case ".png":
            contentType = "text/png";
            break;
        case ".txt":
            contentType = "text/.txt";
            break;
        default:
            contentType = "text/.html";
    }

    let filePath = 
        contentType === "text/html" && req.url === "/"
        ? path.join(__dirname, "views", "index.html")
        : contentType === "text/html" && req.url.slice(-1) === "/"
        ? path.join(__dirname, "views", req.url, "index.html")
        : contentType === "text/html"
        ? path.join(__dirname, "views", req.url)
        : path.join(__dirname, req.url)

    // makes .html extension not required in the browser
    if(!extension && req.url.slice(-1) !== "/") filePath += ".html";

    const fileExists = fs.existsSync(filePath);
    if(fileExists){
        // serve it
    }else{
        // 404 || 301 (redirect)
        switch(path.parse(filePath).base){
            case "old-page.html":
                res.writeHead(301, {"Location": "new-page.html"});
                res.end();
                break;
            case "www-page.html":
                res.writeHead(301, {"Location": "/"});
                res.end();
                break;
            default:
                res.writeHead(301, {"Location": "/"});
                res.end();
                break;
        }
    }

});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
