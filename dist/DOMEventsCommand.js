var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Command"], function (require, exports, Command_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DOMEventStep = /** @class */ (function () {
        function DOMEventStep(_a) {
            var element = _a.element, event = _a.event;
            if (typeof element === 'string') {
                element = document.querySelector(element);
            }
            this.element = element;
            this.event = event;
        }
        DOMEventStep.prototype.run = function () {
            var event = new Event(this.event);
            this.element.dispatchEvent(event);
        };
        DOMEventStep.prototype.addFocus = function () {
            this.element.classList.add('darkflex__focused-event-target');
        };
        DOMEventStep.prototype.removeFocus = function () {
            this.element.classList.remove('darkflex__focused-event-target');
        };
        return DOMEventStep;
    }());
    exports.DOMEventStep = DOMEventStep;
    function createClickEventStep(element) {
        return new DOMEventStep({ element: element, event: 'click' });
    }
    exports.createClickEventStep = createClickEventStep;
    var DOMEventsCommand = /** @class */ (function (_super) {
        __extends(DOMEventsCommand, _super);
        function DOMEventsCommand(_a) {
            var title = _a.title, description = _a.description, domEventSteps = _a.domEventSteps;
            var _this = _super.call(this, {
                title: title,
                description: description,
                run: function () { return undefined; },
            }) || this;
            _this.domEventSteps = [];
            if (domEventSteps) {
                _this.domEventSteps = _this.domEventSteps.concat(domEventSteps);
            }
            return _this;
        }
        DOMEventsCommand.prototype.registerDOMEventStep = function (step) {
            this.domEventSteps.push(step);
        };
        DOMEventsCommand.prototype.run = function () {
            for (var _i = 0, _a = this.domEventSteps; _i < _a.length; _i++) {
                var step = _a[_i];
                step.run();
            }
        };
        DOMEventsCommand.prototype.onSelect = function () {
            for (var _i = 0, _a = this.domEventSteps; _i < _a.length; _i++) {
                var step = _a[_i];
                step.addFocus();
            }
        };
        DOMEventsCommand.prototype.onDeselect = function () {
            for (var _i = 0, _a = this.domEventSteps; _i < _a.length; _i++) {
                var step = _a[_i];
                step.removeFocus();
            }
        };
        return DOMEventsCommand;
    }(Command_1.Command));
    exports.DOMEventsCommand = DOMEventsCommand;
    function createClickEventCommand(_a) {
        var title = _a.title, description = _a.description, element = _a.element;
        var command = new DOMEventsCommand({ title: title, description: description });
        command.registerDOMEventStep(createClickEventStep(element));
        return command;
    }
    exports.createClickEventCommand = createClickEventCommand;
});
