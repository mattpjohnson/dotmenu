export function createElement(
  querySelector: string,
  ...children: Array<string | HTMLElement>
) {
  const [tag, ...classes] = querySelector.split('.')
  const element = document.createElement(tag)

  for (const className of classes) {
    element.classList.add(className)
  }

  for (const child of children) {
    if (typeof child === 'string') {
      element.innerHTML += child
    } else if (child instanceof HTMLElement) {
      element.appendChild(child)
    }
  }

  return element
}
