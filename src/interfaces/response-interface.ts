import { League, Player, Statistic } from ".";

export interface ResponseInterface {
    league?: League;
    player?:     Player;
    statistics?: Statistic[];
}