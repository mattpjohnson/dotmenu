export interface ICommand {
    title: string;
    description?: string;
    run(): void;
    onSelect?(): void;
    onDeselect?(): void;
}
export declare class Command implements ICommand {
    title: string;
    description: string;
    element?: HTMLElement;
    onSelect?(): void;
    onDeselect?(): void;
    private _run?();
    constructor({title, description, run, onSelect, onDeselect}: ICommand);
    run(): void;
    isAvailable(): boolean;
    matches(input: string): 10 | 5 | 0;
}
