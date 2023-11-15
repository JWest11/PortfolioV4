"use strict";
import { GetElementByJSSelector, GetAllElementsWithJSSelector } from "./Utilities.js";

interface settings {
    projectSelector : string;
    phonePreFocusLeftCSSVar : string;
    phonePreFocusTopCSSVar : string;
    projectSectionSelector : string;
}

let zIndex = 1;
let focused = false;
let projectSelector : string;
let phonePreFocusLeftCSSVar : string;
let phonePreFocusTopCSSVar : string;
let projectNodes : NodeListOf<HTMLElement>;
let projectSectionSelector : string;
let projectSectionElement : HTMLElement;



export function Init(settings : settings) {
    projectSelector = settings.projectSelector;
    phonePreFocusLeftCSSVar = settings.phonePreFocusLeftCSSVar;
    phonePreFocusTopCSSVar = settings.phonePreFocusTopCSSVar;
    projectNodes = GetAllElementsWithJSSelector(settings.projectSelector) as NodeListOf<HTMLElement>;
    projectSectionSelector = settings.projectSectionSelector;
    projectSectionElement = GetElementByJSSelector(settings.projectSectionSelector) as HTMLElement;

    projectNodes.forEach((projectNode) => {
        projectNode.addEventListener("click", e => FocusProject(e));
        projectNode.addEventListener("mouseover", e => SetZIndex(e));
    })

    projectSectionElement.addEventListener("click", e => UnfocusAll(e));
    
}

function FocusProject(event) {
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
        } else {
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
        } else {
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
    focused = false;
}

function SetZIndex(event) {
    if (focused) {return;}
    event.target.closest(`[data-js-selector="${projectSelector}"]`).style.zIndex = zIndex;
    zIndex++;
}