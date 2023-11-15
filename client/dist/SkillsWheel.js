"use strict";
import { GetElementByJSSelector, GetAllElementsWithJSSelector, RemToPixels } from "./Utilities.js";
let circleCenter = { x: 0, y: 0 };
let circleRadius = 100;
let rotationInterval = null;
let skillSelector;
let skillsWheelContainerSelector;
let skillNodes;
let skillsWheelContainerElement;
let skillWidthCSSVar;
let skillHeightCSSVar;
let skillWidth;
let skillHeight;
export function Init(settings) {
    skillSelector = settings.skillSelector;
    skillsWheelContainerSelector = settings.skillsWheelContainerSelector;
    skillNodes = GetAllElementsWithJSSelector(settings.skillSelector);
    skillsWheelContainerElement = GetElementByJSSelector(settings.skillsWheelContainerSelector);
    skillWidthCSSVar = settings.skillWidthCSSVar;
    skillHeightCSSVar = settings.skillHeightCSSVar;
    skillWidth = getComputedStyle(document.documentElement).getPropertyValue(skillWidthCSSVar);
    skillHeight = getComputedStyle(document.documentElement).getPropertyValue(skillHeightCSSVar);
    window.addEventListener("resize", () => {
        skillWidth = getComputedStyle(document.documentElement).getPropertyValue(skillWidthCSSVar);
        skillHeight = getComputedStyle(document.documentElement).getPropertyValue(skillHeightCSSVar);
    });
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
    });
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
        });
    }, 100);
}
