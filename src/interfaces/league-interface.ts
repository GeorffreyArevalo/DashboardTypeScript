import { Standing } from ".";
import { Name } from "../enums";

export interface League {
    id?:        number;
    name?:      Name;
    country?:   string;
    logo?:      string;
    flag?:      string;
    season?:    number;
    standings?: Array<Standing[]>;
}