const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const sendEmail = async (email, otp) => {

    try {
        const transporter = nodemailer.createTransport(smtpTransport({

            host: "stmp.gmail.com",
            port: 587,
            service: "gmail",
            requireTLS: true,
            auth: {
                type: "OAuth2",
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD,
                clientId: process.env.MAILCLIENT_ID,
                clientSecret: process.env.MAILCLIENT_SECRET,
                refreshToken: process.env.MAILREFRESH_TOKEN,
            },
        }));

        const mailConfigurations = {
            from: process.env.SMPT_MAIL,
            to: email,
            subject: "OTP for Registration",
            html: `<p>This is Your OTP= <b>${otp}</b> For registration</p>`
        };

        transporter.sendMail(mailConfigurations, function (error, info) {
            // 
            if (error) throw Error(error);
            console.log("Email Sent Successfully");
            console.log(info);

        });
    } catch (error) {
        throw Error(error);
    }

}

module.exports = sendEmail