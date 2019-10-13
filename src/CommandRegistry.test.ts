import { CommandGroup } from './CommandGroup'
import { CommandRegistry } from './CommandRegistry'

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
  commandRegistry.maxResultsPerGroup = 5

  const domGroup = new CommandGroup({})
  domGroup.registerCommand(ape)

  commandRegistry.registerCommandGroup(domGroup)

  expect(commandRegistry.filteredCommandGroups.length).toBe(1)
})

test('de-registers commands successfully', () => {
  const commandRegistry = new CommandRegistry()
  commandRegistry.maxResultsPerGroup = 5

  const domGroup = new CommandGroup({})
  domGroup.registerCommand(ape)

  commandRegistry.registerCommandGroup(domGroup)
  commandRegistry.unregisterCommandGroup(domGroup)

  expect(commandRegistry.filteredCommandGroups.length).toBe(0)
})

test('filters commands correctly', () => {
  const commandRegistry = new CommandRegistry()
  commandRegistry.maxResultsPerGroup = 5

  const domGroup = new CommandGroup({})

  domGroup.registerCommand(ape)
  domGroup.registerCommand(badger)
  domGroup.registerCommand(cat)
  domGroup.registerCommand(butterfly)

  commandRegistry.registerCommandGroup(domGroup)
  commandRegistry.setFilter('b')

  expect(
    commandRegistry.filteredCommandGroups.map(commandGroup =>
      commandGroup.filteredCommands.map(command => command.title)
    )
  ).toEqual([['badger', 'butterfly']])
})

test('only shows maxResultsPerGroup worth of commands per group', () => {
  const commandRegistry = new CommandRegistry()

  const domGroup = new CommandGroup({})

  domGroup.registerCommand(ape)
  domGroup.registerCommand(badger)
  domGroup.registerCommand(butterfly)
  domGroup.registerCommand(cat)
  domGroup.registerCommand(dog)
  domGroup.registerCommand(elk)

  commandRegistry.registerCommandGroup(domGroup)

  commandRegistry.maxResultsPerGroup = 4
  expect(commandRegistry.filteredCommandGroups[0].filteredCommands.length).toBe(
    4
  )
})
