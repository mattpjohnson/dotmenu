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
    static createClickEventStep(element: Element | string): DOMEventStep;
}
