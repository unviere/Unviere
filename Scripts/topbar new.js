  document.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://unviere.github.io/Unviere/Scripts/topbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;

        // Attach the event listener for dark mode toggle after the content is inserted
        const toggleButton = document.getElementById('dark-mode-toggle');
        if (toggleButton) {
          toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
          });
        } else {
          console.error('Dark mode toggle button not found');
        }

        // Initialize the hamburger menu after the header is loaded
        const menuIcon = document.getElementById('menu-icon');
        const navList = document.querySelector('.navlist');
        if (menuIcon && navList) {
          menuIcon.addEventListener('click', () => {
            navList.classList.toggle('navlist-open');
          });
        } else {
          console.error('Menu icon or nav list not found');
        }
      })
      .catch(error => console.error('Error fetching header:', error));
  });
