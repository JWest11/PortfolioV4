"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var email_js_1 = require("./email.js");
var express = require("express");
var app = express();
var port = 6010;
app.use(express.static("../../client"));
app.use(express.json());
app.get("/", function (req, res) {
    res.sendFile("index.html");
});
app.post("/email", function (req, res) {
    console.log(req.body);
    var message = req.body.emailMessage;
    var contact = req.body.emailContact;
    var subject = req.body.emailSubject;
    if (message && contact && subject) {
        res.statusCode = 200;
        (0, email_js_1.sendEmail)({
            messageSubject: subject,
            messageBody: message,
            messageContact: contact
        });
        res.send("Email sent successfully");
    }
    else {
        res.statusCode = 400;
        res.send("Bad request");
    }
});
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
