# Ghostly Loader

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A wepback loader which allows developers to write `ghosts`, or substitute versions of their code.

Try using ghostly for:
- A/B/C... testting
- Running a different set of code given a certain context

## Usage

This version of the ghostly loader is a POC and so functionality is limited function declarations:

`src/index.js`
```js
function myGreeting() {
    return "Hello!"
}
```
Then, in a separate file, write your ghost with the `.ghost.js` file extension.

`src/index.ghost.js`
```js
// src/index.ghost.js
function myGreeting$spanish() {
    return "Hola!"
}
```
A function called `determineGhost` should be put on the global scope. This function will be called with the name of the ghost and any configuration that the ghost function was created with.

`determineGhost` should return either `'main'` or the function name with the tag of the ghost that should be run.

When `'main'` is returned, the original or primary function will be used.

When the function and tag name are returned, the corresponding ghost will be used.

```js
global.determineGhost = (funcName) => {
  return (Math.random() > .5) ? 'main' : funcName + '$spanish'
}
```

### Inline Configuration

Ghosts can be configured to run probalistically using inline comments:

`some-file.ghost.js`
```js
// 0.5
function myFunction$example() {
    return "I will be used half the time!"
}
```
In `determineGhost`.
```js
global.determineGhost = (functionName, config) => {
  assert(functionName === 'myFunction')
  assert(config.myFunction$example === 0.5)
  
  return (Math.random() > config.myFunction$example) ? 'myFunction$example' : 'main'
}
```

## General Syntax
```js
function myFunction$optionalTagName () {
    // this code will run in place of the primary code.
}
```

