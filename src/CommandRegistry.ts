import { Command } from './Command'
import { CommandGroup } from './CommandGroup'
import { ui } from './UI'

export class CommandRegistry {
  private commandGroups: Array<CommandGroup> = []
  private selectedCommand: Command
  maxResultsPerGroup = 10

  registerCommandGroup(commandGroup: CommandGroup) {
    this.commandGroups.push(commandGroup)
  }

  unregisterCommandGroup(commandGroup: CommandGroup) {
    this.commandGroups = this.commandGroups.filter(
      group => group !== commandGroup
    )
  }

  setFilter(filter: string) {
    for (const commandGroup of this.commandGroups) {
      commandGroup.setFilter(filter)
    }
    ui.setGroups(this.filteredCommandGroups)
  }

  useDotEventListener() {
    document.addEventListener('keydown', event => ui.dotEventListener(event))
    ui.onOpen(() => {
      if (this.filteredCommands.length === 0) {
        return
      }

      ui.setGroups(this.filteredCommandGroups)

      const command = this.filteredCommands[0]
      this.selectCommand(command)
    })

    ui.onInput((input: string) => {
      this.setFilter(input)
      const command = this.filteredCommands[0]
      this.selectCommand(command)
    })

    ui.onRun(() => {
      if (this.selectedCommand) {
        this.selectedCommand.run()
      }
    })

    ui.onSelect((command: Command) => {
      this.selectCommand(command)
    })
  }

  selectCommand(command: Command) {
    if (this.selectedCommand) {
      this.deselectCommand(this.selectedCommand)
    }

    this.selectedCommand = command

    if (!command) {
      return
    }

    if (command.onSelect) {
      command.onSelect()
    }

    ui.selectCommand(command)
  }

  deselectCommand(command: Command) {
    if (!command) {
      return
    }

    if (command.onDeselect) {
      command.onDeselect()
    }

    ui.deselectCommand(command)
  }

  selectNextFilteredCommand() {
    let index = this.filteredCommands.indexOf(this.selectedCommand) + 1
    if (index >= this.filteredCommands.length) {
      index = 0
    }
    this.selectCommand(this.filteredCommands[index])
  }

  selectPrevFilteredCommand() {
    let index = this.filteredCommands.indexOf(this.selectedCommand) - 1
    if (index < 0) {
      index = this.filteredCommands.length - 1
    }
    this.selectCommand(this.filteredCommands[index])
  }

  private get availableCommandGroups() {
    return this.commandGroups
      .filter(commandGroup => commandGroup.isAvailable())
      .sort((a, b) => b.weight - a.weight)
  }

  private get filteredCommands() {
    return this.filteredCommandGroups.reduce(
      (commands, group) => commands.concat(group.filteredCommands),
      [] as Array<Command>
    )
  }

  get filteredCommandGroups() {
    return this.availableCommandGroups.filter(
      commandGroup => commandGroup.filteredCommands.length > 0
    )
  }
}

export const commandRegistry = new CommandRegistry()
