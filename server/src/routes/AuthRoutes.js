const router = require("express").Router();
const { User } = require("../models/UserModels");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/AuthMiddleware");

// Login route
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken(); 

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true, secure: false });

        // Redirect after setting the cookie
        return res.redirect('/');

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

// Profile route
router.get("/profile", verifyToken, async (req, res) => {
    console.log("Token:", req.cookies.token); // Log the token
    console.log("User ID from token:", req.user._id); // Log the user ID from the token

    const userProfile = await User.findById(req.user._id);
    if (!userProfile) {
        console.error("User not found:", req.user._id); // Log user not found
        return res.status(404).send({ message: "User not found." });
    }

    res.send({
        message: "Welcome to your profile!",
        user: {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName
        }
    });
});

// Validation function
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

// Log Out Routes
router.post("/logout", (req, res) => {
    // Clear the cookie by setting it with an expired date
    res.clearCookie("token"); 

    // Send a response indicating the user has logged out
    res.send({ message: "Logged out successfully" });
});

module.exports = router;
