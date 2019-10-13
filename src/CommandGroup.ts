import { Command, ICommand } from './Command'
import { CommandRegistry } from './CommandRegistry'

export class CommandGroup {
  private commandRegistry?: CommandRegistry
  protected commands: Array<Command> = []
  private filter = ''
  title: string
  weight: number

  constructor({ title = '', weight = 0, isAvailable = undefined }) {
    this.title = title
    this.weight = weight

    this.isAvailable = isAvailable || this.isAvailable
  }

  setCommandRegistry(commandRegistry: CommandRegistry) {
    this.commandRegistry = commandRegistry
  }

  setFilter(filter: string) {
    this.filter = filter
  }

  isAvailable() {
    return this.availableCommands.length > 0
  }

  isAvailableInContext() {
    return true
  }

  registerCommand(command: ICommand) {
    if (!(command instanceof Command)) {
      command = new Command(command)
    }

    this.commands.push(command as Command)
  }

  private get availableCommands() {
    return this.commands.filter(command => command.isAvailable())
  }

  get filteredCommands() {
    const maxResults = this.commandRegistry
      ? this.commandRegistry.maxResultsPerGroup
      : Number.MAX_SAFE_INTEGER
    return this.availableCommands
      .filter(command => command.matches(this.filter))
      .slice(0, maxResults)
  }
}
