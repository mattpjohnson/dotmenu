export declare class DOMEventStep {
    element: Element;
    event: string;
    constructor({ element, event, }: {
        element: Element | string;
        event: string;
    });
    getElementForSelector(selector: string): Element;
    run(): void;
    addFocus(): void;
    removeFocus(): void;
    static createClickEventStep(element: Element | string): DOMEventStep;
}
