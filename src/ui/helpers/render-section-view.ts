import { cleanHTML } from "./";

export const renderSectionView = (secondSection: HTMLElement, htmlContent: string, id: string, idClean: string): void => {
    const sectionElement: HTMLElement = secondSection.querySelector(`#${idClean}`) || document.createElement('section');
    cleanHTML(sectionElement);
    sectionElement.id = id;
    sectionElement.className = 'flex flex-col sm:grid-cols-2 sm:grid xl:grid-cols-3 xl:grid-rows-3 gap-5 h-5rem-n p-3 overflow-y-scroll';
    sectionElement.innerHTML = htmlContent;
    secondSection.append(sectionElement);
}
