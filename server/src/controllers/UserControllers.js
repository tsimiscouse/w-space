const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/UserModels");

const registerUser = async (req, res) => {
	try {
		// Validate user input
		const { error } = validateUser(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		// Check if the user already exists
		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(409).send("User with this email already exists!");

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// Create and save the user
		user = new User({ ...req.body, password: hashedPassword });
		await user.save();

		// Generate auth token and send response
		const token = user.generateAuthToken();
		res.status(201).send({ token });
	} catch (error) {
		res.status(500).send("Something went wrong.");
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if the user exists
		const user = await User.findOne({ email });
		if (!user) return res.status(400).send("Invalid email or password.");

		// Check if the password is valid
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) return res.status(400).send("Invalid email or password.");

		// Generate auth token and send response
		const token = user.generateAuthToken();
		res.status(200).send({ token });
	} catch (error) {
		res.status(500).send("Something went wrong.");
	}
};

// Controller for fetching all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).send(users);      
  } catch (error) {
    res.status(500).send("Failed to fetch users.");
  }
};

module.exports = { registerUser, loginUser };
