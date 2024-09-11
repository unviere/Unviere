let menu = document.querySelector('#menu-icon');
let menuf = document.querySelector('.menu');
let menupin = document.querySelector(".sidebar-toggle");


if (menu && menuf) {
  menu.onclick = () => {
    // Toggle the class on the menu icon
    menu.classList.toggle('bx-x');

    // Get the computed display style of the menu element
    const currentDisplay = window.getComputedStyle(menuf).display;
    const currentpin = window.getComputedStyle(menupin).display;
    // Toggle display property between 'none' and 'flex'
    if (currentDisplay === 'none') {
      menuf.style.display = 'flex';
      menupin.style.display = "flex";
    } else {
      menuf.style.display = 'none';
      menupin.style.display = "none";
    }
  };
};