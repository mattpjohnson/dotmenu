import { commandRegistry } from './CommandRegistry';
import { CommandGroup } from './CommandGroup';
import { RecentCommandGroup } from './RecentCommandGroup';
import { DOMEventsCommand, createClickEventStep, createClickEventCommand } from './DOMEventsCommand';

commandRegistry.maxResultsPerGroup = 5;

const recent = new RecentCommandGroup({ title: 'Recent', weight: 10 });
commandRegistry.registerCommandGroup(recent);

const domGroup = new CommandGroup({ title: 'DOM Event commands', weight: 3 });
domGroup.registerCommand(new DOMEventsCommand({ title: 'Click the button', domEventSteps: [createClickEventStep('#click-this-button')] }));
domGroup.registerCommand(createClickEventCommand({ title: 'Click the button 2', element: '#click-this-button' }));
commandRegistry.registerCommandGroup(domGroup);

const exampleGroup1 = new CommandGroup({ title: 'Example group 1', weight: 2 });
exampleGroup1.registerCommand({ title: 'Action 1', run: () => console.log('Group 1, Action 1') });
exampleGroup1.registerCommand({ title: 'Action 2', run: () => console.log('Group 1, Action 2') });
commandRegistry.registerCommandGroup(exampleGroup1);

const exampleGroup2 = new CommandGroup({ title: 'Example group 2' });
exampleGroup2.registerCommand({ title: 'Action 1', run: () => console.log('Group 2, Action 1') });
exampleGroup2.registerCommand({ title: 'Action 2', run: () => console.log('Group 2, Action 2') });
exampleGroup2.registerCommand({ title: 'Action 3', run: () => console.log('Group 2, Action 3') });
exampleGroup2.registerCommand({ title: 'Action 4', run: () => console.log('Group 2, Action 4') });
exampleGroup2.registerCommand({ title: 'Action 5', run: () => console.log('Group 2, Action 5') });
exampleGroup2.registerCommand({ title: 'Action 6', run: () => console.log('Group 2, Action 6') });
exampleGroup2.registerCommand({ title: 'Action 7', run: () => console.log('Group 2, Action 7') });
commandRegistry.registerCommandGroup(exampleGroup2);

// This group will show at the top since it has a higher weight than the others.
const exampleGroup3 = new CommandGroup({ title: 'Example group 3', weight: 4 });
exampleGroup3.registerCommand({ title: 'Action 1', run: () => console.log('Group 3, Action 1') });
exampleGroup3.registerCommand({ title: 'Action 2', run: () => console.log('Group 3, Action 2') });
exampleGroup3.registerCommand({ title: 'Action 3', run: () => console.log('Group 3, Action 3') });
exampleGroup3.registerCommand({ title: 'Action 4', run: () => console.log('Group 3, Action 4') });
exampleGroup3.registerCommand({ title: 'Action 5', run: () => console.log('Group 3, Action 5') });
exampleGroup3.registerCommand({ title: 'Action 6', run: () => console.log('Group 3, Action 6') });
exampleGroup3.registerCommand({ title: 'Action 7', run: () => console.log('Group 3, Action 7') });
exampleGroup3.registerCommand({ title: 'Action 8', run: () => console.log('Group 3, Action 8') });
exampleGroup3.registerCommand({ title: 'Action 9', run: () => console.log('Group 3, Action 9') });
exampleGroup3.registerCommand({ title: 'Action 10', run: () => console.log('Group 3, Action 10') });
exampleGroup3.registerCommand({ title: 'Action 11', run: () => console.log('Group 3, Action 11') });
commandRegistry.registerCommandGroup(exampleGroup3);

commandRegistry.useDotEventListener();
