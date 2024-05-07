const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmailVerify = async (email, otp) => {
    try {
        // Create a transporter with nodemailer
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const otp = generateOtp();

        // Compose the email content
        let info = await transporter.sendMail({
            from: process.env.MAIL_ACCOUNT,
            to: email,
            subject: "Xác thực OTP",
            html: `<p>Mã OTP của bạn là: <strong>${otp}</strong></p>`,
        });

        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

module.exports = {
    sendEmailVerify
};