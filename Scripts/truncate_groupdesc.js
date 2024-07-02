         function truncateText(element, lines) {
            if (!element || !(element instanceof Element)) {
                console.error('Invalid element passed to truncateText');
                return;
            }

            const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
            const maxHeight = lineHeight * lines;

            // Measure the actual height of the element's content
            const measureHeight = () => {
                const temp = document.createElement('div');
                temp.style.position = 'absolute';
                temp.style.visibility = 'hidden';
                temp.style.width = element.offsetWidth + 'px';
                temp.style.fontSize = window.getComputedStyle(element).fontSize;
                temp.style.lineHeight = window.getComputedStyle(element).lineHeight;
                temp.textContent = element.textContent;
                document.body.appendChild(temp);
                const height = temp.offsetHeight;
                document.body.removeChild(temp);
                return height;
            };

            let text = element.textContent;
            while (measureHeight() > maxHeight) {
                text = text.substring(0, text.length - 1);
                element.textContent = text + '...';
            }
        }

        window.onload = function() {
            const paragraph = document.querySelector('.partner-info p'); // Select the <p> element inside .partner-info
            truncateText(paragraph, 2);
        };