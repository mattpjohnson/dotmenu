define(["require", "exports", "./Command", "./CommandRegistry"], function (require, exports, Command_1, CommandRegistry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandGroup = /** @class */ (function () {
        function CommandGroup(_a) {
            var title = _a.title, _b = _a.weight, weight = _b === void 0 ? 0 : _b, _c = _a.isAvailable, isAvailable = _c === void 0 ? undefined : _c;
            this.commands = [];
            this.filter = '';
            this.title = title;
            this.weight = weight;
            this.isAvailable = isAvailable || this.isAvailable;
        }
        CommandGroup.prototype.setFilter = function (filter) {
            this.filter = filter;
        };
        CommandGroup.prototype.isAvailable = function () {
            return this.availableCommands.length > 0;
        };
        CommandGroup.prototype.isAvailableInContext = function () {
            return true;
        };
        CommandGroup.prototype.registerCommand = function (command) {
            if (!(command instanceof Command_1.Command)) {
                command = new Command_1.Command(command);
            }
            this.commands.push(command);
        };
        Object.defineProperty(CommandGroup.prototype, "availableCommands", {
            get: function () {
                return this.commands.filter(function (command) { return command.isAvailable(); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandGroup.prototype, "filteredCommands", {
            get: function () {
                var _this = this;
                return this.availableCommands
                    .filter(function (command) { return command.matches(_this.filter); })
                    .slice(0, CommandRegistry_1.commandRegistry.maxResultsPerGroup);
            },
            enumerable: true,
            configurable: true
        });
        return CommandGroup;
    }());
    exports.CommandGroup = CommandGroup;
});
