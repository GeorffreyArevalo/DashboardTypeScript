import loading from './loading.html?raw';

export class LoadingComponent {

    public loadInitLoading(secondSection: HTMLElement) {
        const sectionElement: HTMLElement = document.createElement('section');
        sectionElement.id = 'chartjs';
        sectionElement.className = 'flex flex-col items-center justify-center mt-5 h-5rem-n';
        sectionElement.innerHTML = loading;
        secondSection.append(sectionElement);
    }

}
