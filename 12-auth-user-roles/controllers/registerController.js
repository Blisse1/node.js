const usersDB = {
    user: require("../model/users.json"),
    setUser: function (data) { this.user = data },
}

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

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
        // encrypt
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store
        const newUser = {
            "username": user,
            "roles": {"User": 2001},
            "password": hashedPwd 
        };
        usersDB.setUser([...usersDB.user, newUser]);
        // similar to the usestate in react, in here you create a new array and 
        // set all new users in the db
        await fsPromises.writeFile (
            // modifying the json file
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.user)
        );
        console.log(usersDB.user);
        res.status(201).json({"success": `New user ${user} created.`});
    }catch(err){
        res.status(500).json({ "message": err.message })
    }
}
module.exports = { handleNewUser };
