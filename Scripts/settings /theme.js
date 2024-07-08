document.addEventListener('DOMContentLoaded', () => {
    const defaultTheme = 'default';
    const themes = ['dark-mode', 'light-mode'];

    const currentTheme = localStorage.getItem('theme') || defaultTheme;
    
    if (currentTheme !== defaultTheme) {
        document.body.classList.add(currentTheme);
    }
    
    const iframe = document.getElementById('embedded-site');

    document.getElementById('unviere-light').addEventListener('click', () => {
        switchTheme(defaultTheme);
    });

    document.getElementById('unviere-dark').addEventListener('click', () => {
        switchTheme('dark-mode');
    });

    document.getElementById('unviere-light').addEventListener('click', () => {
        switchTheme('light-mode');
    });

    

    function switchTheme(theme) {
        document.body.className = ''; // Remove all theme classes
        if (theme !== defaultTheme) {
            document.body.classList.add(theme);
        }
        localStorage.setItem('theme', theme);
    
    
    iframe.contentWindow.postMessage({ theme }, '*'); // Send message to iframe
            }
});