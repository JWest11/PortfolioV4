"use strict";

export function GetElementByJSSelector(selector : string) {
    return document.querySelector(`[data-js-selector="${selector}"]`);
}

export function GetAllElementsWithJSSelector(selector : string) {
    return document.querySelectorAll(`[data-js-selector="${selector}"]`);
}

export function RemToPixels(remString : string) {
    let s = remString.substring(0, remString.length - 3);
    let remNumber = Number(s);
    return remNumber * parseFloat(getComputedStyle(document.documentElement).fontSize);
}