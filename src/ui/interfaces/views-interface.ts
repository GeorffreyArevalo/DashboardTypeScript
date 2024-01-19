import { App } from "../../models";

export interface ViewInterface {
    theme: string;
    loadInitView: (secondSection: HTMLElement, idClean: string) => void;
    app: App | null;
}
