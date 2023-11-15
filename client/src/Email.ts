"use strict";
import { GetElementByJSSelector } from "./Utilities.js";

interface settings {
    emailSubjectSelector: string,
    emailContactSelector: string,
    emailMessageSelector: string,
    emailSubmitSelector: string
}

let emailSubjectElement : HTMLInputElement;
let emailContactElement : HTMLInputElement;
let emailMessageElement : HTMLInputElement;
let emailSubmitElement : HTMLInputElement;

export function Init(settings: settings) {

    emailSubjectElement = GetElementByJSSelector(settings.emailSubjectSelector) as HTMLInputElement | null;
    emailContactElement = GetElementByJSSelector(settings.emailContactSelector) as HTMLInputElement | null;
    emailMessageElement = GetElementByJSSelector(settings.emailMessageSelector) as HTMLInputElement | null;
    emailSubmitElement = GetElementByJSSelector(settings.emailSubmitSelector) as HTMLInputElement | null;

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
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            emailSubject: emailSubjectElement.value,
            emailContact: emailContactElement.value,
            emailMessage: emailMessageElement.value
        })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.log(error))

    emailContactElement.value = "";
    emailSubjectElement.value = "";
    emailMessageElement.value = "";
}