import * as Command from './Command'
import * as CommandGroup from './CommandGroup'
import * as CommandRegistry from './CommandRegistry'
import * as DOMEventsCommand from './DOMEventsCommand'
import * as DOMEventsStep from './DOMEventsStep'
import * as UI from './UI'

export const dotmenu = {
  ...Command,
  ...CommandGroup,
  ...CommandRegistry,
  ...DOMEventsCommand,
  ...DOMEventsStep,
  ...UI,
}
