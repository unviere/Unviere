document.addEventListener('DOMContentLoaded', () => {
  const gameTemplate = document.getElementById('test').content;
  const gameContainer = document.querySelector('.test-content');

  // Array of game universe IDs
  const universeIds = ['4922186765', 'anotherUniverseId', 'anotherUniverseId2'];

  // Function to fetch and display game data
  const fetchAndDisplayGames = (universeIds) => {
    const apiUrl = `https://games.roblox.com/v1/games?universeIds=${universeIds.join(',')}`;
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

          gameClone.querySelector('.game-title').textContent = game.name || 'No title available';
          gameClone.querySelector('.icon').src = `https://www.roblox.com/Thumbs/Asset.ashx?width=110&height=110&assetId=${game.rootPlaceId}`;
          gameClone.querySelector('.game-desc').textContent = game.description || 'No description available';
          gameClone.querySelector('.active').textContent = `active: ${game.playing || 'N/A'}`;
          gameClone.querySelector('.owner').textContent = `owner: ${game.creator && game.creator.name ? game.creator.name : 'N/A'}`;
          gameClone.querySelector('.likes').textContent = `likes: ${game.likes || 'N/A'}`;

          gameContainer.appendChild(gameClone);
        });
      })
      .catch(error => {
        console.error('Error fetching the game data:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error fetching the game data. Please try again later.';
        gameContainer.appendChild(errorMessage);
      });
  };

  // Fetch and display games for all universe IDs
  fetchAndDisplayGames(universeIds);
});