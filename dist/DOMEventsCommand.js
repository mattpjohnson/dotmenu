var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Command } from './Command';
import { DOMEventStep } from './DOMEventsStep';
var DOMEventsCommand = (function (_super) {
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
            _this.domEventSteps = __spreadArrays(_this.domEventSteps, domEventSteps);
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
    DOMEventsCommand.createClickEventCommand = function (_a) {
        var title = _a.title, description = _a.description, element = _a.element;
        var command = new DOMEventsCommand({ title: title, description: description });
        command.registerDOMEventStep(DOMEventStep.createClickEventStep(element));
        return command;
    };
    return DOMEventsCommand;
}(Command));
export { DOMEventsCommand };
//# sourceMappingURL=DOMEventsCommand.js.map