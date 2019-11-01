import { Command, ICommand } from './Command';
import { CommandRegistry } from './CommandRegistry';
export declare class CommandGroup {
    private commandRegistry?;
    protected commands: Array<Command>;
    private filter;
    title: string;
    weight: number;
    constructor({ title, weight, isAvailable }: {
        title?: string | undefined;
        weight?: number | undefined;
        isAvailable?: undefined;
    });
    setCommandRegistry(commandRegistry: CommandRegistry): void;
    setFilter(filter: string): void;
    isAvailable(): boolean;
    isAvailableInContext(): boolean;
    registerCommand(command: ICommand): void;
    private readonly availableCommands;
    readonly filteredCommands: Command[];
}
