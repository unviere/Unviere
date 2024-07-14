document.addEventListener('DOMContentLoaded', () => {
  const gameTemplate = document.getElementById('test').content;
  const gameContainer = document.querySelector('.un-content');

  // Array of game universe IDs
  const universeIds = ['4922186765', 'anotherUniverseId', 'anotherUniverseId2'];

  // Function to fetch and display game data
  const fetchAndDisplayGames = (universeIds) => {
    const apiUrl = `https://games.roblox.com/v1/games?universeIds=${universeIds.join(',')}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        data.data.forEach(game => {
          const gameClone = document.importNode(gameTemplate, true);

          gameClone.querySelector('.game-title').textContent = game.name;
          gameClone.querySelector('.icon').src = `https://www.roblox.com/Thumbs/Asset.ashx?width=110&height=110&assetId=${game.rootPlaceId}`;
          gameClone.querySelector('.game-desc').textContent = game.description || 'No description available';
          gameClone.querySelector('.active').textContent = `active: ${game.playing}`;
          gameClone.querySelector('.owner').textContent = `owner: ${game.creator.name}`;
          gameClone.querySelector('.likes').textContent = `likes: ${game.likes || 'N/A'}`;

          gameContainer.appendChild(gameClone);
        });
      })
      .catch(error => console.error('Error fetching the game data:', error));
  };

  // Fetch and display games for all universe IDs
  fetchAndDisplayGames(universeIds);
});