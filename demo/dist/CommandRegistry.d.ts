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
    runSelectedCommand(): void;
    selectCommand(command: Command): void;
    deselectCommand(command: Command): void;
    selectNextFilteredCommand(): void;
    selectPrevFilteredCommand(): void;
    private get availableCommandGroups();
    private get filteredCommands();
    get filteredCommandGroups(): CommandGroup[];
}
export declare const commandRegistry: CommandRegistry;
