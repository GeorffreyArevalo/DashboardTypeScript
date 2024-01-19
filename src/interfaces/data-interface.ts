import { StandingsInterface, TopScoreInterface } from ".";

export interface DataStatistics {
    standingsCurrent?: StandingsInterface;
    topScorer?: TopScoreInterface;
    error?: string;
}
