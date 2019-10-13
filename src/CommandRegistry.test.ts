import { CommandGroup } from './CommandGroup'
import { CommandRegistry } from './CommandRegistry'
import { RecentCommandGroup } from './RecentCommandGroup'
import { Command } from './Command'

const ape = {
  title: 'ape',
  run: Function,
}
const badger = {
  title: 'badger',
  run: Function,
}
const butterfly = {
  title: 'butterfly',
  run: Function,
}
const cat = {
  title: 'cat',
  run: Function,
}
const dog = {
  title: 'dog',
  run: Function,
}
const elk = {
  title: 'elk',
  run: Function,
}

test('registers commands successfully', () => {
  const commandRegistry = new CommandRegistry()
  const commandGroup = new CommandGroup({})
  commandGroup.registerCommand(ape)

  commandRegistry.registerCommandGroup(commandGroup)

  expect(commandRegistry.filteredCommandGroups.length).toBe(1)
})

test('unregisters commands successfully', () => {
  const commandRegistry = new CommandRegistry()
  const commandGroup = new CommandGroup({})
  commandGroup.registerCommand(ape)

  commandRegistry.registerCommandGroup(commandGroup)
  commandRegistry.unregisterCommandGroup(commandGroup)

  expect(commandRegistry.filteredCommandGroups.length).toBe(0)
})

test('filters commands correctly', () => {
  const commandRegistry = new CommandRegistry()
  const commandGroup = new CommandGroup({})

  commandGroup.registerCommand(ape)
  commandGroup.registerCommand(badger)
  commandGroup.registerCommand(cat)
  commandGroup.registerCommand(butterfly)

  commandRegistry.registerCommandGroup(commandGroup)
  commandRegistry.setFilter('b')

  expect(
    commandRegistry.filteredCommandGroups.map(commandGroup =>
      commandGroup.filteredCommands.map(command => command.title)
    )
  ).toEqual([['badger', 'butterfly']])
})

test('only shows maxResultsPerGroup worth of commands per group', () => {
  const commandRegistry = new CommandRegistry()
  const commandGroup = new CommandGroup({})

  commandGroup.registerCommand(ape)
  commandGroup.registerCommand(badger)
  commandGroup.registerCommand(butterfly)
  commandGroup.registerCommand(cat)
  commandGroup.registerCommand(dog)
  commandGroup.registerCommand(elk)

  commandRegistry.registerCommandGroup(commandGroup)

  commandRegistry.maxResultsPerGroup = 4
  expect(commandRegistry.filteredCommandGroups[0].filteredCommands.length).toBe(
    4
  )
})

test('RecentCommandGroup should not be available when no commands have been run', () => {
  const commandRegistry = new CommandRegistry()
  const commandGroup = new CommandGroup({})
  const command = new Command(ape)

  commandGroup.registerCommand(command)
  commandRegistry.registerCommandGroup(commandGroup)
  commandRegistry.selectCommand(command)

  commandRegistry.filteredCommandGroups.forEach(commandGroup =>
    expect(commandGroup).not.toBeInstanceOf(RecentCommandGroup)
  )
})

test('top group should be the RecentCommandGroup if commands have been run', () => {
  const commandRegistry = new CommandRegistry()
  const commandGroup = new CommandGroup({})
  const command = new Command(ape)

  commandGroup.registerCommand(command)
  commandRegistry.registerCommandGroup(commandGroup)
  commandRegistry.selectCommand(command)
  commandRegistry.runSelectedCommand()

  // TODO(thetisrock): Uncomment once RecentCommandGroup is being added to CommandRegistry
  // expect(commandRegistry.filteredCommandGroups[0]).toBeInstanceOf(RecentCommandGroup)
})

test('commands in RecentCommandGroup should be ordered by usage frequency', () => {
  const commandRegistry = new CommandRegistry()
  const commandGroup = new CommandGroup({})
  const apeCommand = new Command(ape)
  const badgerCommand = new Command(badger)
  const catCommand = new Command(cat)

  commandGroup.registerCommand(apeCommand)
  commandGroup.registerCommand(badgerCommand)
  commandGroup.registerCommand(catCommand)
  commandRegistry.registerCommandGroup(commandGroup)

  commandRegistry.selectCommand(apeCommand)
  commandRegistry.runSelectedCommand()

  commandRegistry.selectCommand(catCommand)
  commandRegistry.runSelectedCommand()
  commandRegistry.runSelectedCommand()

  // TODO(thetisrock): Uncomment once RecentCommandGroup is being added to CommandRegistry
  //   expect(
  //     commandRegistry.filteredCommandGroups[0].filteredCommands.map(
  //       command => command.title
  //     )
  //   ).toEqual(['cat', 'ape', 'badger'])
})
