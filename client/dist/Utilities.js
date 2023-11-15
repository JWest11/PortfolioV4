"use strict";
export function GetElementByJSSelector(selector) {
    return document.querySelector(`[data-js-selector="${selector}"]`);
}
export function GetAllElementsWithJSSelector(selector) {
    return document.querySelectorAll(`[data-js-selector="${selector}"]`);
}
export function RemToPixels(remString) {
    let s = remString.substring(0, remString.length - 3);
    let remNumber = Number(s);
    return remNumber * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
