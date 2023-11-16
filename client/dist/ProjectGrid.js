"use strict";
import { GetElementByJSSelector, GetAllElementsWithJSSelector } from "./Utilities.js";
let zIndex = 1;
let focused = false;
let projectSelector;
let phonePreFocusLeftCSSVar;
let phonePreFocusTopCSSVar;
let projectNodes;
let projectSectionSelector;
let projectSectionElement;
let closeProjectButtons;
let closeProjectButtonSelector;
export function Init(settings) {
    projectSelector = settings.projectSelector;
    phonePreFocusLeftCSSVar = settings.phonePreFocusLeftCSSVar;
    phonePreFocusTopCSSVar = settings.phonePreFocusTopCSSVar;
    projectNodes = GetAllElementsWithJSSelector(settings.projectSelector);
    projectSectionSelector = settings.projectSectionSelector;
    projectSectionElement = GetElementByJSSelector(settings.projectSectionSelector);
    closeProjectButtons = GetAllElementsWithJSSelector(settings.closeProjectButtonSelector);
    closeProjectButtonSelector = settings.closeProjectButtonSelector;
    projectNodes.forEach((projectNode) => {
        projectNode.addEventListener("click", e => FocusProject(e));
        projectNode.addEventListener("mouseover", e => SetZIndex(e));
    });
    closeProjectButtons.forEach((closeProjectButton) => {
        closeProjectButton.addEventListener("click", UnfocusAllUnchecked);
    });
    projectSectionElement.addEventListener("click", e => UnfocusAll(e));
}
function FocusProject(event) {
    if (focused) {
        return;
    }
    const node = event.target.closest(`[data-js-selector="${projectSelector}"]`);
    const index = Number(node.dataset.index);
    if (window.innerWidth <= 768) {
        PhoneFocusByIndex(index);
    }
    else {
        FocusByIndex(index);
    }
}
function FocusByIndex(index) {
    for (let i = 0; i < projectNodes.length; i++) {
        if (i === index) {
            projectNodes[i].dataset.status = "focused";
        }
        else {
            projectNodes[i].dataset.status = "hidden";
            projectNodes[i].style.zIndex = "0";
        }
    }
    focused = true;
}
function PhoneFocusByIndex(index) {
    for (let i = 0; i < projectNodes.length; i++) {
        if (i === index) {
            const projectBoundingRect = projectNodes[i].getBoundingClientRect();
            console.log(projectBoundingRect);
            document.documentElement.style.setProperty(phonePreFocusLeftCSSVar, projectBoundingRect.left + "px");
            document.documentElement.style.setProperty(phonePreFocusTopCSSVar, projectBoundingRect.top + "px");
            projectNodes[i].dataset.status = "phonePreFocused";
            setTimeout(() => {
                projectNodes[i].dataset.status = "focused";
            }, 100);
        }
        else {
            projectNodes[i].dataset.status = "hidden";
            projectNodes[i].style.zIndex = "0";
        }
    }
    focused = true;
}
function UnfocusAll(event) {
    if (event.target.closest(`[data-js-selector="${projectSelector}"]`)) {
        return;
    }
    projectNodes.forEach(node => {
        node.dataset.status = "hoverable";
    });
    setTimeout(() => {
        focused = false;
    }, 100);
}
function UnfocusAllUnchecked() {
    projectNodes.forEach(node => {
        node.dataset.status = "hoverable";
    });
    setTimeout(() => {
        focused = false;
    }, 100);
}
function SetZIndex(event) {
    if (focused) {
        return;
    }
    event.target.closest(`[data-js-selector="${projectSelector}"]`).style.zIndex = zIndex;
    zIndex++;
}
