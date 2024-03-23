const usersDB = {
    user: require("../model/users.json"),
    setUser: function (data) { this.user = data },
}

const fsPromises = require("fs").promises;
const path = require("path");

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd){
        return res.status(400).json({ "message": "Username and password are required." })
    }
    const duplicate = usersDB.user.find(person => person.username === user);
    if(duplicate){
        return res.sendStatus(409) // Conflict
    }
    try{

    }catch(err){
        res.status(500).json({ "message": err.message })
    }
}
