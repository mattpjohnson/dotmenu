import { Command, ICommand } from './Command';
import { commandRegistry } from './CommandRegistry';

export class CommandGroup {
  protected commands: Array<Command> = [];
  private filter = '';
  title: string;
  weight: number;

  constructor({ title, weight = 0, isAvailable = undefined }) {
    this.title = title;
    this.weight = weight;

    this.isAvailable = isAvailable || this.isAvailable;
  }

  setFilter(filter: string) {
    this.filter = filter;
  }

  isAvailable() {
    return this.availableCommands.length > 0;
  }

  isAvailableInContext() {
    return true;
  }

  registerCommand(command: ICommand) {
    if (!(command instanceof Command)) {
      command = new Command(command);
    }

    this.commands.push(command as Command);
  }

  private get availableCommands() {
    return this.commands.filter(command => command.isAvailable());
  }

  get filteredCommands() {
    return this.availableCommands
      .filter(command => command.matches(this.filter))
      .slice(0, commandRegistry.maxResultsPerGroup);
  }
}
