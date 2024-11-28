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
        // res.cookie('token', token, { httpOnly: true, secure: false, path: "/" });
        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 10000,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.FRONTEND_URN
                : "localhost", });
        return res.redirect('/');

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

// Profile route
router.get("/profile", verifyToken, async (req, res) => {
    try {
        // Fetch user data from the database
        const userProfile = await User.findById(req.user._id);
        if (!userProfile) {
            console.error("User not found:", req.user._id);
            return res.status(404).send({ message: "User not found." });
        }

        // Set user profile data in a cookie
        res.cookie(
            "userProfile",
            JSON.stringify({
                email: userProfile.email,
                userId: userProfile._id,
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                role: userProfile.role,
            }),
            { 
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                domain:
                  process.env.NODE_ENV === "production"
                    ? process.env.FRONTEND_URN
                    : "localhost", 
            }
        );

        // Send the profile data as part of the response as well (optional)
        res.send({
            message: "Welcome to your profile!",
            user: {
                email: userProfile.email,
                userId: userProfile._id,
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                role: userProfile.role,
            },
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
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
    res.clearCookie("token", { 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URN
            : "localhost", 
        });
    res.clearCookie("userProfile", { 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URN
            : "localhost",
        });
    return res.send({ message: "Logged out successfully" });
});

module.exports = router;
