import { Cards, Dribbles, Duels, Fouls, Games, Goals, League, Passes, Penalty, Shots, Substitutes, Tackles, Team } from ".";

export interface Statistic {
    team:        Team;
    league:      League;
    games:       Games;
    substitutes: Substitutes;
    shots:       Shots;
    goals:       Goals;
    passes:      Passes;
    tackles:     Tackles;
    duels:       Duels;
    dribbles:    Dribbles;
    fouls:       Fouls;
    cards:       Cards;
    penalty:     Penalty;
}