# Dotmenu

<div style="text-align: center">
  <img alt="banner image" src="https://github.com/mattpjohnson/dotmenu/blob/master/docs/banner.png">
</div>

<p align="center">
  <a href="https://travis-ci.org/mattpjohnson/dotmenu">
    <img alt="Travis CI Build Status" src="https://img.shields.io/travis/mattpjohnson/dotmenu/master.svg?style=flat&label=Travis+CI">
  </a>
  <a href="https://circleci.com/gh/mattpjohnson/dotmenu">
    <img alt="CircleCI Build Status" src="https://img.shields.io/circleci/project/github/mattpjohnson/dotmenu/master.svg?style=flat&label=CircleCI">
  </a>
  <a href="https://codecov.io/gh/mattpjohnson/dotmenu">
    <img alt="Codecov Coverage Status" src="https://img.shields.io/codecov/c/github/mattpjohnson/dotmenu.svg?style=flat">
  </a>
  <a href="https://sonarcloud.io/dashboard?id=mattpjohnson_dotmenu">
    <img alt="SonarQube Technical Debt" src="https://img.shields.io/sonar/http/sonarcloud.io/mattpjohnson_dotmenu/tech_debt.svg?style=flat">
  </a>
  <a href="https://github.com/prettier/prettier#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat">
  </a>
  <a href="https://www.npmjs.com/package/dotmenu">
    <img alt="npm bundle size (minified)" src="https://img.shields.io/bundlephobia/min/dotmenu.svg">
  </a>
  <a href="https://www.npmjs.com/package/dotmenu">
    <img alt="npm" src="https://img.shields.io/npm/v/dotmenu.svg">
  </a>
</p>

## Demo

![demo video](https://github.com/mattpjohnson/dotmenu/blob/master/docs/demo-video.gif)

You can see the demo [here](https://mattpjohnson.github.io/dotmenu).

## Themes

Currently supported themes:

- Blue (light)
- Blue (dark)
- Teal (light)
- Teal (dark)

To use a theme simply add this class to the body of your document.

`dotmenu-theme-<color>-<light/dark>`

![theme demo](https://github.com/mattpjohnson/dotmenu/blob/master/docs/theme-demo.png)

## Installation

`yarn add dotmenu`

Or using npm

`npm install dotmenu`

## Usage

First, import dotmenu using one of the following methods:

If you're using a bundler:

```javascript
import * as dotmenu from 'dotmenu'
```

Otherwise, add this to your `index.html`:

```html
<script src="https://rawgit.com/mattpjohnson/darkflex/master/dist/dotmenu.umd.js"></script>
```

Now register your commands with dotmenu.

```javascript
function exampleAction1() {
  console.log('Action 1')
}

function exampleAction2() {
  console.log('Action 2')
}

const group1 = new dotmenu.CommandGroup({ title: 'Example group 1' })
group1.registerCommand({ title: 'Action 1', run: exampleAction1 })
group1.registerCommand({ title: 'Action 2', run: exampleAction2 })
dotmenu.commandRegistry.registerCommandGroup(group1)

dotmenu.commandRegistry.useDotEventListener()
```

The majority of dotmenu commands are just shortcuts for clicking on something. There's a handy helper for this:

```javascript
const group2 = new dotmenu.CommandGroup({ title: 'Example group 2' })
group2.registerCommand(
  dotmenu.DOMEventsCommand.createClickEventCommand({
    title: 'Click the button',
    element: '#click-this-button',
  })
)
```

# License

MIT
