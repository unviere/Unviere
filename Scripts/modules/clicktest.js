document.addEventListener('DOMContentLoaded', () => {
  const gameTemplate = document.getElementById('test').content;
  const gameContainer = document.querySelector('.click-test-content');

  // Static mapping of game names and universe IDs
  const gamesData = [
    { universeId: '4922186765', name: 'game-name', id: '123456789' },
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
          // Clone the template for each game card
          const gameClone = document.importNode(gameTemplate, true);

          // Set the game details from the fetched data
          gameClone.querySelector('.game-title').textContent = gameData.name || 'No title available';
          gameClone.querySelector('.game-desc').textContent = gameData.description || 'No description available';

          // Use static text for other details if needed
          gameClone.querySelector('.active').textContent = `Active: ${gameData.playing || 'N/A'}`;
          gameClone.querySelector('.owner').textContent = `Owner: ${gameData.creator?.name || 'N/A'}`;
          gameClone.querySelector('.likes').textContent = `Likes: ${gameData.likes || 'N/A'}`;

          // Construct the custom URL for the game page

const customPageUrl = `https://unviere.github.io/Unviere/games/game#${game.id}/${game.name}`;
gameClone.querySelector(".game-card").href = customPageUrl;

          // Fetch game icon (image) dynamically for each game
          const imgUrl = `https://thumbnails.roproxy.com/v1/games/icons?universeIds=${game.universeId}&returnPolicy=PlaceHolder&size=256x256&format=Png&isCircular=false`;

          fetch(imgUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then(imageData => {
              // Check if valid image data is returned
              if (imageData?.data?.[0]?.imageUrl) {
                const imageUrl = imageData.data[0].imageUrl;
                gameClone.querySelector('.icon').src = imageUrl; // Set the image URL in the card
              } else {
                console.error('Invalid image data received from API');
              }

              // Append the clone to the container after setting the icon
              gameContainer.appendChild(gameClone);
            })
            .catch(error => {
              console.error('Error fetching the thumbnail:', error);
              // Use a fallback image if the fetch fails
              gameClone.querySelector('.icon').src = 'path/to/placeholder-image.png';
              gameContainer.appendChild(gameClone); // Append the clone even if image fails
            });
        });
      })
      .catch(error => {
        console.error('Error fetching the game data:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error fetching the game data. Please try again later.';
        gameContainer.appendChild(errorMessage);
      });
  };

  // Iterate through each game and display its data
  gamesData.forEach(game => {
    fetchAndDisplayGame(game);
  });
});