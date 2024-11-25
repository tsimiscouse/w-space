const express = require("express");
const sgMail = require("@sendgrid/mail"); // Import SendGrid
const router = express.Router();

// Set SendGrid API Key directly
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// POST endpoint for sending emails
router.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    // Log payload for debugging
    console.log("Payload received from frontend:", { name, email, message });

    try {
        const msg = {
            to: "neabarbara2@gmail.com", // Receiver's email
            from: {
                email: "barbaraneanakeajiesti@mail.ugm.ac.id", // Sender's email (must be verified in SendGrid)
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
        console.log("Message payload sent to SendGrid:", msg);

        // Send email via SendGrid
        await sgMail.send(msg);

        // Respond with success
        console.log("Email sent successfully!");
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        // Log error details
        console.error(
            "Error while sending email:",
            error.response ? error.response.body : error
        );
        res.status(500).json({ success: false, message: "Failed to send email", error });
    }
});

module.exports = router;
