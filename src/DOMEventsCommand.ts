import { Command, ICommand } from './Command';

export class DOMEventStep {
    element: Element;
    event: string;

    constructor({ element, event  }: { element: Element | string, event: string }) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        this.element = element;
        this.event = event;
    }

    run() {
        const event = new Event(this.event);
        this.element.dispatchEvent(event);
    }

    addFocus() {
        this.element.classList.add('darkflex__focused-event-target');
    }

    removeFocus() {
        this.element.classList.remove('darkflex__focused-event-target');
    }
}

export function createClickEventStep(element: Element | string) {
    return new DOMEventStep({ element, event: 'click' });
}

export interface Props {
    title: string;
    description?: string;
    domEventSteps?: Array<DOMEventStep>;
}

export class DOMEventsCommand extends Command {
    private domEventSteps: Array<DOMEventStep> = [];

    constructor({ title, description, domEventSteps }: Props) {
        super({
            title,
            description,
            run: () => undefined,
        });

        if (domEventSteps) {
            this.domEventSteps = [...this.domEventSteps, ...domEventSteps];
        }
    }

    registerDOMEventStep(step: DOMEventStep) {
        this.domEventSteps.push(step);
    }

    run() {
        for (const step of this.domEventSteps) {
            step.run();
        }
    }

    onSelect() {
        for (const step of this.domEventSteps) {
            step.addFocus();
        }
    }

    onDeselect() {
        for (const step of this.domEventSteps) {
            step.removeFocus();
        }
    }
}

export function createClickEventCommand({ title, description, element }: { title: string, description?: string, element: Element | string }) {
    const command = new DOMEventsCommand({ title, description });
    command.registerDOMEventStep(createClickEventStep(element));
    return command;
}
