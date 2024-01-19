import { ViewType } from "../ui/types";
import { Aside, LoadingComponent, Navbar } from "../ui/components";
import { ChartView } from "../ui/views";
import { DataStatistics, StandingsInterface, TopScorerInterface } from "../interfaces";
import { getInfoSeason, getTopScorer } from "../services";

export class App {
    
    private _data: DataStatistics = {};

    constructor(private _currentView: ViewType){}

    get currentView() {
        return this._currentView;
    }

    set currentView(currentView: ViewType) {
        this._currentView = currentView;
    }

    get data() {
        return this._data;
    }

    public async initApp(id:string):Promise<void> {
        const element: HTMLDivElement | null = document.querySelector<HTMLDivElement>(id);
        const mainElement: HTMLElement = document.createElement('main');
        mainElement.className = 'bg-secondary dark:bg-secondary-dark block relative md:flex h-svh text-black dark:text-white transition-all duration-300 overflow-y-sroll';
        mainElement.id = 'main';
        element?.append(mainElement);
        this.loadAsideMenu();
        const divElement: HTMLElement = document.createElement('div');
        divElement.className = 'w-full absolute md:static top-0';
        divElement.id = 'second-section';
        mainElement.append(divElement);
        this.loadNavbar(divElement);
        this.loadLoading(divElement);
        await this.loadInfoSeason();
        this.loadChartView(divElement);
    }

    private loadAsideMenu():void {
        const asideMenu: Aside = new Aside('menu-aside', this);
        asideMenu.loadAsideMenu();
    }

    private loadNavbar(secondSection: HTMLElement): void {
        const navbar: Navbar = new Navbar('navbar', this);
        navbar.loadNavbar(secondSection);
    }

    private loadChartView(secondSection: HTMLElement): void {
        const theme = localStorage.getItem('theme') || '';
        const chart: ChartView = new ChartView(theme, this);
        chart.loadInitView(secondSection, 'chartjs');
    }

    private loadLoading(secondSection: HTMLElement): void {
        const loading: LoadingComponent = new LoadingComponent();
        loading.loadInitLoading(secondSection);
    }

    private async loadInfoSeason(): Promise<void> {
        try {
            
            type types = StandingsInterface | TopScorerInterface;
            const dataPromise: Promise<types>[] = [getInfoSeason(), getTopScorer()];
            const info: (types)[] = await Promise.all(dataPromise);
            info.forEach( itemInfo => {
                if(itemInfo.get === 'standings'){
                    this._data.standingsCurrent = itemInfo;
                }else if(itemInfo.get === "players/topscorers"){
                    this._data.topScorer = itemInfo;
                }
            });

        } catch (error: any) {
            this._data.error = error;
        }
            
        
    }
}
