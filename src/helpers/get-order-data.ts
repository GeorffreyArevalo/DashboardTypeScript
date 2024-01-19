import { ResponseInterface, Standing, StandingsInterface, TopScorerInterface } from "../interfaces";

export const getBarData = (data: StandingsInterface, max: number = 5) => {
    const labels: string[] = [];
    const dataset: number[] = [];    
    data.response[0].league?.standings![0].forEach( (standing, index) => {
        
        if(index < max){
            labels.push(standing.team.name);
            dataset.push(standing.points);
        }
    });
    return {labels, dataset}
}

export const getPieData = (data: TopScorerInterface, limit: number = 5) => {
    
    const labels: string[] = [];
    const dataset: number[] = [];

    for (let i = 0; i < limit; i++) {
        const scorer = data.response[i];
        labels.push(scorer.player?.name!);
        dataset.push(scorer.statistics![0].goals.total!);
    }

    return {
        labels, dataset
    }
}

export const getHorozontalBarData = (data: StandingsInterface) => {

    const labels: string[] = [];
    const datasets: {won: number[], lost: number [], draw: number[]} = {
        won: [],
        lost: [],
        draw: [],
    }

    data.response[0].league?.standings![0].forEach( (standing, index) => {
        if(index < 5){
            labels.push(standing.team.name);
            datasets.won.push(standing.all.win);
            datasets.lost.push(standing.all.lose);
            datasets.draw.push(standing.all.draw);
        }
    });

    return {
        labels, datasets
    }

}

export const getRadarData = (data: StandingsInterface) => {

    const labels: string[] = [];
    const datasets: number[][] = [];

    const firstTeam: Standing | undefined = data.response[0].league?.standings![0][0];
    const lastTeam: Standing | undefined = data.response[0].league?.standings![0][data.response[0].league?.standings![0].length - 1];
    

    labels.push(firstTeam!.team.name);
    datasets.push([firstTeam!.all.win, firstTeam!.all.draw, firstTeam!.all.lose, firstTeam!.all.played, firstTeam!.all.goals.for!, firstTeam!.all.goals.against!, firstTeam!.points]);    

    labels.push(lastTeam!.team.name);
    datasets.push([lastTeam!.all.win, lastTeam!.all.draw, lastTeam!.all.lose, lastTeam!.all.played, lastTeam!.all.goals.for!, lastTeam!.all.goals.against!, lastTeam!.points]);
    

    return{
        labels, datasets
    }

}


export const getDouData = (data: TopScorerInterface, max: number = 2) => {

    const labels: string[] = [];
    const datasets: {goals: number[], assists: number[], playedMatches: number[], penalties: number[]} = {
        goals: [], assists: [], playedMatches: [], penalties: [],
    };

    for (let i = 0; i < data.response!.length; i++) {
        const scorer: ResponseInterface = data.response[i];
        if(i >= max) break;
        labels.push(scorer.player?.name!);
        datasets.goals.push(scorer.statistics![0].goals.total!);
        datasets.assists.push(scorer.statistics![0].goals.assists!);
        datasets.playedMatches.push(scorer.statistics![0].games.appearences);
        datasets.penalties.push(scorer.statistics![0].penalty.scored);
    }

    return {
        labels, datasets
    }
    

}

export const getLineData = (data: StandingsInterface) => {

    const wonData: {x: number, y: number}[] = []
    const lostData: {x: number, y: number}[] = []
    const labels: string[] = [];

    data.response[0].league?.standings![0].forEach( (standing) => {
        wonData.push({
            x: standing.points,
            y: standing.all.win
        });

        lostData.push({
            x: standing.points,
            y: standing.all.lose
        });
        labels.push(standing.team.name);
    });
    

    return {wonData, lostData, labels};

}

export const getBubbleData = (data: StandingsInterface) => {

    const pointsGoals: {x: number, y: number, r: number}[] = []
    data.response[0].league?.standings![0].forEach( (standing) => {
        pointsGoals.push({
            x: standing.points,
            y: standing.all.goals.for!,
            r: standing.all.played
        });
    });
    

    return pointsGoals;

}