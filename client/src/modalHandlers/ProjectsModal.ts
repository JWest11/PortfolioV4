"use strict";
import { GetAllElementsWithJSSelector, GetElementByJSSelector } from "../Utilities.js";

interface settings {
    closeProjectsSelector: string,
    homeSelector: string,
    headerSelector: string,
    contentSelector: string,
    prePeekPolygonCSSVar: string,
    peekPolygonCSSVar: string,
    transitionPolygonCSSVar: string,
    fullScreenPolygonCSSVar: string,
    msTransitonDuration: number
}

let isOpened = false;
let unpeekActivated = false;
let pxUnderlineHeight = 5;
let headerElement: HTMLElement;
let contentElement: HTMLElement;
let homeElement: HTMLElement;
let closeProjectsElement: HTMLElement;
let prePeekPolygonCSSVar: string;
let peekPolygonCSSVar: string;
let transitionPolygonCSSVar: string;
let fullScreenPolygonCSSVar: string;
let msTransitonDuration: number;

export function Init(settings: settings) {

    headerElement = GetElementByJSSelector(settings.headerSelector) as HTMLElement;
    contentElement = GetElementByJSSelector(settings.contentSelector) as HTMLElement;
    homeElement = GetElementByJSSelector(settings.homeSelector) as HTMLElement;
    closeProjectsElement = GetElementByJSSelector(settings.closeProjectsSelector) as HTMLElement;
    prePeekPolygonCSSVar = settings.prePeekPolygonCSSVar;
    peekPolygonCSSVar = settings.peekPolygonCSSVar;
    transitionPolygonCSSVar = settings.transitionPolygonCSSVar;
    fullScreenPolygonCSSVar = settings.fullScreenPolygonCSSVar;
    msTransitonDuration = settings.msTransitonDuration;


    headerElement.addEventListener("mouseover", Peek);
    headerElement.addEventListener("mouseleave", Unpeek);
    
    headerElement.addEventListener("click", Show);
    closeProjectsElement.addEventListener("click", Hide);

}

function Peek() {
    if (isOpened) {return;}
    unpeekActivated = false;

    const boundingRectangle = headerElement.getBoundingClientRect();
    const left = boundingRectangle.left;
    const top = boundingRectangle.bottom;
    const bottom = top + pxUnderlineHeight;
    const right = boundingRectangle.right;
    const middle = (left + right)/2;

    document.documentElement.style.setProperty(prePeekPolygonCSSVar, `polygon(${middle}px ${top}px, ${middle}px ${bottom}px, ${middle}px ${bottom}px, ${middle}px ${top}px)`);
    contentElement.dataset.status = "pre-peek";

    setTimeout(() => {
        
        if (unpeekActivated || isOpened) {return;}
        document.documentElement.style.setProperty(peekPolygonCSSVar, `polygon(${left}px ${top}px, ${left}px ${bottom}px, ${right}px ${bottom}px, ${right}px ${top}px)`);
        contentElement.dataset.status = "peek";

    }, 100)

}

function SetupPrePeekUnderline() {
    const boundingRectangle = headerElement.getBoundingClientRect();
    const left = boundingRectangle.left;
    const top = boundingRectangle.bottom;
    const bottom = top + pxUnderlineHeight;
    const right = boundingRectangle.right;
    const middle = (left + right)/2;

    document.documentElement.style.setProperty(prePeekPolygonCSSVar, `polygon(${middle}px ${top}px, ${middle}px ${bottom}px, ${middle}px ${bottom}px, ${middle}px ${top}px)`);
}

function Unpeek() {

    if (isOpened) {return;}
    unpeekActivated = true;
    contentElement.dataset.status = "pre-peek-with-transition";

}

function Show() {

    isOpened = true;

    const boundingRectangle = headerElement.getBoundingClientRect();
    const left = 0;
    const top = boundingRectangle.bottom;
    const bottom = top + pxUnderlineHeight;
    const right = window.innerWidth
    document.documentElement.style.setProperty(transitionPolygonCSSVar, `polygon(${left}px ${top}px, ${left}px ${bottom}px, ${right}px ${bottom}px, ${right}px ${top}px)`);
    contentElement.dataset.status = "transition";
    homeElement.dataset.status = "unclickable";

    setTimeout(() => {
        contentElement.dataset.status = "visible";
    }, msTransitonDuration)
}

function Hide() {

    SetupPrePeekUnderline();

    const boundingRectangle = headerElement.getBoundingClientRect();
    const left = 0;
    const top = boundingRectangle.bottom;
    const bottom = top + pxUnderlineHeight;
    const right = window.innerWidth;
    document.documentElement.style.setProperty(transitionPolygonCSSVar, `polygon(${left}px ${top}px, ${left}px ${bottom}px, ${right}px ${bottom}px, ${right}px ${top}px)`);
    contentElement.dataset.status = "transition";

    setTimeout(() => {
        isOpened = false;
        contentElement.dataset.status = "pre-peek-with-transition";
        homeElement.dataset.status = "visible";
    }, msTransitonDuration)

}