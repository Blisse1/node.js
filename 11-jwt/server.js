const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errHandler");
const verifyJWT = require("./middleware/verifyJWT"); // to protect multiple routes
const cookieParser = require("cookie-parser")
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));

app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./routes/root")); // para las rutas que usan el root
app.use("/register", require("./routes/register")); 
app.use("/auth", require("./routes/auth")); 
app.use("/refresh", require("./routes/refresh")); 

app.use(verifyJWT); 
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

