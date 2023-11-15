"use strict";
import { GetElementByJSSelector, GetAllElementsWithJSSelector, RemToPixels } from "./Utilities.js";

interface settings {
    skillSelector: string,
    skillsWheelContainerSelector: string,
    skillWidthCSSVar: string,
    skillHeightCSSVar: string
}

let circleCenter = { x: 0, y: 0 };
let circleRadius = 100;
let rotationInterval: number | null = null;
let skillSelector: string;
let skillsWheelContainerSelector: string;
let skillNodes: NodeListOf<HTMLElement>;
let skillsWheelContainerElement: HTMLElement;
let skillWidthCSSVar: string;
let skillHeightCSSVar: string;
let skillWidth: string;
let skillHeight: string;

export function Init(settings : settings) {
    skillSelector = settings.skillSelector;
    skillsWheelContainerSelector = settings.skillsWheelContainerSelector;
    skillNodes = GetAllElementsWithJSSelector(settings.skillSelector) as NodeListOf<HTMLElement>;
    skillsWheelContainerElement = GetElementByJSSelector(settings.skillsWheelContainerSelector) as HTMLElement;
    skillWidthCSSVar = settings.skillWidthCSSVar;
    skillHeightCSSVar = settings.skillHeightCSSVar;
    skillWidth = getComputedStyle(document.documentElement).getPropertyValue(skillWidthCSSVar);
    skillHeight = getComputedStyle(document.documentElement).getPropertyValue(skillHeightCSSVar);

    window.addEventListener("resize", () => {
        skillWidth = getComputedStyle(document.documentElement).getPropertyValue(skillWidthCSSVar);
        skillHeight = getComputedStyle(document.documentElement).getPropertyValue(skillHeightCSSVar);
    })
}

export function SetupWheel() {
    console.log("wheel setup");
    const skillsWheelBoundingRectangle = skillsWheelContainerElement.getBoundingClientRect();
    circleCenter.x = skillsWheelBoundingRectangle.width / 2;
    circleCenter.y = skillsWheelBoundingRectangle.height / 2;
    circleRadius = Math.min(skillsWheelBoundingRectangle.width - RemToPixels(skillWidth), skillsWheelBoundingRectangle.height - RemToPixels(skillHeight)) / 2;

    let currentAngle = 2 * Math.PI;
    let difference = currentAngle / skillNodes.length;

    skillNodes.forEach((skillNode) => {
        skillNode.dataset.angle = currentAngle.toString();
        currentAngle -= difference;
    })
    if (rotationInterval) {
        clearInterval(rotationInterval);
    }
    rotationInterval = setInterval(() => {
        skillNodes.forEach((skillNode) => {
            let angle = Number(skillNode.dataset.angle);
            angle += 0.015;
            skillNode.dataset.angle = angle.toString();
            skillNode.style.left = `calc(${circleCenter.x + circleRadius * Math.cos(angle)}px - ${skillWidth} / 2)`;
            skillNode.style.top = `calc(${circleCenter.y + circleRadius * Math.sin(angle)}px - ${skillHeight} / 2)`;
        })
    }, 100)
}