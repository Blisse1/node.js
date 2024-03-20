const express = require("express");
const cors = require("cors");
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errHandler");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// What is middleware?
    // It's anything between the request and the response
// Route handlers are middleware too
// app.use() for middleware handling
// built-in, custom, 3rd party
//

    // 3rd party middleware (CORS)
// whatever domains should be able to access the backend
const whitelist = ["http://localhost:3500", "https://www.yourdomain.com", "http://127.0.0.1:5500"];
// domains that can access your routes
// otherwise, CORS will prevent them
const corsOptions = {
    origin: (origin, callback) => { 
        // the second origin coming from whoever requested it, say google.com as example
        if(whitelist.indexOf(origin) !== -1 || !origin){ // si el dominio está en la lista
            callback(null, true); // origin will be send back
        }else {
            callback(new Error ("Not allowed by CORS"));
        }     
    }, 
    optionsSuccessStatus: 200
}

// custom middleware
app.use(logger);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));


// built-in middleware to handle urlencoded data
// in other words, form data:
// "content-type": application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));
// to get data being submitted by a form

// built-in middleware for json
app.use(express.json());
// If json is submitted

// serve static files
app.use(express.static(path.join(__dirname, "/public")));


app.get("^/$|/index(.html)?", (req, res) => {
    // res.sendFile("./views/index.html", {root: __dirname});
    res.sendFile(path.join(__dirname, "views", "index.html"));
})

app.get("/new-page(.html)?", (req, res) => {
    // res.sendFile("./views/index.html", {root: __dirname});
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
})

app.get("/old-page(.html)?", (req, res) => {
    // res.sendFile("./views/index.html", {root: __dirname});
    res.redirect(301, "/new-page.html");
})
//
    // Route handlers desde el req, res en adelante
app.get("/hello(.html)?", (req, res, next) => {
    console.log("Attempted to load hello.html");
    next();
}, (req, res) => {
    res.send("Hello there!");
});


// chaining route handlers
const one = (req, res, next) => {
    console.log("one");
    next();
}
const two = (req, res, next) => {
    console.log("two");
    next();
}
const three = (req, res, next) => {
    console.log("three");
    res.send("Finished");
}

app.get("/chain(.html)?", [one, two, three])

// app.use("/") doesnt accept regex.
// app.all its more for routing and it will apply to all http methods at once
app.all("*", (req, res) => {
    res.status(404);
    if(req.accepts("html")){
        res.sendFile(path.join(__dirname, "views", "404.html"));
    }else if(req.accepts("json")){
        res.json({error: "404 Not Found"});
    }else {
        res.type("txt").send("404 Not Found");
    }
})

app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

