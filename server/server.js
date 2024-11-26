// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Adjust if frontend URL is different
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Setup database connection
const connectDB = require("./config/db");
connectDB();

// Import routes
const userRoutes = require("./src/routes/UserRoutes");
const authRoutes = require("./src/routes/AuthRoutes");
const spaceRoutes = require("./src/routes/SpaceRoutes");
const bookingRoutes = require("./src/routes/BookingRoutes");
const contactRoutes = require("./src/routes/ContactRoutes");
const adminRoutes = require('./src/routes/AdminRoutes');

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/spaces", spaceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);

// Admin Routes
app.use('/api/admin', adminRoutes);


// Basic route
app.get("/", (req, res) => {
    res.send("Welcome to W-Space API!");
});

// Port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
