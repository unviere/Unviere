document.addEventListener('DOMContentLoaded', () => {
  const gameTemplate = document.getElementById('test').content;
  const gameContainer = document.querySelector('.click-test-content');

  // Static mapping of game names and universe IDs
  const gamesData = [
    { universeId: '4922186765', name: '123456789/game-name' },
    { universeId: 'anotherUniverseId', name: 'Another Game' },
    { universeId: 'anotherUniverseId2', name: 'Yet Another Game' }
  ];

  const fetchAndDisplayGame = (game) => {
    const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${game.universeId}`;
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error('Invalid data format received from API');
        }

        data.data.forEach(gameData => {
          const gameClone = document.importNode(gameTemplate, true);

          // Fetch game icon (image)
          const imgUrl = `https://thumbnails.roproxy.com/v1/games/icons?universeIds=${game.universeId}&returnPolicy=PlaceHolder&size=256x256&format=Png&isCircular=false`;

          fetch(imgUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then(data => {
              if (data && data.data && data.data[0] && data.data[0].imageUrl) {
                const imageUrl = data.data[0].imageUrl;
                gameClone.querySelector('.icon').src = imageUrl;
              } else {
                console.error('Invalid image data received from API');
              }

              // Add click event listener to the game element
       gameClone.addEventListener('click', () => {
    if (game && game.name) {
        console.log('Game clicked:', game.name); // Check if game.name is correct
        
        // Construct the URL
        const customPageUrl = `https://unviere.github.io/Unviere/games/game#${encodeURIComponent(game.name)}`;
        
        // Navigate to the constructed URL
        window.location.href = customPageUrl;
    } else {
        console.error('Game object or name is not defined.');
    }
});
              // Append the clone to the container
              gameContainer.appendChild(gameClone);
            })
            .catch(error => {
              console.error('Error fetching the thumbnail:', error);
            });

          // Set other game details
          gameClone.querySelector('.game-title').textContent = gameData.name || 'No title available';
          gameClone.querySelector('.game-desc').textContent = gameData.description || 'No description available';

          // Use static text for other details if needed
          gameClone.querySelector('.active').textContent = `Active: ${gameData.playing || 'N/A'}`;
          gameClone.querySelector('.owner').textContent = `Owner: ${gameData.creator && gameData.creator.name ? gameData.creator.name : 'N/A'}`;
          gameClone.querySelector('.likes').textContent = `Likes: ${gameData.likes || 'N/A'}`;
        });
      })
      .catch(error => {
        console.error('Error fetching the game data:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error fetching the game data. Please try again later.';
        gameContainer.appendChild(errorMessage);
      });
  };

  gamesData.forEach(game => {
    fetchAndDisplayGame(game);
  });
});