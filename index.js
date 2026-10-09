
// Mobile menu
const menu = document.getElementById('menu');
menu.addEventListener('click', () => menu.setAttribute('aria-expanded', nav.classList.toggle('open')));
nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', false); } });
