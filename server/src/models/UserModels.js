const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define password complexity options
const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};

// Define User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // First name of the user
    lastName: { type: String, required: true }, // Last name of the user
    email: { type: String, required: true, unique: true }, // Email (unique)
    password: { type: String, required: true }, // Hashed password
    profileImage: { type: String, default: "" }, // Optional: URL to profile image
    bio: { type: String, default: "" }, // Optional: A short bio for the user
    createdAt: { type: Date, default: Date.now }, // Timestamp when the user was created
    updatedAt: { type: Date, default: Date.now }, // Timestamp when the user profile was last updated
});

// Middleware to update the `updatedAt` field automatically on save
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

// Method to generate JWT token for user authentication
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, email: this.email }, // Payload
        process.env.JWTPRIVATEKEY, // Secret key
        { expiresIn: "1d" } // Token expiration
    );
    return token;
};

// User model
const User = mongoose.model("User", userSchema);

// Joi validation for user registration
const validateUser = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity(complexityOptions)
            .required()
            .messages({
                "string.empty": "Password is required.",
                "string.min": "Password must be at least 8 characters long.",
                "string.max": "Password must be less than 30 characters long.",
                "string.pattern.base":
                    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol.",
            })
            .label("Password"),
    });
    return schema.validate(data);
};

// Joi validation for user profile updates (e.g., firstName, lastName, bio)
const validateProfileUpdate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().optional().label("First Name"),
        lastName: Joi.string().optional().label("Last Name"),
        email: Joi.string().email().optional().label("Email"),
        profileImage: Joi.string().uri().optional().label("Profile Image"), // URL validation for profile image
        bio: Joi.string().max(500).optional().label("Bio"), // Bio with max length of 500 characters
    });
    return schema.validate(data);
};

module.exports = {
    User,
    validateUser,
    validateProfileUpdate,
};
