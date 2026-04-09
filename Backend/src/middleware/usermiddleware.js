const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");

const usermiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log("Cookies in request:", req.cookies);
        // console.log("Request headers:", req.headers);



        if (!token) {
              console.log("❌ No token in cookies");
            throw new Error("Token is not present");
        }

        const payload = jwt.verify(token, process.env.JWT_KEY); // This line may throw
        const { _id } = payload;

        if (!_id) {
            throw new Error("ID is missing in token");
        }

        const result = await User.findById(_id);
        if (!result) {
            throw new Error("User does not exist");
        }

        const isBlocked = await redisClient.exists(`token:${token}`);
        if (isBlocked) {
            throw new Error("Invalid token (blocked)");
        }

        req.result = result; // user info passed forward
        next();

    } catch (err) {
        console.error("Token validation failed:", err.message);
        // return res.status(401).json({ error: err.message });
    }
};

module.exports = usermiddleware;
