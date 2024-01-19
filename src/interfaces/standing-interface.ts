import { All, Team } from ".";
import { Name, Status } from "../enums";

export interface Standing {
    rank:        number;
    team:        Team;
    points:      number;
    goalsDiff:   number;
    group:       Name;
    form:        string;
    status:      Status;
    description: null | string;
    all:         All;
    home:        All;
    away:        All;
    update:      string;
}