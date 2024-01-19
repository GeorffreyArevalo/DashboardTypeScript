import { renderSectionView } from '../../helpers';
import Highcharts from 'highcharts/highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import highchatrtView from './highchart.html?raw';
import { ViewInterface } from '../../interfaces';
import { App } from '../../../models';
import { getBarData, getDouData, getHorozontalBarData, getLineData, getPieData } from '../../../helpers';

export class HighchartView implements ViewInterface {

    constructor(private _theme: string, private _app: App | null){
        const color: string = this._theme === 'dark' ? 'white' : 'black';
        this.changeColorHighcharts(color);
        Highcharts3D(Highcharts);
    }
    
    get theme(): string {
        return this._theme;
    }
    
    set theme(theme: string){
        this._theme = theme;
        const color: string = this._theme === 'dark' ? 'white' : 'black';
        this.changeColorHighcharts(color);
    }

    get app(): App | null{
        return this._app;
    }

    set app(app: App){
        this._app = app;
    }
    
    public loadInitView(secondSection: HTMLElement, idClean: string):void {
        renderSectionView(secondSection, highchatrtView, 'highchart', idClean);
        this.loadBarHighchart();
        this.loadPieHighchart();
        this.loadHorizontalHighchart();
        this.loadDonutHighchart();
        this.loadAreaLineHighchart();
    }

