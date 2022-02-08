const controller = require('ghostly-controller')
controller();

function Layout () {
  const el = document.createElement('div')
  el.classList.add('cta', 'layout');
  return el;
}

function CTA () {
  const el = document.createElement('h1');
  el.innerText = 'Welcome to Ghostly!';

  return el;
}

const l = Layout()
l.appendChild(CTA())

document.body.appendChild(l)