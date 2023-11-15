"use strict";
import { sendEmail } from "./email.js";

const express = require("express");
const app = express();
const port = 3010;

app.use(express.static("../../client"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.post("/email", (req, res) => {
    
    console.log(req.body);

    const message = req.body.emailMessage;
    const contact = req.body.emailContact;
    const subject = req.body.emailSubject;

    if (message && contact && subject) {
        res.statusCode = 200;
        sendEmail({
            messageSubject: subject,
            messageBody: message,
            messageContact: contact
        });
        res.send("Email sent successfully");
    } else {
        res.statusCode = 400;
        res.send("Bad request");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
