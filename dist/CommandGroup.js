import { Command } from './Command';
import { commandRegistry } from './CommandRegistry';
var CommandGroup = (function () {
    function CommandGroup(_a) {
        var _b = _a.title, title = _b === void 0 ? '' : _b, _c = _a.weight, weight = _c === void 0 ? 0 : _c, _d = _a.isAvailable, isAvailable = _d === void 0 ? undefined : _d;
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
        if (!(command instanceof Command)) {
            command = new Command(command);
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
                .slice(0, commandRegistry.maxResultsPerGroup);
        },
        enumerable: true,
        configurable: true
    });
    return CommandGroup;
}());
export { CommandGroup };
//# sourceMappingURL=CommandGroup.js.map