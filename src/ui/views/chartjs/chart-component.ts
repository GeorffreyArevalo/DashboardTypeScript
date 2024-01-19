import { Chart, ChartItem } from 'chart.js/auto';
import chartView from './chart.html?raw';
import { renderSectionView } from '../../helpers';
import { ViewInterface } from '../../interfaces';
import { App } from '../../../models';
import { getBarData, getBubbleData, getDouData, getHorozontalBarData, getLineData, getPieData, getRadarData } from '../../../helpers';

export class ChartView implements ViewInterface {
    
    private bgColors: string[];
    private borderColors: string[];

    constructor(private _theme: string, private _app: App | null){
        Chart.defaults.color = this._theme === 'dark' ? '#FFF' : '#333'; 
        this.bgColors = ['rgba(255, 89, 94, 0.5)', 'rgba(255, 202, 58, 0.5)', 'rgba(138, 201, 38, 0.5)', 'rgba(25, 130, 196, 0.5)', 'rgba(106, 76, 147, 0.5)'];
        this.borderColors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];
    }

    get theme(): string {
        return this._theme;
    }

    set theme(theme: string) {
        this._theme = theme;
        Chart.defaults.color = this._theme === 'dark' ? '#FFF' : '#333';
    }

    get app():App | null{
        return this._app;
    }

    set app(app: App){
        this._app = app;
    }

    public loadInitView(secondSection: HTMLElement, idClean: string): void {
        renderSectionView(secondSection, chartView, 'chartjs', idClean);
        this.loadBarChart();
        this.loadPieChart();
        this.loadDouChart();
        this.loadLineChart();
        this.loadVerticalBar();
        this.loadRadarChart();
        this.loadBubbleChart();
    }

    private loadBarChart(): void {
        const canvasBar: ChartItem = document.querySelector<HTMLElement>('#barChart') as ChartItem;
        
        
        const {labels, dataset} = getBarData(this._app?.data.standingsCurrent!);
        
        
        new Chart(canvasBar, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: dataset,
                    borderWidth: 1,
                    backgroundColor: this.bgColors,
                    borderColor: this.borderColors,
                    label: 'score'
                }],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                elements: {
                    bar: {
                        borderRadius: 5,
                    },
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Standings'
                    }
                },
            }
        });
    }

    private loadPieChart(): void {

        const canvasPie: ChartItem = document.querySelector('#pieChart') as ChartItem;
        
        const {dataset, labels} = getPieData(this._app?.data.topScorer!);

        new Chart(canvasPie, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: dataset,
                    borderWidth: 1,
                    backgroundColor: this.borderColors,
                    label: 'goals'
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Top Scorers'
                    }
                }
            }
        })

    }

    private loadDouChart(): void {

        const canvasFirtsDou: ChartItem = document.querySelector<HTMLElement>('#douChartFirst') as ChartItem;
        const canvasSecondDou: ChartItem = document.querySelector<HTMLElement>('#douChartSecond') as ChartItem;
        const canvasThirdDou: ChartItem = document.querySelector<HTMLElement>('#douChartThird') as ChartItem;
        const canvasFourthDou: ChartItem = document.querySelector<HTMLElement>('#douChartFourth') as ChartItem;
        
        const {datasets: {assists, goals, penalties, playedMatches}, labels} = getDouData(this._app?.data.topScorer!);

        new Chart(canvasFirtsDou, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: goals,
                    borderWidth: 1,
                    backgroundColor: this.borderColors,
                    label: 'Goals'
                }],
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Goals'
                    }
                }
            }
        });
        new Chart(canvasSecondDou, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: assists,
                    borderWidth: 1,
                    backgroundColor: this.borderColors.slice(2,5),
                    label: 'Assists'
                }],
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Assists'
                    }
                }
            }
        });
        new Chart(canvasThirdDou, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: playedMatches,
                    borderWidth: 1,
                    backgroundColor: this.borderColors.slice(3,6),
                    label: 'Games Played'
                }],
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Games Played'
                    }
                }
            }
        });
        new Chart(canvasFourthDou, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: penalties,
                    borderWidth: 1,
                    backgroundColor: [this.borderColors[2], this.borderColors[0]],
                    label: 'Penalties'
                }],
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Penalties'
                    }
                }
            }
        });
        

    }

    private loadLineChart(): void {
        const {lostData, wonData} = getLineData(this._app?.data.standingsCurrent!);
        const canvasLine: ChartItem = document.querySelector('#lineChart') as ChartItem;
        
        new Chart(canvasLine, {
            type: 'line',
            data: {
                datasets: [
                    {
                        borderColor: this.borderColors[0],
                        borderWidth: 1,
                        data: wonData,
                        pointStyle: false,
                        label: 'Points vs Won'
                    },
                    {
                        borderColor: this.borderColors[1],
                        borderWidth: 1,
                        data: lostData,
                        pointStyle: false,
                        label: 'Points vs Lost',
                    }
                ]
            },
            options: {
                interaction: {
                    intersect: false
                  },
                  plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                  },
                  scales: {
                    x: {
                      type: 'linear'
                    }
                  },
                  elements: {
                    line: {

                    }
                  }
            }
        })

    }

    private loadVerticalBar(): void {

        const canvasVerticalBar: ChartItem = document.querySelector<HTMLElement>('#barVerticalChart') as ChartItem;
        
        const {datasets, labels} = getHorozontalBarData(this._app?.data.standingsCurrent!);

        new Chart(canvasVerticalBar, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: datasets.won,
                    borderWidth: 1,
                    backgroundColor: this.borderColors[2],
                    
                    label: 'Won Matches'
                }, {
                    data: datasets.draw,
                    borderWidth: 1,
                    backgroundColor: this.borderColors[3],
                    
                    label: 'Draw matches'
                }, {
                    data: datasets.lost,
                    borderWidth: 1,
                    backgroundColor: this.borderColors[0],
                    
                    label: 'Lost Matches'
                }],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                elements: {
                    bar: {
                        borderRadius: 5,
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                }
            }
        });

    }

    private loadRadarChart(): void{
        const canvasRadar: ChartItem = document.querySelector<HTMLElement>('#radarChart') as ChartItem;
        const {datasets, labels} = getRadarData(this._app?.data.standingsCurrent!);
        const data = {
            labels: [
              'Won',
              'Draw',
              'Lost',
              'Games',
              'Goals For',
              'Goals Against',
              'Points'
            ],
            datasets: [{
              label: labels[0],
              data: datasets[0],
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
            }, {
              label: labels[1],
              data: datasets[1],
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              pointBackgroundColor: 'rgb(54, 162, 235)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(54, 162, 235)',
            }]
          };
            
        new Chart(canvasRadar, {
            type: 'radar',
            data: data,
            options: {
                
              elements: {
                line: {
                  borderWidth: 3,
                },
              },
              scales: {
                r: {
                    ticks: {
                        backdropColor: 'rgba(0, 0, 0, 0)'
                    }
                }
              },
              plugins: {
                title: {
                    display: true,
                    text: 'Statistics'
                }
              }
            },
        });

    }

    private loadBubbleChart(): void{

        const canvasBubble: ChartItem = document.querySelector<HTMLElement>('#bubbleChart') as ChartItem;
        
        const dataPoints = getBubbleData(this._app?.data.standingsCurrent!);

        const data = {
            datasets: [{
              label: 'Points vs Goals For',
              data: dataPoints,
              backgroundColor: 'rgba(255, 99, 132, 0.4)',
              borderColor: 'rgb(255, 99, 132)'
            }],
          };

        new Chart(canvasBubble, {
            type: 'bubble',
            data: data,
            options: {
            scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    }
                }
            }
        });

    }

}

