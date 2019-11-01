import { createElement } from './createElement'

test('should create empty tag', () => {
  const element = createElement('div')
  expect(element.outerHTML).toBe('<div></div>')
})

test('should create empty tag with class', () => {
  const element = createElement('div.with-class')
  expect(element.outerHTML).toBe('<div class="with-class"></div>')
})

test('should fail when child is neither string nor HTMLElement', () => {
  expect(() => (createElement as any)('div', 999)).toThrowError()
  expect(() => (createElement as any)('div', {})).toThrowError()
})

test('should create tag with classes and children', () => {
  const element = createElement(
    'div.with-class.another-class',
    createElement('span.child-class', 'Hello, World!')
  )
  expect(element.outerHTML).toBe(
    '<div class="with-class another-class"><span class="child-class">Hello, World!</span></div>'
  )
})
