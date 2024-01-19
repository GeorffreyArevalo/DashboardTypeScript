import { Position } from "../enums";

export interface Games {
    appearences: number;
    lineups:     number;
    minutes:     number;
    number:      null;
    position:    Position;
    rating:      string;
    captain:     boolean;
}