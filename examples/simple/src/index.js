// always run spanish version
global.determineGhost = (id) => {
  return funcName + '$spanish'
}

const foo = require('./foo')

function greet () {
  console.log('Hello World');
  console.log(foo());
}

greet()