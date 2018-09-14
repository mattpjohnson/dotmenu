import { Command } from './Command'
import { CommandGroup } from './CommandGroup'
import { commandRegistry } from './CommandRegistry'

const INPUT_ELEMENT_TYPES: any = [
  HTMLInputElement.prototype,
  HTMLTextAreaElement.prototype,
  HTMLSelectElement.prototype,
]

export class UI {
  private menuElement: HTMLDivElement
  private inputElement: HTMLInputElement
  private groupsUlElement: HTMLUListElement
  private escapeEventListener: string
  private inputSubscribers: Array<Function> = []
  private openSubscribers: Array<Function> = []
  private runSubscribers: Array<Function> = []
  private selectSubscribers: Array<Function> = []

  constructor() {
    this.onDocumentClick = this.onDocumentClick.bind(this)
    this.onKeydown = this.onKeydown.bind(this)

    this.menuElement = UI.createMenuElement()
    this.inputElement = UI.createInputElement()
    this.groupsUlElement = UI.createGroupsUlElement()
    this.menuElement.appendChild(this.inputElement)
    const resultsDiv = document.createElement('div')
    resultsDiv.classList.add('dotmenu__results')
    resultsDiv.appendChild(this.groupsUlElement)
    this.menuElement.appendChild(resultsDiv)
    document.body.appendChild(this.menuElement)

    let oldValue: string
    this.inputElement.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this.emitRun()
        return
      }
      if (event.key === 'ArrowUp') {
        commandRegistry.selectPrevFilteredCommand()
        return
      }
      if (event.key === 'ArrowDown') {
        commandRegistry.selectNextFilteredCommand()
        return
      }

      setTimeout(() => {
        const newValue = this.inputElement.value
        if (newValue !== oldValue) {
          oldValue = newValue
          for (const subscriber of this.inputSubscribers) {
            subscriber(newValue)
          }
        }
      }, 0)
    })
  }

  private static createMenuElement() {
    const div = document.createElement('div')
    div.classList.add('dotmenu')
    div.tabIndex = -1
    return div
  }

  private static createInputElement() {
    const input = document.createElement('input')
    input.classList.add('dotmenu__input')
    return input
  }

  private static createGroupsUlElement() {
    const ul = document.createElement('ul')
    ul.classList.add('dotmenu__groups')
    return ul
  }

  private static createGroupLiElement(group: CommandGroup) {
    const li = document.createElement('li')
    li.classList.add('dotmenu__group')
    li.innerHTML = `<span class="dotmenu__group-title">${group.title}</span>`
    return li
  }

  private static createResultsUlElement() {
    const ul = document.createElement('ul')
    ul.classList.add('dotmenu__commands')
    return ul
  }

  private static createResultLiElement(command: Command) {
    const li = document.createElement('li')
    li.classList.add('dotmenu__command')
    li.innerHTML = `<span class="dotmenu__command-title">${
      command.title
    }</span>`
    return li
  }

  setGroups(groups: Array<CommandGroup>) {
    this.removeAllGroups()

    for (const group of groups) {
      this.addGroup(group)
    }
  }

  addGroup(group: CommandGroup) {
    const groupLi = UI.createGroupLiElement(group)
    const resultsUl = UI.createResultsUlElement()

    for (const command of group.filteredCommands) {
      const resultLi = UI.createResultLiElement(command)
      command.element = resultLi
      resultLi.addEventListener('click', () => this.emitRun())
      resultLi.addEventListener('mouseover', event => {
        for (const subscriber of this.selectSubscribers) {
          subscriber(command)
        }
      })
      resultsUl.appendChild(resultLi)
    }

    groupLi.appendChild(resultsUl)
    this.groupsUlElement.appendChild(groupLi)
  }

  removeAllGroups() {
    this.groupsUlElement.innerHTML = ''
  }

  openMenu() {
    this.menuElement.classList.add('dotmenu--open')
    document.addEventListener('click', this.onDocumentClick)
    document.addEventListener('keydown', this.onKeydown)

    for (const subscriber of this.openSubscribers) {
      subscriber()
    }

    setTimeout(() => this.inputElement.focus(), 0)
  }

  closeMenu() {
    this.menuElement.classList.remove('dotmenu--open')
    this.inputElement.value = ''
    document.removeEventListener('keydown', this.onKeydown)
    document.removeEventListener('blur', this.onDocumentClick)
  }

  openMenuIfNoActiveInputs() {
    if (document.activeElement === document.body) {
      return this.openMenu()
    }

    const activeElementIsInputType = !!INPUT_ELEMENT_TYPES.find(
      (inputType: any) => document.activeElement instanceof inputType
    )

    if (!activeElementIsInputType) {
      return this.openMenu()
    }
  }

  selectCommand(command: Command) {
    if (command.element) {
      command.element.classList.add('dotmenu__command--selected')
    }
  }

  deselectCommand(command: Command) {
    if (command.element) {
      command.element.classList.remove('dotmenu__command--selected')
    }
  }

  onDocumentClick(event: MouseEvent) {
    if (!this.menuElement.contains(event.target as Node)) {
      this.closeMenu()
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeMenu()
    }
  }

  onInput(subscriber: Function) {
    this.inputSubscribers.push(subscriber)
  }

  onOpen(subscriber: Function) {
    this.openSubscribers.push(subscriber)
  }

  onSelect(subscriber: Function) {
    this.selectSubscribers.push(subscriber)
  }

  onRun(subscriber: Function) {
    this.runSubscribers.push(subscriber)
  }

  emitRun() {
    for (const subscriber of this.runSubscribers) {
      subscriber()
    }
    this.closeMenu()
  }

  dotEventListener(event: KeyboardEvent) {
    if (event.key === '.') {
      this.openMenuIfNoActiveInputs()
    }
  }
}

export const ui = new UI()
