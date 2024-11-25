const router = require("express").Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserAccount } = require("../controllers/UserControllers");
const authMiddleware = require("../middleware/AuthMiddleware"); // Middleware to protect routes

// User Registration
router.post("/register", async (req, res) => {
    await registerUser(req, res);
});

// User Login
router.post("/login", async (req, res) => {
    await loginUser(req, res);
});

// Get User Profile (Protected)
router.get("/profile", authMiddleware, async (req, res) => {
    await getUserProfile(req, res);
});

// Update User Profile (Protected)
router.put("/profile", authMiddleware, async (req, res) => {
    await updateUserProfile(req, res);
});

// Delete User Account (Protected)
router.delete("/profile", authMiddleware, async (req, res) => {
    await deleteUserAccount(req, res);
});

module.exports = router;
