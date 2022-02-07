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

### Inline Configuration

Ghosts can be configured to run probalistically using inline comments:

`some-file.ghost.js`
```js
// 0.5
function myGhost() {
    return "I will be used half the time!"
}
```

## General Syntax
```js
function myFunction$optionalTagName () {
    // this code will run in place of the primary code.
}
```

