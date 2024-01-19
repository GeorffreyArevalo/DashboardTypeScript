import { getCurrentSeason } from '../helpers';
import { StandingsInterface, TopScorerInterface } from '../interfaces';

export const getInfoSeason = async(): Promise<StandingsInterface> => {
    
    const {VITE_API_KEY, VITE_URL_BASE, VITE_API_HOST} = import.meta.env;
    
    const year = getCurrentSeason();

    try{
        const headers: HeadersInit = new Headers();
        headers.set('x-rapidapi-key', VITE_API_KEY);
        headers.set('x-rapidapi-host', VITE_API_HOST);

        const resp = await  fetch(`${VITE_URL_BASE}/standings?season=${year}&league=39`, {
            method: 'GET',
            headers: headers
        });
        
        const json: StandingsInterface = await resp.json();

        return json;
    }catch(error){
        console.log(error);
        
        throw new Error('Error to load standings.');
    }
}

export const getTopScorer = async(): Promise<TopScorerInterface> => {

    const {VITE_API_KEY, VITE_URL_BASE, VITE_API_HOST} = import.meta.env;
    const year = getCurrentSeason();
    try {

        const headers: HeadersInit = new Headers();
        headers.set('x-rapidapi-key', VITE_API_KEY);
        headers.set('x-rapidapi-host', VITE_API_HOST);

        const resp = await fetch(`${VITE_URL_BASE}/players/topscorers?season=${year}&league=39`, {
            method: 'GET',
            headers,
        });


        const json: TopScorerInterface = await resp.json();
        return json;
    } catch (error) {
        throw new Error('Error to load top scorer.');
    }
}

