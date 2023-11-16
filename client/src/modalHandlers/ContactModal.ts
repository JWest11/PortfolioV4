"use strict";
import { GetElementByJSSelector } from "../Utilities.js";

interface settings {
    closeContactSelector: string,
    homeSelector: string,
    headerSelector: string,
    contentSelector: string,
    transitionTransformCSSVar: string,
    preVisiblePolygonCSSVar: string,
    visiblePolygonCSSVar: string,
    msTransitonDuration: number
}

let isOpened = false;
let unmodifiedHeaderRectangle : DOMRect;
let headerElement : HTMLElement;
let contentElement : HTMLElement;
let homeElement : HTMLElement;
let closeContactElement : HTMLElement;
let transitionTransformCSSVar : string;
let preVisiblePolygonCSSVar : string;
let visiblePolygonCSSVar : string;
let msTransitonDuration : number;



export function Init(settings) {

    headerElement = GetElementByJSSelector(settings.headerSelector) as HTMLElement;
    contentElement = GetElementByJSSelector(settings.contentSelector) as HTMLElement;
    homeElement = GetElementByJSSelector(settings.homeSelector) as HTMLElement;
    closeContactElement = GetElementByJSSelector(settings.closeContactSelector) as HTMLElement;
    transitionTransformCSSVar = settings.transitionTransformCSSVar;
    preVisiblePolygonCSSVar = settings.preVisiblePolygonCSSVar;
    visiblePolygonCSSVar = settings.visiblePolygonCSSVar;
    msTransitonDuration = settings.msTransitonDuration;

    headerElement.addEventListener("mouseover", Peek);
    headerElement.addEventListener("mouseleave", Unpeek);
    headerElement.addEventListener("click", Show);

    closeContactElement.addEventListener("click", Hide);

    window.addEventListener("resize", HideInstant);
}

function Peek() {
    
    if (isOpened) {return;}

    unmodifiedHeaderRectangle = headerElement.getBoundingClientRect();
    headerElement.dataset.status = "peek";

}

function Unpeek() {

    if (isOpened) {return;}

    headerElement.dataset.status = "base";

}

function Show() {

    isOpened = true;
    SetClipRect();
    homeElement.dataset.status = "unclickable";
    contentElement.dataset.status = "pre-transition";
    SetTransitionHeaderTransform();
    headerElement.dataset.status = "transition";
    

    setTimeout(() => {
        contentElement.dataset.status = "visible";
    }, msTransitonDuration)
    
}

function Hide() {
    
    if (!isOpened) {return;}
    contentElement.dataset.status = "transition-out";

    setTimeout(() => {
        contentElement.dataset.status = "hidden";
        headerElement.dataset.status = "base";
        homeElement.dataset.status = "clickable";
        isOpened = false;
    }, msTransitonDuration)

}
function HideInstant() {
    contentElement.dataset.status = "hidden";
    headerElement.dataset.status = "base";
    homeElement.dataset.status = "clickable";
    isOpened = false;
}

function SetTransitionHeaderTransform() {

    const contentBoundingRectangle = contentElement.getBoundingClientRect();
    const headerBoundingRectangle = unmodifiedHeaderRectangle;

    const scaleX = contentBoundingRectangle.width / Math.ceil(headerBoundingRectangle.width);
    const scaleY = contentBoundingRectangle.height / Math.ceil(headerBoundingRectangle.height);


    const headerMiddleX = Math.ceil(headerBoundingRectangle.left + headerBoundingRectangle.width / 2);
    const headerMiddleY = Math.ceil(headerBoundingRectangle.top + headerBoundingRectangle.height / 2);
    const contentMiddleX = contentBoundingRectangle.left + contentBoundingRectangle.width / 2;
    const contentMiddleY = contentBoundingRectangle.top + contentBoundingRectangle.height / 2;

    const translateX = headerMiddleX - contentMiddleX;
    const translateY = headerMiddleY - contentMiddleY;

    document.documentElement.style.setProperty(transitionTransformCSSVar, `translate(${-translateX}px, ${-translateY}px) scale(${scaleX}, ${scaleY})`);
    
}

function SetClipRect() {
    const contentBoundingRectangle = contentElement.getBoundingClientRect();
    document.documentElement.style.setProperty(preVisiblePolygonCSSVar, `polygon(0 ${contentBoundingRectangle.top}, 0 ${contentBoundingRectangle.top}, 100% ${contentBoundingRectangle.top}, 100% ${contentBoundingRectangle.top})`);
}