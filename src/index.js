// realistically this would be configured elsewhere
global.determineGhost = () => {
  return 'main'
}

require('./foo')

function greet () {
  console.log('Hello World');
}

greet()