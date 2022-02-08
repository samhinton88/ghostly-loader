function Layout$red () {
    const el = document.createElement('div')
    el.classList.add('cta', 'layout', 'red');
    return el;
  }

function Layout$green () {
    const el = document.createElement('div')
    el.classList.add('cta', 'layout', 'green');
    return el;
}

function CTA$spanish () {
  const el = document.createElement('h1');
  el.innerText = '¡Bienvenidos a Ghostly!';

  return el;
}