let menu = document.querySelector('#menu-icon');
let menuf = document.querySelector('.menu');

menu.onclick = () => {
  // Toggle the class on the menu icon
  menu.classList.toggle('bx-x');

  // Get the computed display style of the menu element
  const currentDisplay = window.getComputedStyle(menuf).display;

  // Toggle display property between 'none' and 'flex'
  if (currentDisplay === "none") {
    menuf.style.display = "flex";
  } else {
    menuf.style.display = "none";
  }
  // Make sure this class name matches the one in your CSS
};
