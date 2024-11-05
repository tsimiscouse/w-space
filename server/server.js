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

// CORS Options
const corsOptions = {
    origin: 'http://localhost:3000', 
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

// Import user routes
app.use("/api/users", require("./src/routes/UserRoutes")); 
app.use("/api/auth", require("./src/routes/AuthRoutes"));

// Import space routes
app.use("/api/spaces", require("./src/routes/SpaceRoutes"));

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
