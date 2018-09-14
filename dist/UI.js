import { commandRegistry } from './CommandRegistry';
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
export { UI };
export var ui = new UI();
//# sourceMappingURL=UI.js.map