"use strict";
import { GetElementByJSSelector } from "../Utilities.js";

interface settings {
    iSelector: string;
    homeSelector: string;
    headerSelector: string;
    contentSelector: string;
    closeSelector: string;
    circleCenterCSSVar: string;
    msTransitonDuration: number;
    onPeekDelegate: Function;
}

let canPeek = true;
let unpeekActivated = false;
let isOpened = false;
let headerElement: HTMLElement;
let contentElement: HTMLElement;
let homeElement: HTMLElement;
let iElement: HTMLElement;
let closeSkillsElement: HTMLElement;
let circleCenterCSSVar: string;
let msTransitonDuration: number;
let onPeekDelegate: Function;

export function Init(settings: settings) {
    headerElement = GetElementByJSSelector(settings.headerSelector) as HTMLElement;
    contentElement = GetElementByJSSelector(settings.contentSelector) as HTMLElement;
    homeElement = GetElementByJSSelector(settings.homeSelector) as HTMLElement;
    iElement = GetElementByJSSelector(settings.iSelector) as HTMLElement;
    closeSkillsElement = GetElementByJSSelector(settings.closeSelector) as HTMLElement;
    circleCenterCSSVar = settings.circleCenterCSSVar;
    msTransitonDuration = settings.msTransitonDuration;
    onPeekDelegate = settings.onPeekDelegate;

    headerElement.addEventListener("mouseover", Peek);
    headerElement.addEventListener("mouseleave", (event) => Unpeek(event));
    headerElement.addEventListener("click", Show);
    contentElement.addEventListener("click", Show);
    contentElement.addEventListener("mouseleave", (event) => Unpeek(event));
    closeSkillsElement.addEventListener("click", Hide);

    window.addEventListener("resize", () => {
        SetCircleCenter();
        HideInstant();
    });
}

function Peek() {
    if (isOpened || !canPeek) {return;}
    unpeekActivated = false;

    SetCircleCenter();
    contentElement.dataset.status = "pre-peek";

    if (onPeekDelegate instanceof Function) {
        onPeekDelegate();
    }

    setTimeout(() => {
        if (unpeekActivated || isOpened) {return;}
        contentElement.dataset.status = "peek";
    }, 100)
}

function Unpeek(event) {

    if (isOpened) {return;}
    canPeek = false;
    const headerBoundingRectangle = headerElement.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    const top = headerBoundingRectangle.top;
    const bottom = headerBoundingRectangle.bottom;
    const left = headerBoundingRectangle.left;
    const right = headerBoundingRectangle.right;

    if (x > left && x < right && y > top && y < bottom) {
        return;
    }

    canPeek = true;
    unpeekActivated = true;
    contentElement.dataset.status = "pre-peek";
}

function Show() {
    if (isOpened) {return;}
    if (window.innerWidth <= 768)
    {
        PhoneShow();
        return;
    }
    isOpened = true;
    
    homeElement.dataset.status = "unclickable";
    contentElement.dataset.status = "visible";
}

function Hide() {
    console.log("hide");
    contentElement.dataset.status = "pre-peek";
    canPeek = true;
    unpeekActivated = true;
    homeElement.dataset.status = "clickable";
    

    setTimeout(() => {
        isOpened = false;
        
    }, msTransitonDuration)
}

function SetCircleCenter() {
    const boundingRectangle = iElement.getBoundingClientRect();
    const left = boundingRectangle.left;
    const right = boundingRectangle.right;
    const middleX = (left + right)/2;
    const top = boundingRectangle.top;
    const bottom = boundingRectangle.bottom;
    const middleY = (top + bottom)/2;
    const iY = middleY - (bottom-top)/4;

    document.documentElement.style.setProperty(circleCenterCSSVar, `${middleX}px ${iY}px`);
}

function PhoneShow() {
    
    if (onPeekDelegate instanceof Function) {
        onPeekDelegate();
    }
    setTimeout(() => {
        isOpened = true;
    
        homeElement.dataset.status = "unclickable";
        contentElement.dataset.status = "visible";
    }, 200)
}

function HideInstant() {
    contentElement.dataset.status = "hidden";
    canPeek = true;
    unpeekActivated = true;
    isOpened = false;
    homeElement.dataset.status = "clickable";
}