const express = require("express");
const sgMail = require("@sendgrid/mail"); // Import SendGrid
const router = express.Router();

// Set SendGrid API Key from .env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// POST endpoint for sending emails
router.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    // Log payload for debugging
    console.log("Payload received from frontend:", { name, email, message });

    try {
        // Construct email message
        const msg = {
            to: process.env.EMAIL_TO, // Receiver's email from .env
            from: {
                email: process.env.EMAIL_USER, // Sender's email from .env
                name: "W-Space Contact Form", // Sender's name
            },
            subject: `Contact Form Submission from ${name}`, // Email subject
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`, // Plain text content
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong></p>
                   <p>${message}</p>`, // HTML content
        };

        // Log message payload for debugging
        console.log("Message payload being sent to SendGrid:", msg);

        // Send email via SendGrid
        const response = await sgMail.send(msg);

        // Log response from SendGrid for debugging
        console.log("SendGrid Response:", response);

        // Respond with success
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        // Log error details
        console.error(
            "Error while sending email:",
            error.response ? error.response.body : error
        );

        // Respond with error
        res.status(500).json({
            success: false,
            message: "Failed to send email. Please try again later.",
            error: error.response ? error.response.body : error.message,
        });
    }
});

module.exports = router;
