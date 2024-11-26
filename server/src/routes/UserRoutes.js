const router = require("express").Router();
const { User, validateUser } = require("../models/UserModels");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
        console.error("Error creating user:", error.message || error); 
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {
	try {
		// Fetch all users from the database
		const users = await User.find();

		// If no users are found, send a 404 response
		if (!users || users.length === 0) {
			return res.status(404).send({ message: "No users found" });
		}

		// Return the list of users with a 200 status
		res.status(200).send(users);
	} catch (error) {
		// Catch any errors and return a 500 status
		console.error("Error fetching users:", error.message || error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;