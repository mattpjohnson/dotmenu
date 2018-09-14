(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.dotmenu = {})));
}(this, (function (exports) { 'use strict';

    var Command = (function () {
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
            var inputRegex = input
                .toLowerCase()
                .split('')
                .join('.*');
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

    var INPUT_ELEMENT_TYPES = [
        HTMLInputElement.prototype,
        HTMLTextAreaElement.prototype,
        HTMLSelectElement.prototype,
    ];
    var UI = (function () {
        function UI() {
            var _this = this;
            this.inputSubscribers = [];
            this.openSubscribers = [];
            this.runSubscribers = [];
            this.selectSubscribers = [];
            this.onDocumentClick = this.onDocumentClick.bind(this);
            this.onKeydown = this.onKeydown.bind(this);
            this.menuElement = UI.createMenuElement();
            this.inputElement = UI.createInputElement();
            this.groupsUlElement = UI.createGroupsUlElement();
            this.menuElement.appendChild(this.inputElement);
            var resultsDiv = document.createElement('div');
            resultsDiv.classList.add('dotmenu__results');
            resultsDiv.appendChild(this.groupsUlElement);
            this.menuElement.appendChild(resultsDiv);
            document.body.appendChild(this.menuElement);
            var oldValue;
            this.inputElement.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    _this.emitRun();
                    return;
                }
                if (event.key === 'ArrowUp') {
                    commandRegistry.selectPrevFilteredCommand();
                    return;
                }
                if (event.key === 'ArrowDown') {
                    commandRegistry.selectNextFilteredCommand();
                    return;
                }
                setTimeout(function () {
                    var newValue = _this.inputElement.value;
                    if (newValue !== oldValue) {
                        oldValue = newValue;
                        for (var _i = 0, _a = _this.inputSubscribers; _i < _a.length; _i++) {
                            var subscriber = _a[_i];
                            subscriber(newValue);
                        }
                    }
                }, 0);
            });
        }
        UI.createMenuElement = function () {
            var div = document.createElement('div');
            div.classList.add('dotmenu');
            div.tabIndex = -1;
            return div;
        };
        UI.createInputElement = function () {
            var input = document.createElement('input');
            input.classList.add('dotmenu__input');
            return input;
        };
        UI.createGroupsUlElement = function () {
            var ul = document.createElement('ul');
            ul.classList.add('dotmenu__groups');
            return ul;
        };
        UI.createGroupLiElement = function (group) {
            var li = document.createElement('li');
            li.classList.add('dotmenu__group');
            li.innerHTML = "<span class=\"dotmenu__group-title\">" + group.title + "</span>";
            return li;
        };
        UI.createResultsUlElement = function () {
            var ul = document.createElement('ul');
            ul.classList.add('dotmenu__commands');
            return ul;
        };
        UI.createResultLiElement = function (command) {
            var li = document.createElement('li');
            li.classList.add('dotmenu__command');
            li.innerHTML = "<span class=\"dotmenu__command-title\">" + command.title + "</span>";
            return li;
        };
        UI.prototype.setGroups = function (groups) {
            this.removeAllGroups();
            for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
                var group = groups_1[_i];
                this.addGroup(group);
            }
        };
        UI.prototype.addGroup = function (group) {
            var _this = this;
            var groupLi = UI.createGroupLiElement(group);
            var resultsUl = UI.createResultsUlElement();
            var _loop_1 = function (command) {
                var resultLi = UI.createResultLiElement(command);
                command.element = resultLi;
                resultLi.addEventListener('click', function () { return _this.emitRun(); });
                resultLi.addEventListener('mouseover', function (event) {
                    for (var _i = 0, _a = _this.selectSubscribers; _i < _a.length; _i++) {
                        var subscriber = _a[_i];
                        subscriber(command);
                    }
                });
                resultsUl.appendChild(resultLi);
            };
            for (var _i = 0, _a = group.filteredCommands; _i < _a.length; _i++) {
                var command = _a[_i];
                _loop_1(command);
            }
            groupLi.appendChild(resultsUl);
            this.groupsUlElement.appendChild(groupLi);
        };
        UI.prototype.removeAllGroups = function () {
            this.groupsUlElement.innerHTML = '';
        };
        UI.prototype.openMenu = function () {
            var _this = this;
            this.menuElement.classList.add('dotmenu--open');
            document.addEventListener('click', this.onDocumentClick);
            document.addEventListener('keydown', this.onKeydown);
            for (var _i = 0, _a = this.openSubscribers; _i < _a.length; _i++) {
                var subscriber = _a[_i];
                subscriber();
            }
            setTimeout(function () { return _this.inputElement.focus(); }, 0);
        };
        UI.prototype.closeMenu = function () {
            this.menuElement.classList.remove('dotmenu--open');
            this.inputElement.value = '';
            document.removeEventListener('keydown', this.onKeydown);
            document.removeEventListener('blur', this.onDocumentClick);
        };
        UI.prototype.openMenuIfNoActiveInputs = function () {
            if (document.activeElement === document.body) {
                return this.openMenu();
            }
            var activeElementIsInputType = !!INPUT_ELEMENT_TYPES.find(function (inputType) { return document.activeElement instanceof inputType; });
            if (!activeElementIsInputType) {
                return this.openMenu();
            }
        };
        UI.prototype.selectCommand = function (command) {
            if (command.element) {
                command.element.classList.add('dotmenu__command--selected');
            }
        };
        UI.prototype.deselectCommand = function (command) {
            if (command.element) {
                command.element.classList.remove('dotmenu__command--selected');
            }
        };
        UI.prototype.onDocumentClick = function (event) {
            if (!this.menuElement.contains(event.target)) {
                this.closeMenu();
            }
        };
        UI.prototype.onKeydown = function (event) {
            if (event.key === 'Escape') {
                this.closeMenu();
            }
        };
        UI.prototype.onInput = function (subscriber) {
            this.inputSubscribers.push(subscriber);
        };
        UI.prototype.onOpen = function (subscriber) {
            this.openSubscribers.push(subscriber);
        };
        UI.prototype.onSelect = function (subscriber) {
            this.selectSubscribers.push(subscriber);
        };
        UI.prototype.onRun = function (subscriber) {
            this.runSubscribers.push(subscriber);
        };
        UI.prototype.emitRun = function () {
            for (var _i = 0, _a = this.runSubscribers; _i < _a.length; _i++) {
                var subscriber = _a[_i];
                subscriber();
            }
            this.closeMenu();
        };
        UI.prototype.dotEventListener = function (event) {
            if (event.key === '.') {
                this.openMenuIfNoActiveInputs();
            }
        };
        return UI;
    }());
    var ui = new UI();

    var CommandRegistry = (function () {
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
            ui.setGroups(this.filteredCommandGroups);
        };
        CommandRegistry.prototype.useDotEventListener = function () {
            var _this = this;
            document.addEventListener('keydown', function (event) { return ui.dotEventListener(event); });
            ui.onOpen(function () {
                if (_this.filteredCommands.length === 0) {
                    return;
                }
                ui.setGroups(_this.filteredCommandGroups);
                var command = _this.filteredCommands[0];
                _this.selectCommand(command);
            });
            ui.onInput(function (input) {
                _this.setFilter(input);
                var command = _this.filteredCommands[0];
                _this.selectCommand(command);
            });
            ui.onRun(function () {
                if (_this.selectedCommand) {
                    _this.selectedCommand.run();
                }
            });
            ui.onSelect(function (command) {
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
            ui.selectCommand(command);
        };
        CommandRegistry.prototype.deselectCommand = function (command) {
            if (!command) {
                return;
            }
            if (command.onDeselect) {
                command.onDeselect();
            }
            ui.deselectCommand(command);
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
                return this.availableCommandGroups.filter(function (commandGroup) { return commandGroup.filteredCommands.length > 0; });
            },
            enumerable: true,
            configurable: true
        });
        return CommandRegistry;
    }());
    var commandRegistry = new CommandRegistry();

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

    var __extends = (undefined && undefined.__extends) || (function () {
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
        DOMEventsCommand.createClickEventCommand = function (_a) {
            var title = _a.title, description = _a.description, element = _a.element;
            var command = new DOMEventsCommand({ title: title, description: description });
            command.registerDOMEventStep(DOMEventStep.createClickEventStep(element));
            return command;
        };
        return DOMEventsCommand;
    }(Command));

    exports.Command = Command;
    exports.CommandGroup = CommandGroup;
    exports.CommandRegistry = CommandRegistry;
    exports.commandRegistry = commandRegistry;
    exports.DOMEventsCommand = DOMEventsCommand;
    exports.DOMEventStep = DOMEventStep;
    exports.UI = UI;
    exports.ui = ui;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dotmenu.umd.js.map
