import { Command } from './Command'
import { DOMEventStep } from './DOMEventsStep'

export interface Props {
  title: string
  description?: string
  domEventSteps?: Array<DOMEventStep>
}

export class DOMEventsCommand extends Command {
  private domEventSteps: Array<DOMEventStep> = []

  constructor({ title, description, domEventSteps }: Props) {
    super({
      title,
      description,
      run: () => undefined,
    })

    if (domEventSteps) {
      this.domEventSteps = [...this.domEventSteps, ...domEventSteps]
    }
  }

  registerDOMEventStep(step: DOMEventStep) {
    this.domEventSteps.push(step)
  }

  run() {
    for (const step of this.domEventSteps) {
      step.run()
    }
  }

  onSelect() {
    for (const step of this.domEventSteps) {
      step.addFocus()
    }
  }

  onDeselect() {
    for (const step of this.domEventSteps) {
      step.removeFocus()
    }
  }

  static createClickEventCommand({
    title,
    description,
    element,
  }: {
    title: string
    description?: string
    element: Element | string
  }) {
    const command = new DOMEventsCommand({ title, description })
    command.registerDOMEventStep(DOMEventStep.createClickEventStep(element))
    return command
  }
}
