define(["require", "exports", "./UI"], function (require, exports, UI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandRegistry = /** @class */ (function () {
        function CommandRegistry() {
            this.commandGroups = [];
            this.maxResultsPerGroup = 10;
        }
        CommandRegistry.prototype.registerCommandGroup = function (commandGroup) {
            this.commandGroups.push(commandGroup);
        };
        CommandRegistry.prototype.unregisterCommandGroup = function (commandGroup) {
            this.commandGroups = this.commandGroups.filter(function (group) { return group !== commandGroup; });
        };
        CommandRegistry.prototype.setFilter = function (filter) {
            for (var _i = 0, _a = this.commandGroups; _i < _a.length; _i++) {
                var commandGroup = _a[_i];
                commandGroup.setFilter(filter);
            }
            UI_1.ui.setGroups(this.filteredCommandGroups);
        };
        CommandRegistry.prototype.useDotEventListener = function () {
            var _this = this;
            document.addEventListener('keydown', function (event) { return UI_1.ui.dotEventListener(event); });
            UI_1.ui.onOpen(function () {
                if (_this.filteredCommands.length === 0) {
                    return;
                }
                UI_1.ui.setGroups(_this.filteredCommandGroups);
                var command = _this.filteredCommands[0];
                _this.selectCommand(command);
            });
            UI_1.ui.onInput(function (input) {
                _this.setFilter(input);
                var command = _this.filteredCommands[0];
                _this.selectCommand(command);
            });
            UI_1.ui.onRun(function () {
                if (_this.selectedCommand) {
                    _this.selectedCommand.run();
                }
            });
            UI_1.ui.onSelect(function (command) {
                _this.selectCommand(command);
            });
        };
        CommandRegistry.prototype.selectCommand = function (command) {
            if (this.selectedCommand) {
                this.deselectCommand(this.selectedCommand);
            }
            this.selectedCommand = command;
            if (!command) {
                return;
            }
            if (command.onSelect) {
                command.onSelect();
            }
            UI_1.ui.selectCommand(command);
        };
        CommandRegistry.prototype.deselectCommand = function (command) {
            if (!command) {
                return;
            }
            if (command.onDeselect) {
                command.onDeselect();
            }
            UI_1.ui.deselectCommand(command);
        };
        CommandRegistry.prototype.selectNextFilteredCommand = function () {
            var index = this.filteredCommands.indexOf(this.selectedCommand) + 1;
            if (index >= this.filteredCommands.length) {
                index = 0;
            }
            this.selectCommand(this.filteredCommands[index]);
        };
        CommandRegistry.prototype.selectPrevFilteredCommand = function () {
            var index = this.filteredCommands.indexOf(this.selectedCommand) - 1;
            if (index < 0) {
                index = this.filteredCommands.length - 1;
            }
            this.selectCommand(this.filteredCommands[index]);
        };
        Object.defineProperty(CommandRegistry.prototype, "availableCommandGroups", {
            get: function () {
                return this.commandGroups
                    .filter(function (commandGroup) { return commandGroup.isAvailable(); })
                    .sort(function (a, b) { return b.weight - a.weight; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandRegistry.prototype, "filteredCommands", {
            get: function () {
                return this.filteredCommandGroups.reduce(function (commands, group) { return commands.concat(group.filteredCommands); }, []);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommandRegistry.prototype, "filteredCommandGroups", {
            get: function () {
                return this.availableCommandGroups
                    .filter(function (commandGroup) { return commandGroup.filteredCommands.length > 0; });
            },
            enumerable: true,
            configurable: true
        });
        return CommandRegistry;
    }());
    exports.CommandRegistry = CommandRegistry;
    exports.commandRegistry = new CommandRegistry();
});
