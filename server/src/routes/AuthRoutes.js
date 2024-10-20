const router = require("express").Router();
const { User } = require("../models/UserModels");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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
        res.cookie('token', token, { httpOnly: true }); 

        // Redirect after setting the cookie
        return res.redirect('/');

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

// Profile route
router.get("/profile", (req, res) => {
    const token = req.cookies.token; // Access the token cookie
    if (!token) return res.status(401).send({ message: "Access denied." });

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (err) return res.status(403).send({ message: "Invalid token." });
        
        // Fetch the user profile using user ID from the token
        const userProfile = await User.findById(user._id);
        if (!userProfile) return res.status(404).send({ message: "User not found." });

        res.send({ message: "Welcome to your profile!", user: userProfile });
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

module.exports = router;
