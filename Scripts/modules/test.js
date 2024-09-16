document.addEventListener('DOMContentLoaded', () => {
  const gameTemplate = document.getElementById('test').content;
  const gameContainer = document.querySelector('.test-content'); // Ensure this selector matches your HTML

  // Array of game universe IDs
  const universeIds = ['4922186765', 'anotherUniverseId', 'anotherUniverseId2'];

  // Function to fetch and display game data for a single universe ID
  const fetchAndDisplayGame = (universeId) => {
    const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${universeId}`;
    
    console.log('Fetching data from API URL:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('API response data:', data);

        if (!data.data || !Array.isArray(data.data)) {
          throw new Error('Invalid data format received from API');
        }

        data.data.forEach(game => {
          const gameClone = document.importNode(gameTemplate, true);

          // Fetch game icon (image)
          const imgUrl = `https://thumbnails.roproxy.com/v1/games/icons?universeIds=${universeId}&returnPolicy=PlaceHolder&size=256x256&format=Png&isCircular=false`;

          fetch(imgUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json(); // Parse JSON only if response is OK
            })
            .then(data => {
              console.log('thumb API response data:', data);

              if (data && data.data && data.data[0] && data.data[0].imageUrl) {
                const imageUrl = data.data[0].imageUrl;
                // Set the image source here, after fetching the image data
                gameClone.querySelector('.icon').src = imageUrl;
              } else {
                console.error('Invalid image data received from API');
              }

              // After setting the image, append the clone to the container
              gameContainer.appendChild(gameClone);
            })
            .catch(error => {
              console.error('Error fetching the thumbnail:', error);
            });

          // Set other game details here
          gameClone.querySelector('.game-title').textContent = game.name || 'No title available';
          gameClone.querySelector('.game-desc').textContent = game.description || 'No description available';
          gameClone.querySelector('.active').textContent = `active: ${game.playing || 'N/A'}`;
          gameClone.querySelector('.visits').textContent = `visits: ${game.visits || 'N/A'}`;
          gameClone.querySelector('.owner').textContent = `by: ${game.creator && game.creator.name ? game.creator.name : 'N/A'}`;
          gameClone.querySelector('.likes').textContent = ` ${game.likes || 'N/A'}`;

        });
      })
      .catch(error => {
        console.error('Error fetching the game data:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error fetching the game data. Please try again later.';
        gameContainer.appendChild(errorMessage);
      });
  };

  // Fetch and display games for each universe ID sequentially
  universeIds.forEach(universeId => {
    fetchAndDisplayGame(universeId);
  });
});