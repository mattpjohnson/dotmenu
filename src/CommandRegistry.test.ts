import { CommandGroup } from './CommandGroup'
import { CommandRegistry } from './CommandRegistry'

test('registers commands successfully', () => {
  const commandRegistry = new CommandRegistry()
  commandRegistry.maxResultsPerGroup = 5

  const domGroup = new CommandGroup({})
  domGroup.registerCommand({
    title: '',
    run: Function,
  })

  commandRegistry.registerCommandGroup(domGroup)

  expect(commandRegistry.filteredCommandGroups.length).toBe(1)
})

test('de-registers commands successfully', () => {
  const commandRegistry = new CommandRegistry()
  commandRegistry.maxResultsPerGroup = 5

  const domGroup = new CommandGroup({})
  domGroup.registerCommand({
    title: '',
    run: Function,
  })

  commandRegistry.registerCommandGroup(domGroup)
  commandRegistry.unregisterCommandGroup(domGroup)

  expect(commandRegistry.filteredCommandGroups.length).toBe(0)
})

test('filters commands correctly', () => {
  const commandRegistry = new CommandRegistry()
  commandRegistry.maxResultsPerGroup = 5

  const domGroup = new CommandGroup({})

  domGroup.registerCommand({
    title: 'ape',
    run: Function,
  })
  domGroup.registerCommand({
    title: 'badger',
    run: Function,
  })
  domGroup.registerCommand({
    title: 'cat',
    run: Function,
  })
  domGroup.registerCommand({
    title: 'butterfly',
    run: Function,
  })

  commandRegistry.registerCommandGroup(domGroup)
  commandRegistry.setFilter('b')

  expect(
    commandRegistry.filteredCommandGroups.map(commandGroup =>
      commandGroup.filteredCommands.map(command => command.title)
    )
  ).toEqual([['badger', 'butterfly']])
})
