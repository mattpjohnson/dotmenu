import * as Command from './Command';
import * as CommandGroup from './CommandGroup';
import * as CommandRegistry from './CommandRegistry';
import * as DOMEventsCommand from './DOMEventsCommand';
import * as DOMEventsStep from './DOMEventsStep';
import * as UI from './UI';
export declare const dotmenu: {
    UI: typeof UI.UI;
    ui: UI.UI;
    DOMEventStep: typeof DOMEventsStep.DOMEventStep;
    DOMEventsCommand: typeof DOMEventsCommand.DOMEventsCommand;
    CommandRegistry: typeof CommandRegistry.CommandRegistry;
    commandRegistry: CommandRegistry.CommandRegistry;
    CommandGroup: typeof CommandGroup.CommandGroup;
    Command: typeof Command.Command;
};
