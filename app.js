const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
const port = 3053;

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const otp = generateOTP();
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: to,
    subject: subject,
    text: `${text} Your OTP: ${otp}`
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error sending email.' });
    } else {
      console.log('Email sent: ' + response.message);
      res.json({ message: 'Email sent successfully.' });
    }
  });
});

function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
