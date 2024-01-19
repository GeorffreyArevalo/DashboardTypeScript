import { App } from '../../../models';
import { itemsMenu } from '../../data';
import { ItemMenu } from '../../interfaces/item-menu-interface';
import aside from './aside.html?raw';

export class Aside {

    constructor(private id: string, private app: App){}
    
    public loadAsideMenu():void{
        const mainElement: HTMLElement | null = document.querySelector<HTMLElement>('#main');
        const asideElement: HTMLElement = document.createElement('aside');
        asideElement.className = 'dark:bg-primary-dark translate-x-72-n md:translate-x-0 absolute bottom-0 top-0 z-20 md:z-0 md:static w-64 h-dvh md:h-auto menu';
        asideElement.id = this.id;
        asideElement.innerHTML = aside;
        mainElement?.append(asideElement);
        this.addEventClickMenu();
        this.loadItemsSideMenu(asideElement);
        this.addEventCloseMenu();
    }

    private addEventClickMenu():void {
        const button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>(`#${this.id} .btn-menu`);   
        button?.addEventListener('click', () => {
            this.onClickMenu();
        });
    }

    private onClickMenu(): void {
        const asideMenu = document.querySelector<HTMLElement>(`#${this.id}`);
        asideMenu?.classList.toggle('menu-sm');
    }

    private loadItemsSideMenu(asideElement: HTMLElement): void {
        const ulMenu: HTMLElement | null = document.querySelector<HTMLElement>('#items-menu');
        
        itemsMenu.forEach( (item: ItemMenu) => {
            
            const liElement: HTMLElement = document.createElement('li');
            liElement.className = `${ this.app.currentView === item.id ? 'bg-secondary text-primary dark:text-white hover:bg-secondary-demon dark:bg-secondary-dark dark:hover:bg-secondary-demon-dark' : 'dark:hover:bg-primary-demon-dark hover:bg-primary-demon' }`;
            const aElement: HTMLElement = document.createElement('a');
            const divElement: HTMLElement = document.createElement('div');
            divElement.innerHTML = item.icon;
            const spanElement:HTMLElement = document.createElement('span');
            spanElement.className = 'text-lg font-bold';
            spanElement.textContent = item.name;
            liElement.id = `item-menu-${item.id}`;
            liElement.onclick = () => {
                this.onClickItemMenu(item, asideElement);
            }

            aElement.append(divElement);
            aElement.append(spanElement);
            liElement.append(aElement);
            ulMenu?.append(liElement);
            
        });

    }
    
    private onClickItemMenu(item: ItemMenu, asideElement: HTMLElement): void {
        if(item.id === this.app.currentView) return;
        const liElementCurrent: HTMLElement | null = document.querySelector<HTMLElement>(`#item-menu-${this.app.currentView}`);
        const liElementNew: HTMLElement | null = document.querySelector<HTMLElement>(`#item-menu-${item.id}`);
        const spanNavbar: HTMLElement | null = document.querySelector<HTMLElement>('#title-navbar');
        const theme: string = localStorage.getItem('theme') || '';
        item.viewInstance.theme = theme;
        item.viewInstance.app = this.app;
        const secondSection: HTMLElement | null = document.querySelector<HTMLElement>('#second-section');
        item.viewInstance.loadInitView(secondSection!, this.app.currentView);
        liElementCurrent?.classList.remove('bg-secondary', 'text-primary', 'dark:text-white', 'hover:bg-secondary-demon', 'dark:bg-secondary-dark', 'dark:hover:bg-secondary-demon-dark');
        liElementCurrent?.classList.add('dark:hover:bg-primary-demon-dark', 'hover:bg-primary-demon');
        
        liElementNew?.classList.remove('dark:hover:bg-primary-demon-dark', 'hover:bg-primary-demon');
        liElementNew?.classList.add('bg-secondary', 'text-primary', 'dark:text-white', 'hover:bg-secondary-demon', 'dark:bg-secondary-dark', 'dark:hover:bg-secondary-demon-dark');
        asideElement.classList.add('translate-x-72-n');
        asideElement.classList.remove('translate-x-0');
        
        spanNavbar!.textContent = item.name;
        this.app.currentView = item.id;
    }

    private addEventCloseMenu(): void  {
        const btnCloseMenu: HTMLElement | null = document.querySelector<HTMLElement>('#close-nav-menu');
        btnCloseMenu!.onclick = this.onClickCloseMenu;
    }

    private onClickCloseMenu(): void {
        const asideMenu: HTMLElement | null = document.querySelector<HTMLElement>('#menu-aside');
        asideMenu?.classList.remove('translate-x-0');
        asideMenu?.classList.add('translate-x-72-n');
    }

}