import { Command } from './Command';
import { DOMEventStep } from './DOMEventsStep';
export interface Props {
    title: string;
    description?: string;
    domEventSteps?: Array<DOMEventStep>;
}
export declare class DOMEventsCommand extends Command {
    private domEventSteps;
    constructor({ title, description, domEventSteps }: Props);
    registerDOMEventStep(step: DOMEventStep): void;
    run(): void;
    onSelect(): void;
    onDeselect(): void;
    static createClickEventCommand({ title, description, element, }: {
        title: string;
        description?: string;
        element: Element | string;
    }): DOMEventsCommand;
}
