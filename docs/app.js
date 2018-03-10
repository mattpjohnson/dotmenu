require.config({
    paths: {
        Darkflex: 'https://rawgit.com/mattpjohnson/darkflex/master/dist/darkflex.umd.min',
    }
});

require(['Darkflex'], function(Darkflex) {
    Darkflex.commandRegistry.maxResultsPerGroup = 5;

    const domGroup = new Darkflex.CommandGroup({ title: 'DOM Event commands', weight: 3 });
    domGroup.registerCommand(new Darkflex.DOMEventsCommand({ title: 'Click the button', domEventSteps: [Darkflex.DOMEventStep.createClickEventStep('#click-this-button')] }));
    domGroup.registerCommand(Darkflex.DOMEventsCommand.createClickEventCommand({ title: 'Click the button 2', element: '#click-this-button' }));
    Darkflex.commandRegistry.registerCommandGroup(domGroup);

    const exampleGroup1 = new Darkflex.CommandGroup({ title: 'Example group 1', weight: 2 });
    exampleGroup1.registerCommand({ title: 'Action 1', run: function() { console.log('Group 1, Action 1') }});
    exampleGroup1.registerCommand({ title: 'Action 2', run: function() { console.log('Group 1, Action 2') }});
    Darkflex.commandRegistry.registerCommandGroup(exampleGroup1);

    const exampleGroup2 = new Darkflex.CommandGroup({ title: 'Example group 2' });
    exampleGroup2.registerCommand({ title: 'Action 1', run: function() { console.log('Group 2, Action 1') }});
    exampleGroup2.registerCommand({ title: 'Action 2', run: function() { console.log('Group 2, Action 2') }});
    exampleGroup2.registerCommand({ title: 'Action 3', run: function() { console.log('Group 2, Action 3') }});
    exampleGroup2.registerCommand({ title: 'Action 4', run: function() { console.log('Group 2, Action 4') }});
    exampleGroup2.registerCommand({ title: 'Action 5', run: function() { console.log('Group 2, Action 5') }});
    exampleGroup2.registerCommand({ title: 'Action 6', run: function() { console.log('Group 2, Action 6') }});
    exampleGroup2.registerCommand({ title: 'Action 7', run: function() { console.log('Group 2, Action 7') }});
    Darkflex.commandRegistry.registerCommandGroup(exampleGroup2);

    // This group will show at the top since it has a higher weight than the others.
    const exampleGroup3 = new Darkflex.CommandGroup({ title: 'Example group 3', weight: 4 });
    exampleGroup3.registerCommand({ title: 'Action 1', run: function() { console.log('Group 3, Action 1') }});
    exampleGroup3.registerCommand({ title: 'Action 2', run: function() { console.log('Group 3, Action 2') }});
    exampleGroup3.registerCommand({ title: 'Action 3', run: function() { console.log('Group 3, Action 3') }});
    exampleGroup3.registerCommand({ title: 'Action 4', run: function() { console.log('Group 3, Action 4') }});
    exampleGroup3.registerCommand({ title: 'Action 5', run: function() { console.log('Group 3, Action 5') }});
    exampleGroup3.registerCommand({ title: 'Action 6', run: function() { console.log('Group 3, Action 6') }});
    exampleGroup3.registerCommand({ title: 'Action 7', run: function() { console.log('Group 3, Action 7') }});
    exampleGroup3.registerCommand({ title: 'Action 8', run: function() { console.log('Group 3, Action 8') }});
    exampleGroup3.registerCommand({ title: 'Action 9', run: function() { console.log('Group 3, Action 9') }});
    exampleGroup3.registerCommand({ title: 'Action 10', run: function() { console.log('Group 3, Action 10') }});
    exampleGroup3.registerCommand({ title: 'Action 11', run: function() { console.log('Group 3, Action 11') }});
    Darkflex.commandRegistry.registerCommandGroup(exampleGroup3);

    Darkflex.commandRegistry.useDotEventListener();
});