    private changeColorHighcharts(color: string): void {
        Highcharts.setOptions({
            chart: {
                backgroundColor: 'rgba(0, 0, 0, 0)'
            },
            title: {
                style: {
                    color,
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color
                    }
                },
                lineColor: color,
                gridLineColor: '#999',
                title: {
                    style: {
                        color,
                    }
                }
            },
            yAxis: {
                labels: {
                    style: {
                        color
                    }
                },
                lineColor: color,
                gridLineColor: '#999',
                title: {
                    style: {
                        color,
                    }
                }
            },
            legend: {
                itemStyle: {
                    color,
                }
            }
        });
    }

    private loadBarHighchart(): void {

        const {datasets: {draw, lost, won}, labels} = getHorozontalBarData(this._app?.data.standingsCurrent!);
        
        const options: Highcharts.Options = {
            chart: {
                options3d: {
                    enabled: true,
                    alpha: 10, 
                    beta: 12, 
                    viewDistance: 40, 
                    depth: 90
                },
                height: 570
            },
            title: {
                text: 'Information of games',
                align: 'left'
            },
            xAxis: {
                categories: labels,
                labels: {
                    skew3d: true,
                    style: {
                        fontSize: '16px'
                    }
                }
            },
        
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'TWh',
                    skew3d: true,
                    style: {
                        fontSize: '16px'
                    }
                }
            },

            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
            },
        
            plotOptions: {
                column: {
                    stacking: 'normal',
                    depth: 40
                }
            },
            series: [{
                name: 'Won',
                data: won,
                type: 'column',
                stack: 'won'
            }, {
                name: 'Lost',
                data: lost,
                type: 'column',
                stack: 'lost'
            }, {
                name: 'Draw',
                data: draw,
                type: 'column',
                stack: 'draw'
            }]
        };
        
        Highcharts.chart('barHighchart', options);

    }

    private loadPieHighchart(): void {
        
        const {dataset, labels} = getPieData(this._app?.data.topScorer!);

        const options: Highcharts.Options = {

            chart: {
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                },
                height: 260
            },
            title: {
                text: 'Top Scorer (Premier League)',
                align: 'left'
            },
            subtitle: {
                text: 'Source: ' +
                    '<a href="https://www.api-football.com/"' +
                    'target="_blank">api-football.com</a>',
                align: 'left'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Share',
                data: dataset.map( (value, index) => ({ name: labels[index], y: value, sliced: index === 0, selected: index === 0 }) ),
            }]
        }

        Highcharts.chart('pieHighchart', options);

    }

    private loadHorizontalHighchart(): void {
        
        const {dataset, labels} = getBarData(this._app?.data.standingsCurrent!, 8);
        
        const options: Highcharts.Options = {
            chart: {
                options3d: {
                    enabled: true,
                    alpha: 15, 
                    beta: 15, 
                    depth: 50,
                    viewDistance: 25
                },
                height: 570
            },
            title: {
                text: 'Standings (Premier League)',
                align: 'left'
            },
            subtitle: {
                text: 'Source: ' +
                    '<a href="https://www.api-football.com/"' +
                    'target="_blank">api-football.com</a>',
                align: 'left'
            },
            xAxis: {
                categories: labels,
                title: {
                    text: 'Teams'
                },
                labels: {
                    skew3d: true
                }
            },
            yAxis: {
                title: {
                    margin: 20,
                    text: 'Scorer'
                },
                labels: {
                    skew3d: true
                }
            },
            tooltip: {
                headerFormat: '<b>Age: {point.x}</b><br>'
            },
            plotOptions: {
                column: {
                    depth: 25,
                    stacking: 'normal'
                }
            },
            series: [{
                data: dataset,
                name: 'Scorer',
                showInLegend: false,
                type: 'bar'
            }]
        };

        Highcharts.chart('horizontalBarHighchart', options);

    }

    private loadDonutHighchart(): void {
        
        const {datasets: {assists, penalties}, labels} = getDouData(this._app?.data.topScorer!, 4);

        const optionsAsists: Highcharts.Options = {
            chart: {
                options3d: {
                    enabled: true,
                    alpha: 45
                },
                height: 260
            },
            title: {
                text: 'Golascorer Asists',
                align: 'left'
            },
            plotOptions: {
                pie: {
                    innerSize: 90,
                    depth: 45
                }
            },
            series: [{
                name: 'Asists',
                data: assists.map( (value, index) => [labels[index], value] ),
                type: 'pie'
            }]
        };

        const optionsPenalties: Highcharts.Options = {
            chart: {
                options3d: {
                    enabled: true,
                    alpha: 45
                },
                height: 260
            },
            title: {
                text: 'Golascorer Penalties',
                align: 'left'
            },
            plotOptions: {
                pie: {
                    innerSize: 90,
                    depth: 45
                }
            },
            series: [{
                name: 'Penalties',
                data: penalties.map( (value, index) => [labels[index], value] ),
                type: 'pie'
            }]
        };

        Highcharts.chart('fisrtDonutHighchart', optionsAsists);
        Highcharts.chart('secondDonutHighchart', optionsPenalties);

    }
    
    private loadAreaLineHighchart(): void {

        const {labels, lostData, wonData} = getLineData(this._app?.data.standingsCurrent!);

        const options: Highcharts.Options = {
            
            chart: {
                type: 'area',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 20,
                    depth: 100
                },
                height: 570
            },
            title: {
                text: 'Visual comparison of Matches',
                align: 'left'
            },
            accessibility: {
                description: 'The chart is showing the shapes of three mountain ranges as three area line series laid out in 3D behind each other.',
                keyboardNavigation: {
                    seriesNavigation: {
                        mode: 'serialize'
                    }
                }
            },
            lang: {
                accessibility: {
                    axis: {
                        xAxisDescriptionPlural: 'The chart has 3 unlabelled X axes, one for each series.'
                    }
                }
            },
            yAxis: {
                labels: {
                    format: '{value:,.0f}'
                },
                gridLineDashStyle: 'Dash'
            },
            xAxis: [{
                visible: false
            }, {
                visible: false
            }, {
                visible: false
            }],
            plotOptions: {
                area: {
                    marker: {
                        enabled: false
                    },
                    states: {
                        inactive: {
                            enabled: false
                        }
                    }
                }
            },
            tooltip: {
                valueSuffix: ' Matches'
            },
            series: [{
                xAxis: 1,
                lineColor: 'rgb(120,160,180)',
                color: 'rgb(140,180,200)',
                fillColor: 'rgba(140,180,200, 0.5)',
                name: 'Won',
                type: 'area',
                data: wonData.map( (value, index) => [labels[index], value.y] )
            }, {
                xAxis: 2,
                lineColor: 'rgb(200, 190, 140)',
                color: 'rgb(200, 190, 140)',
                fillColor: 'rgba(230, 220, 180, 0.5)',
                name: 'Lost',
                type: 'area',
                data: lostData.map( (value, index) => [labels[index], value.y] ),
            }]

        }

        Highcharts.chart('areaLineHighchart', options);

    }


}
            
            
            
            
