const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token;

    // Check if token is provided
    if (!token) {
        return res.status(401).send({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(403).send("Invalid token."); 
    }
};

module.exports = verifyToken;
