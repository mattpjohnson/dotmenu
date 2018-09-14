var DOMEventStep = (function () {
    function DOMEventStep(_a) {
        var element = _a.element, event = _a.event;
        if (typeof element === 'string') {
            this.element = this.getElementForSelector(element);
        }
        else {
            this.element = element;
        }
        this.event = event;
    }
    DOMEventStep.prototype.getElementForSelector = function (selector) {
        var element = document.querySelector(selector);
        if (!element) {
            throw new Error("Couldn't find " + element + " in the document.");
        }
        return element;
    };
    DOMEventStep.prototype.run = function () {
        var event = new Event(this.event);
        this.element.dispatchEvent(event);
    };
    DOMEventStep.prototype.addFocus = function () {
        this.element.classList.add('dotmenu__focused-event-target');
    };
    DOMEventStep.prototype.removeFocus = function () {
        this.element.classList.remove('dotmenu__focused-event-target');
    };
    DOMEventStep.createClickEventStep = function (element) {
        return new DOMEventStep({ element: element, event: 'click' });
    };
    return DOMEventStep;
}());
export { DOMEventStep };
//# sourceMappingURL=DOMEventsStep.js.map