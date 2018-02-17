import { Command } from './Command';
export declare class DOMEventStep {
    element: Element;
    event: string;
    constructor({element, event}: {
        element: Element | string;
        event: string;
    });
    run(): void;
    addFocus(): void;
    removeFocus(): void;
}
export declare function createClickEventStep(element: Element | string): DOMEventStep;
export interface Props {
    title: string;
    description?: string;
    domEventSteps?: Array<DOMEventStep>;
}
export declare class DOMEventsCommand extends Command {
    private domEventSteps;
    constructor({title, description, domEventSteps}: Props);
    registerDOMEventStep(step: DOMEventStep): void;
    run(): void;
    onSelect(): void;
    onDeselect(): void;
}
export declare function createClickEventCommand({title, description, element}: {
    title: string;
    description?: string;
    element: Element | string;
}): DOMEventsCommand;
