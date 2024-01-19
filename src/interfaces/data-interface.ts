import { StandingsInterface, TopScorerInterface } from ".";

export interface DataStatistics {
    standingsCurrent?: StandingsInterface;
    topScorer?: TopScorerInterface;
    error?: string;
}
