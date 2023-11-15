"use strict";
import { GetElementByJSSelector } from "./Utilities.js";
let emailSubjectElement;
let emailContactElement;
let emailMessageElement;
let emailSubmitElement;
export function Init(settings) {
    emailSubjectElement = GetElementByJSSelector(settings.emailSubjectSelector);
    emailContactElement = GetElementByJSSelector(settings.emailContactSelector);
    emailMessageElement = GetElementByJSSelector(settings.emailMessageSelector);
    emailSubmitElement = GetElementByJSSelector(settings.emailSubmitSelector);
    if (!emailSubjectElement || !emailContactElement || !emailMessageElement || !emailSubmitElement) {
        console.log("Invalid JS Selectors");
        return;
    }
    emailSubmitElement.addEventListener("click", sendEmail);
}
function sendEmail() {
    console.log("submit");
    if (!emailSubjectElement.value || !emailContactElement.value || !emailMessageElement.value) {
        console.log(emailContactElement.value, emailSubjectElement.value, emailMessageElement.value);
        alert("Please fill out all fields");
        return;
    }
    alert("Message sent! Thanks for reaching out!");
    fetch("/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailSubject: emailSubjectElement.value,
            emailContact: emailContactElement.value,
            emailMessage: emailMessageElement.value
        })
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    emailContactElement.value = "";
    emailSubjectElement.value = "";
    emailMessageElement.value = "";
}
