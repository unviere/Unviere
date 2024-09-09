let menu = document.querySelector('#menu-icon');
let menuf = document.querySelector('.menu');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  menuf.classList.toggle('menu-open'); // Make sure this class name matches the one in your CSS
}
