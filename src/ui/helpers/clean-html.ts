
export const cleanHTML = (element: HTMLElement): void => {
    while(element.firstElementChild){
        element.removeChild(element.firstElementChild);
    }
}
