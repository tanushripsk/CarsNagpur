const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "pranavbelorkar.1607@gmail.com",
        pass: "jdwm ojbk oimx upbz",
    },
});

module.exports = {transporter};
