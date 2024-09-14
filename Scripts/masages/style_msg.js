document.addEventListener('DOMContentLoaded', (event) => {
            if (localStorage.getItem('theme-zwitch-msg-dismissed') === 'true') {
                document.getElementById('theme-zwitch-tip').style.display = 'none';
            }
            
            if (localStorage.getItem('theme-revamp-dismissed') === 'true') {
                document.getElementById('theme-revamp').style.display = 'none';
            }

            // Add event listener to the button
            document.getElementById('theme-zwitch-msg').addEventListener('click', dismissMessage);
            
            document.getElementById('theme-revamp-msg').addEventListener('click', dismissMessage2);
        });

        function dismissMessage() {
            const messageElement = document.getElementById('theme-zwitch-tip');
            
            
            messageElement.style.display = 'none';
            localStorage.setItem('theme-zwitch-msg-dismissed', 'true');
            
            
        }
        
        function dismissMessage2() {
            
            
            const messageElement2 = document.getElementById('theme-revamp');
      
            
            messageElement2.style.display = 'none';
            localStorage.setItem('theme-revamp-dismissed', 'true');
        }