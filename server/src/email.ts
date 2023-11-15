"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDING_EMAIL_ACCOUNT,
        pass: process.env.SENDING_EMAIL_PASSWORD
    }
});

interface emailDetails {
    messageBody: string,
    messageContact: string,
    messageSubject: string
}

export async function sendEmail(emailDetails: emailDetails) {
    await transporter.sendMail({
        from: process.env.SENDING_EMAIL_ACCOUNT,
        to: process.env.RECEIVING_EMAIL_ACCOUNT,
        subject: emailDetails.messageSubject,
        text: emailDetails.messageSubject + "\n\n" + emailDetails.messageBody + "\n\n" + emailDetails.messageContact
    });
};