# Ghostly Loader

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A wepback loader which allows developers to write `ghosts`, or substitute versions of their code which are inserted at build time.

Try using ghostly for:
- A/B/C... testing
- Running a different set of code given a certain context (e.g. locale, localStorage)

## Installation and Use With Webpack
The loader is built to work in tandem with the `ghostly-controller`:

```sh
npm i --save-dev ghostly-loader
npm i --save ghostly-controller
or 
yarn add -D ghostly-loader
yarn add ghostly-controller
```

> NB: `ghostly-controller` is not required, see below.

In `webpack.config.js`
```js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      { test: /\.js$/, use: 'ghostly-loader' },
    ],
  }

}
```

## Usage

This version of the ghostly loader is a POC and so functionality is limited function declarations:

`src/index.js`
```js
require('ghostly-controller')();

function myGreeting() {
    return "Hello!"
}
```
Then, in a separate file, write your ghost in a file in the same directory named `[target_file_name].ghost.js`:

`src/index.ghost.js`
```js
function myGreeting$spanish() {
    return "Hola!"
}
```
`ghostly-controller` places a function called `determineGhost` on the global scope. This function will be called with the name of the ghost and any configuration that the ghost function was created with.

You can choose not to use `ghostly-controller` and define your own implementation in its place.

`determineGhost` will return either `'main'` or the tag of the ghost that should be run in its place.

When `'main'` is returned, the original or primary function will be used.

When the function and tag name are returned, the corresponding ghost will be used.

By default, `ghostly-controller` defines a `determineGhost` function which uses `localStorage` to persist information about which ghosts should run.

Developers may open their dev tools, navigate to `localStorage` and override that information.

### Multiple Ghosts

A single function may have many ghosts, they simply have to start with the name of the original function:

`src/index.ghost.js`
```js
function myGreeting$spanish() {
    return "Hola!"
}

function myGreeting$german() {
    return "Hallo"
}
```
`root`
```js
global.determineGhost = (functionName, config) => {
  assert(functionName === 'myGreeting')
  const ghostNames = Object.keys(config) // ['myGreeting$spanish', 'myGreeting$german']

  const randomIndex = Math.floor(Math.random() * ghostNames.length)

  return ghostNames[randomIndex]
}
```

### Inline Configuration

Ghosts can be configured to run probalistically using inline comments.

Any text placed in a comment directly above your ghost will be sent to `determineGhost` when the function is called:

`some-file.ghost.js`
```js
// 0.5
function myFunction$example() {
    return "I should be used half (0.5x) the time!"
}
```
In `determineGhost`:
```js
global.determineGhost = (functionName, config) => {
  assert(functionName === 'myFunction')
  assert(config.myFunction$example === 0.5)

  if (functionName === 'myFunction') {
    return (Math.random() > config.myFunction$example) ? 'myFunction$example' : 'main'
  }
  
  return 'main';
}
```

## General Syntax
```js
function myFunction$optionalTagName () {
    // this code will run in place of the primary code.
}
```
