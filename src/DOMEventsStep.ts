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

    static createClickEventStep(element: Element | string) {
        return new DOMEventStep({ element, event: 'click' });
    }
}
