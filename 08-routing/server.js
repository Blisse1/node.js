const express = require("express");
const cors = require("cors");
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errHandler");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

const whitelist = ["http://localhost:3500", "https://www.yourdomain.com", "http://127.0.0.1:5500"];
const corsOptions = {
    origin: (origin, callback) => { 
        if(whitelist.indexOf(origin) !== -1 || !origin){ 
            callback(null, true); 
        }else {
            callback(new Error ("Not allowed by CORS"));
        }     
    }, 
    optionsSuccessStatus: 200
}

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));

app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public"))); // you need it to be public bc its static

// Routes
app.use("/", require("./routes/root")); // para las rutas que usan el root
app.use("/subdir", require("./routes/subdir")); // para las rutas que usan /subdir
app.use("/employees", require("./routes/api/employees")); 

app.use("/*", (req, res) => {
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

