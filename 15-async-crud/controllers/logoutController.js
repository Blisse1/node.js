const User = require("../model/User");

const handleLogout = async (req, res) => {
    // On the client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204); // No content
    }
    const refreshToken = cookies.jwt;
    // is refreshtoken in db
    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie("jwt", {httpOnly: true, maxAge: 24*60*60*1000});
        return res.sendStatus(204); //Unauthorized 
    }
    //  Delete the refresh token
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie("jwt", {httpOnly: true}); // secure: true - only servers on https
    res.sendStatus(204);
}

module.exports = { handleLogout };
