export class DOMEventStep {
  element: Element
  event: string

  constructor({
    element,
    event,
  }: {
    element: Element | string
    event: string
  }) {
    if (typeof element === 'string') {
      this.element = this.getElementForSelector(element)
    } else {
      this.element = element
    }

    this.event = event
  }

  getElementForSelector(selector: string) {
    const element = document.querySelector(selector)
    if (!element) {
      throw new Error(`Couldn't find ${element} in the document.`)
    }

    return element
  }

  run() {
    const event = new Event(this.event)
    this.element.dispatchEvent(event)
  }

  addFocus() {
    this.element.classList.add('dotmenu__focused-event-target')
  }

  removeFocus() {
    this.element.classList.remove('dotmenu__focused-event-target')
  }

  static createClickEventStep(element: Element | string) {
    return new DOMEventStep({ element, event: 'click' })
  }
}
