import { Command } from './Command';
import { CommandGroup } from './CommandGroup';
import { commandRegistry } from './CommandRegistry';

const INPUT_ELEMENT_TYPES: any = [HTMLInputElement, HTMLTextAreaElement, HTMLSelectElement];

export class UI {
  private menuElement: HTMLDivElement;
  private inputElement: HTMLInputElement;
  private groupsUlElement: HTMLUListElement;
  private escapeEventListener: string;
  private inputSubscribers: Array<Function> = [];
  private openSubscribers: Array<Function> = [];
  private runSubscribers: Array<Function> = [];
  private selectSubscribers: Array<Function> = [];

  constructor() {
    this.menuElement = UI.createMenuElement();
    this.inputElement = UI.createInputElement();
    this.groupsUlElement = UI.createGroupsUlElement();
    this.menuElement.appendChild(this.inputElement);
    const resultsDiv = document.createElement('div');
    resultsDiv.classList.add('darkflex__results');
    resultsDiv.appendChild(this.groupsUlElement);
    this.menuElement.appendChild(resultsDiv);
    document.body.appendChild(this.menuElement);

    let oldValue;
    this.inputElement.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this.emitRun();
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

      setTimeout(() => {
        const newValue = this.inputElement.value;
        if (newValue !== oldValue) {
          oldValue = newValue;
          for (const subscriber of this.inputSubscribers) {
            subscriber(newValue);
          }
        }
      }, 0);
    });
  }

  private static createMenuElement() {
    const div = document.createElement('div');
    div.classList.add('darkflex');
    div.tabIndex = 1;
    return div;
  }

  private static createInputElement() {
    const input = document.createElement('input');
    input.classList.add('darkflex__input');
    return input;
  }

  private static createGroupsUlElement() {
    const ul = document.createElement('ul');
    ul.classList.add('darkflex__groups');
    return ul;
  }

  private static createGroupLiElement(group: CommandGroup) {
    const li = document.createElement('li');
    li.classList.add('darkflex__group');
    li.innerHTML = `<span class="darkflex__group-title">${group.title}</span>`;
    return li;
  }

  private static createResultsUlElement() {
    const ul = document.createElement('ul');
    ul.classList.add('darkflex__commands');
    return ul;
  }

  private static createResultLiElement(command: Command) {
    const li = document.createElement('li');
    li.classList.add('darkflex__command');
    li.innerHTML = `<span class="darkflex__command-title">${command.title}</span>`;
    return li;
  }

  setGroups(groups: Array<CommandGroup>) {
    this.removeAllGroups();

    for (const group of groups) {
      this.addGroup(group);
    }
  }

  addGroup(group: CommandGroup) {
    const groupLi = UI.createGroupLiElement(group);
    const resultsUl = UI.createResultsUlElement();

    for (const command of group.filteredCommands) {
      const resultLi = UI.createResultLiElement(command);
      command.element = resultLi;
      resultLi.addEventListener('click', () => this.emitRun());
      resultLi.addEventListener('mouseover', event => {
        for (const subscriber of this.selectSubscribers) {
          subscriber(command);
        }
      });
      resultsUl.appendChild(resultLi);
    }

    groupLi.appendChild(resultsUl);
    this.groupsUlElement.appendChild(groupLi);
  }

  removeAllGroups() {
    this.groupsUlElement.innerHTML = '';
  }

  openMenu() {
    this.menuElement.classList.add('darkflex--open');
    document.addEventListener('keydown', this.onKeydown.bind(this));

    for (const subscriber of this.openSubscribers) {
      subscriber();
    }

    setTimeout(() => this.inputElement.focus(), 0);
  }

  closeMenu() {
    this.menuElement.classList.remove('darkflex--open');
    this.inputElement.value = '';
    document.removeEventListener('keydown', this.onKeydown);
  }

  openMenuIfNoActiveInputs() {
    if (document.activeElement === document.body) {
      return this.openMenu();
    }

    const activeElementIsInputType = !!INPUT_ELEMENT_TYPES.find(inputType => document.activeElement instanceof inputType);

    if (!activeElementIsInputType) {
      return this.openMenu();
    }
  }

  selectCommand(command: Command) {
    command.element.classList.add('darkflex__command--selected');
  }

  deselectCommand(command: Command) {
    command.element.classList.remove('darkflex__command--selected');
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  onInput(subscriber: Function) {
    this.inputSubscribers.push(subscriber);
  }

  onOpen(subscriber: Function) {
    this.openSubscribers.push(subscriber);
  }

  onSelect(subscriber: Function) {
    this.selectSubscribers.push(subscriber);
  }

  onRun(subscriber: Function) {
    this.runSubscribers.push(subscriber);
  }

  emitRun() {
    for (const subscriber of this.runSubscribers) {
      subscriber();
    }
  }

  dotEventListener(event: KeyboardEvent) {
    if (event.key === '.') {
      this.openMenuIfNoActiveInputs();
    }
  }
}

export const ui = new UI();
