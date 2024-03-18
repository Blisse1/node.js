const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// What is middleware?
// It's anything between the request and the response
// Route handlers are middleware too
// built-in, custom, 3rd party

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

app.get("/*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

