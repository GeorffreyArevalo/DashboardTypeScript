import { ViewInterface } from ".";
import { ViewType } from "../types";

export interface ItemMenu {
    id: ViewType;
    name: string;
    icon: string;
    viewInstance: ViewInterface;
}
