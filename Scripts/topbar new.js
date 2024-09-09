document.addEventListener('DOMContentLoaded', () => {
  // Fetch the content for the header
  fetch('https://unviere.github.io/Unviere/pages/topbar.html')
    .then(response => response.text())
    .then(data => {
      // Insert the fetched content into the header
      document.getElementById('header').innerHTML = data;

      // Log to verify header content
      console.log('Header content inserted:', document.getElementById('header').innerHTML);

      // Initialize functionalities that require the header content to be present
      initializeMenu();
    })
    .catch(error => console.error('Error fetching header:', error));
});

function cloneNavIntoNavmenu() {
  // Log to check if header has been updated
  console.log('Cloning navigation into scroller...');

  // Find the navigation element in the inserted content
  const navTemplate = document.querySelector('#nav'); // Adjust selector if necessary

  // Log to check if navTemplate is found
  console.log('Found navTemplate:', navTemplate);

  if (navTemplate) {
    // Clone the navigation content
    const navClone = document.importNode(navTemplate.content, true);

    // Find the target elements where the navigation should be cloned
    const navmenu = document.querySelectorAll('.scroller');

    // Log to check if navmenu is found
    console.log('Found scroller elements:', navmenu);

    if (navmenu.length > 0) {
      // Append the cloned content to each scroller element
      Array.from(navmenu).forEach(scroller => {
        scroller.appendChild(document.importNode(navClone, true));
      });
    } else {
      console.error('No elements with class "scroller" found.');
    }
  } else {
    console.error('Navigation element with ID "nav" not found in the fetched content.');
  }
}

function initializeMenu() {
  // Attach the event listener for the hamburger menu
  const menu = document.querySelector('#menu-icon');
  const menuf = document.querySelector('.menu');

  // Log to check if menu elements are found
  console.log('Menu icon:', menu);
  console.log('Menu:', menuf);

  if (menu && menuf) {
    menu.onclick = () => {
      // Toggle the class on the menu icon
      menu.classList.toggle('bx-x');

      // Get the computed display style of the menu element
      const currentDisplay = window.getComputedStyle(menuf).display;

      // Toggle display property between 'none' and 'flex'
      if (currentDisplay === 'none') {
        menuf.style.display = 'flex';
      } else {
        menuf.style.display = 'none';
      }
    };

    // Call cloneNavIntoNavmenu after menu initialization
    cloneNavIntoNavmenu();
  } else {
    console.error('Menu elements not found in the DOM.');
  }
}