define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Command = /** @class */ (function () {
        function Command(_a) {
            var title = _a.title, _b = _a.description, description = _b === void 0 ? '' : _b, run = _a.run, onSelect = _a.onSelect, onDeselect = _a.onDeselect;
            this.title = title;
            this.description = description;
            this._run = run;
            this.onSelect = onSelect;
            this.onDeselect = onDeselect;
        }
        Command.prototype.run = function () {
            if (typeof this._run === 'function') {
                this._run();
            }
            else {
                throw new Error('No run method provided.');
            }
        };
        Command.prototype.isAvailable = function () {
            return true;
        };
        Command.prototype.matches = function (input) {
            var title = this.title.toLowerCase();
            var description = this.description.toLowerCase();
            var inputRegex = input.toLowerCase().split('').join('.*');
            if (new RegExp(inputRegex).test(title)) {
                return 10;
            }
            if (new RegExp(inputRegex).test(description)) {
                return 5;
            }
            return 0;
        };
        return Command;
    }());
    exports.Command = Command;
});
