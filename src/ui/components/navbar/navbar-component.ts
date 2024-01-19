import { ChartView, HighchartView } from '../../views';
import navbar from './navbar.html?raw';
import { ViewInterface } from '../../interfaces/views-interface';
import { App } from '../../../models';

export class Navbar {

    private darkIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>`;

    private lightIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>`;                            

    constructor(private id: string, private app: App){}
    
    public loadNavbar(secondSection: HTMLElement): void {
        
        const nav: HTMLElement = document.createElement('nav');
        nav.id = `#${this.id}`;
        nav.className = 'bg-primary-thin dark:bg-primary-thin-dark text-white py-5 px-5 m-l-5per-n flex flex-row items-center justify-between transition-all duration-300 shadow shadow-gray-400 dark:shadow-zinc-600';
        this.changeTheme(nav);
        secondSection.append(nav);
        this.addEventClickToggle(this.app, secondSection);
        this.addEventButtonMenu();
    }

    private addEventClickToggle(app: App, secondSection: HTMLElement): void {
        const button: HTMLElement | null = document.querySelector<HTMLElement>('#btn-theme');
        button?.addEventListener('click', () => {
            
            let view: ViewInterface;
            let idClean: string;

            if(app.currentView === 'chartjs'){
                view = new ChartView('', this.app);
                idClean = 'chartjs';
            }else {
                view = new HighchartView('', this.app);
                idClean = 'highchart';
            }
    
            this.changeSwitchTheme(secondSection, view, idClean);
        });
    }

    private changeSwitchTheme(secondSection: HTMLElement, view: ViewInterface, idClean: string): void {
        
        const theme: string = localStorage.getItem('theme') || '';
        const switchToggle: HTMLElement = document.querySelector('#switch-toggle') || document.createElement('div');

        if (theme === 'dark') {
            setTimeout(() => {
                switchToggle.innerHTML = this.lightIcon;
            }, 250);
            localStorage.setItem('theme', 'ligth');
            view.theme = 'ligth';
        } else {
            setTimeout(() => {
                switchToggle.innerHTML = this.darkIcon;
            }, 250);
            view.theme = 'dark';
            localStorage.setItem('theme', 'dark');
        }
        view.loadInitView(secondSection, idClean);
        document.documentElement.classList.toggle('dark');
    }

    private changeTheme(navElement: HTMLElement): void {
        const theme: string = localStorage.getItem('theme') || '';
        if(theme === 'dark') {
            document.documentElement.classList.add('dark');
            navElement.innerHTML = navbar.replace('${iconTheme}', this.darkIcon);
        }else{
            navElement.innerHTML = navbar.replace('${iconTheme}', this.lightIcon);
        }
    }

    private addEventButtonMenu(): void {
        const btnMenu: HTMLElement | null = document.querySelector<HTMLElement>('#nav-btn-menu');
        btnMenu!.onclick = this.onClickBtnMenu;
    }

    private onClickBtnMenu(): void {
        const asideMenu: HTMLElement | null = document.querySelector<HTMLLIElement>('#menu-aside');
        asideMenu?.classList.remove('translate-x-72-n');
        asideMenu?.classList.add('translate-x-0');
    }

}
