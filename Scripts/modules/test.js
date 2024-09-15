document.addEventListener('DOMContentLoaded', () => {
  const gameTemplate = document.getElementById('test').content;
  const gameContainer = document.querySelector('.test-content'); // Ensure this selector matches your HTML

  // Tables: one for names and one for universe IDs
  const gamesTable = [
    { name: 'Super Fun Adventure', universeId: '4922186765' },
    { name: 'Another Cool Game', universeId: 'anotherUniverseId' },
    { name: 'Mega Adventure', universeId: 'anotherUniverseId2' }
  ];

  // Function to fetch and display game data for a single universe ID
  const fetchAndDisplayGame = (game) => {
    const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${game.universeId}`;
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

        data.data.forEach(gameData => {
          const gameClone = document.importNode(gameTemplate, true);

          gameClone.querySelector('.game-title').textContent = gameData.name || 'No title available';
          gameClone.querySelector('.icon').src = `https://www.roblox.com/Thumbs/Asset.ashx?width=110&height=110&assetId=${gameData.rootPlaceId}`;
          gameClone.querySelector('.game-desc').textContent = gameData.description || 'No description available';
          gameClone.querySelector('.active').textContent = `active: ${gameData.playing || 'N/A'}`;
          gameClone.querySelector('.owner').textContent = `owner: ${gameData.creator && gameData.creator.name ? gameData.creator.name : 'N/A'}`;
          gameClone.querySelector('.likes').textContent = `likes: ${gameData.likes || 'N/A'}`;

          // Add event listener to open the new page with the gameData.name in the URL
          const slug = generateSlugFromTitle(gameData.name);
          gameClone.querySelector('.game-container').addEventListener('click', () => {
            window.location.href = `/game/${slug}`;
          });

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

  // Helper function to generate a slug from the game title
  const generateSlugFromTitle = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Fetch and display games for each game in the gamesTable
  gamesTable.forEach(game => {
    fetchAndDisplayGame(game);
  });
});