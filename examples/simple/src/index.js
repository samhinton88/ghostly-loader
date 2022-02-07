// realistically this would be configured elsewhere
global.determineGhost = (id) => {
  

  return (Math.random() > .5) ? 'main' : id
}

const foo = require('./foo')

function greet () {
  console.log('Hello World');
  console.log(foo());
}

greet()