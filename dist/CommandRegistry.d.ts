import { Command } from './Command';
import { CommandGroup } from './CommandGroup';
export declare class CommandRegistry {
    private commandGroups;
    private selectedCommand;
    maxResultsPerGroup: number;
    registerCommandGroup(commandGroup: CommandGroup): void;
    unregisterCommandGroup(commandGroup: CommandGroup): void;
    setFilter(filter: string): void;
    useDotEventListener(): void;
    selectCommand(command: Command): void;
    deselectCommand(command: Command): void;
    selectNextFilteredCommand(): void;
    selectPrevFilteredCommand(): void;
    private readonly availableCommandGroups;
    private readonly filteredCommands;
    readonly filteredCommandGroups: CommandGroup[];
}
export declare const commandRegistry: CommandRegistry;
