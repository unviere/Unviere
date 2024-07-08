document.addEventListener('DOMContentLoaded', (event) => {
            if (localStorage.getItem('theme-zwitch-msg-dismissed') === 'true') {
                document.getElementById('theme-zwitch-tip').style.display = 'none';
            }

            // Add event listener to the button
            document.getElementById('theme-zwitch-msg').addEventListener('click', dismissMessage);
        });

        function dismissMessage() {
            const messageElement = document.getElementById('theme-zwitch-tip');
            messageElement.style.display = 'none';
            localStorage.setItem('theme-zwitch-msg-dismissed', 'true');
        }