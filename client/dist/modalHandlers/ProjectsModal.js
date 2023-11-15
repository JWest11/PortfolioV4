"use strict";
import { GetElementByJSSelector } from "../Utilities.js";
let isOpened = false;
let unpeekActivated = false;
let pxUnderlineHeight = 5;
let headerElement;
let contentElement;
let homeElement;
let closeProjectsElement;
let prePeekPolygonCSSVar;
let peekPolygonCSSVar;
let transitionPolygonCSSVar;
let fullScreenPolygonCSSVar;
let msTransitonDuration;
export function Init(settings) {
    headerElement = GetElementByJSSelector(settings.headerSelector);
    contentElement = GetElementByJSSelector(settings.contentSelector);
    homeElement = GetElementByJSSelector(settings.homeSelector);
    closeProjectsElement = GetElementByJSSelector(settings.closeProjectsSelector);
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
    if (isOpened) {
        return;
    }
    unpeekActivated = false;
    const boundingRectangle = headerElement.getBoundingClientRect();
    const left = boundingRectangle.left;
    const top = boundingRectangle.bottom;
    const bottom = top + pxUnderlineHeight;
    const right = boundingRectangle.right;
    const middle = (left + right) / 2;
    document.documentElement.style.setProperty(prePeekPolygonCSSVar, `polygon(${middle}px ${top}px, ${middle}px ${bottom}px, ${middle}px ${bottom}px, ${middle}px ${top}px)`);
    contentElement.dataset.status = "pre-peek";
    setTimeout(() => {
        if (unpeekActivated || isOpened) {
            return;
        }
        document.documentElement.style.setProperty(peekPolygonCSSVar, `polygon(${left}px ${top}px, ${left}px ${bottom}px, ${right}px ${bottom}px, ${right}px ${top}px)`);
        contentElement.dataset.status = "peek";
    }, 100);
}
function SetupPrePeekUnderline() {
    const boundingRectangle = headerElement.getBoundingClientRect();
    const left = boundingRectangle.left;
    const top = boundingRectangle.bottom;
    const bottom = top + pxUnderlineHeight;
    const right = boundingRectangle.right;
    const middle = (left + right) / 2;
    document.documentElement.style.setProperty(prePeekPolygonCSSVar, `polygon(${middle}px ${top}px, ${middle}px ${bottom}px, ${middle}px ${bottom}px, ${middle}px ${top}px)`);
}
function Unpeek() {
    if (isOpened) {
        return;
    }
    unpeekActivated = true;
    contentElement.dataset.status = "pre-peek-with-transition";
}
function Show() {
    isOpened = true;
    const boundingRectangle = headerElement.getBoundingClientRect();
    const left = 0;
    const top = boundingRectangle.bottom;
    const bottom = top + pxUnderlineHeight;
    const right = window.innerWidth;
    document.documentElement.style.setProperty(transitionPolygonCSSVar, `polygon(${left}px ${top}px, ${left}px ${bottom}px, ${right}px ${bottom}px, ${right}px ${top}px)`);
    contentElement.dataset.status = "transition";
    homeElement.dataset.status = "unclickable";
    setTimeout(() => {
        contentElement.dataset.status = "visible";
    }, msTransitonDuration);
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
    }, msTransitonDuration);
}
