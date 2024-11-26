const nodemailer = require('nodemailer');

// Konfigurasi SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host :"smtp.gmail.com",
  port : 587,
  auth: {
    user: process.env.EMAIL_SENDER, // Alamat email pengirim
    pass: process.env.EMAIL_SENDER_PASS  // Password aplikasi email
  }
});

const sendConfirmationEmail = async (toEmail, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: toEmail,
    subject: 'Konfirmasi Booking Anda',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="padding: 20px; text-align: center; background: linear-gradient(90deg, #ddeeff, #f0dfff); color: #333;">
            <h2>HI From W-Space</h2>
          </div>

          <!-- Body -->
          <div style="padding: 20px; color: #333;">
            <p style="font-size: 16px;">Terima kasih telah melakukan booking! Berikut adalah detail Anda:</p>
            <ul style="list-style: none; padding: 0; font-size: 16px; color: #555;">
              <li style="margin-bottom: 8px;"><strong>Tanggal:</strong> ${bookingDetails.date}</li>
              <li style="margin-bottom: 8px;"><strong>Waktu:</strong> ${bookingDetails.startTime} - ${bookingDetails.endTime}</li>
              <li style="margin-bottom: 8px;"><strong>Tempat:</strong> ${bookingDetails.spaceName || 'N/A'}</li>
            </ul>
            <p style="margin-top: 20px; font-size: 16px; color: #333;">Semoga Anda menikmati pengalaman Anda!</p>
          </div>

          <!-- Footer -->
          <div style="padding: 10px; text-align: center; background-color: #f2f2f2; color: #777; font-size: 14px;">
            &copy; 2024 Perusahaan Anda. Semua hak dilindungi.
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email konfirmasi berhasil dikirim');
  } catch (error) {
    console.error('Gagal mengirim email konfirmasi:', error);
  }
};

module.exports = { sendConfirmationEmail };
