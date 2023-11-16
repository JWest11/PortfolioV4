"use strict";
import { Init as ContactModal } from "./modalHandlers/ContactModal.js";
import { Init as ProjectsModal } from "./modalHandlers/ProjectsModal.js";
import { Init as SkillsModal } from "./modalHandlers/SkillsModal.js";
import { Init as ProjectsGrid } from "./ProjectGrid.js";
import { Init as SkillsWheel } from "./SkillsWheel.js";
import { Init as SetupEmailer } from "./Email.js";
import { SetupWheel } from "./SkillsWheel.js";
import { GetElementByJSSelector } from "./Utilities.js";
const msTransitonDuration = 800;
ContactModal({
    closeContactSelector: "ContactCloseButton",
    homeSelector: "Home",
    headerSelector: "ContactHeader",
    contentSelector: "ContactSection",
    transitionTransformCSSVar: "--contact-header-transition-transform",
    preVisiblePolygonCSSVar: "--contact-pre-visible-polygon",
    visiblePolygonCSSVar: "--contact-visible-polygon",
    msTransitonDuration: msTransitonDuration
});
ProjectsModal({
    closeProjectsSelector: "ProjectsCloseButton",
    homeSelector: "Home",
    headerSelector: "ProjectsHeader",
    contentSelector: "ProjectsSection",
    prePeekPolygonCSSVar: "--pre-peek-polygon",
    peekPolygonCSSVar: "--peek-polygon",
    transitionPolygonCSSVar: "--transition-polygon",
    fullScreenPolygonCSSVar: "--full-screen-polygon",
    msTransitonDuration: msTransitonDuration
});
SkillsModal({
    iSelector: "i",
    homeSelector: "Home",
    headerSelector: "SkillsHeader",
    contentSelector: "SkillsSection",
    closeSelector: "SkillsCloseButton",
    circleCenterCSSVar: "--circle-center",
    msTransitonDuration: msTransitonDuration,
    onPeekDelegate: SetupWheel
});
ProjectsGrid({
    projectSelector: "Project",
    projectSectionSelector: "ProjectsSection",
    phonePreFocusLeftCSSVar: "--phone-pre-focus-left",
    phonePreFocusTopCSSVar: "--phone-pre-focus-top",
    closeProjectButtonSelector: "CloseProjectButton"
});
SkillsWheel({
    skillSelector: "Skill",
    skillsWheelContainerSelector: "SkillsWheel",
    skillWidthCSSVar: "--skill-width",
    skillHeightCSSVar: "--skill-height"
});
SetupEmailer({
    emailSubjectSelector: "EmailInput",
    emailContactSelector: "SubjectInput",
    emailMessageSelector: "MessageInput",
    emailSubmitSelector: "SubmitButton"
});
function SetJosephWestHeaderColor(colorCSSVar, shadowCSSVar) {
    const headerElement = GetElementByJSSelector("JosephWestHeader");
    headerElement.style.color = `var(${colorCSSVar})`;
    headerElement.style.textShadow = `1px 1px 5px var(${shadowCSSVar})`;
}
const projectHeader = GetElementByJSSelector("ProjectsHeader");
const skillsHeader = GetElementByJSSelector("SkillsHeader");
const contactHeader = GetElementByJSSelector("ContactHeader");
projectHeader.addEventListener("mouseover", () => { SetJosephWestHeaderColor("--green", "--green-shadow"); });
skillsHeader.addEventListener("mouseover", () => { SetJosephWestHeaderColor("--blue", "--blue-shadow"); });
contactHeader.addEventListener("mouseover", () => { SetJosephWestHeaderColor("--red", "--red-shadow"); });
