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
        <h3>Halo,</h3>
        <p>Terima kasih telah melakukan booking! Berikut adalah detail Anda:</p>
        <ul>
          <li>Tanggal: ${bookingDetails.date}</li>
          <li>Waktu: ${bookingDetails.startTime} - ${bookingDetails.endTime}</li>
          <li>Tempat: ${bookingDetails.spaceName || 'N/A'}</li>
        </ul>
        <p>Semoga Anda menikmati pengalaman Anda!</p>
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