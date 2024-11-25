const bcrypt = require("bcrypt");
const { User, validateUser, validateProfileUpdate } = require("../src/models/UserModels");

// Register a new user
const registerUser = async (req, res) => {
    try {
        // Validate user input
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Check if the user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: "User with this email already exists!" });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create and save the user
        user = new User({ ...req.body, password: hashedPassword });
        await user.save();

        // Generate auth token and send response
        const token = user.generateAuthToken();
        res.status(201).send({ token, message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ message: "Invalid email or password." });

        // Check if the password is valid
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send({ message: "Invalid email or password." });

        // Generate auth token and send response
        const token = user.generateAuthToken();
        res.status(200).send({ token, message: "Logged in successfully!" });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Fetch user profile details
const getUserProfile = async (req, res) => {
    try {
        // Find the user by ID (from token or params)
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).send({ message: "User not found." });

        res.status(200).send(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        // Validate profile update fields
        const { error } = validateProfileUpdate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id, // Extract user ID from the token
            { ...req.body },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) return res.status(404).send({ message: "User not found." });

        res.status(200).send({ message: "Profile updated successfully!", user: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Delete user account
const deleteUserAccount = async (req, res) => {
    try {
        // Find and delete the user by ID
        const deletedUser = await User.findByIdAndDelete(req.user._id);
        if (!deletedUser) return res.status(404).send({ message: "User not found." });

        res.status(200).send({ message: "User account deleted successfully!" });
    } catch (error) {
        console.error("Error deleting user account:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUserAccount,
};
