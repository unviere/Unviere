document.addEventListener('DOMContentLoaded', () => {
  // Game name to universe ID mapping (this can be a JSON file or fetched from an API in the future)
  const gamesTable = {
    'super-fun-adventure': '4922186765',
    'another-cool-game': 'anotherUniverseId',
    'mega-adventure': 'anotherUniverseId2'
  };

  // Function to extract the slug (game name) from the URL
  const extractSlugFromURL = () => {
    const path = window.location.pathname;
    return path.split('/').pop();
  };

  // Get the slug (game name) from the URL
  const gameSlug = extractSlugFromURL();
  const universeId = gamesTable[gameSlug];

  if (universeId) {
    // Fetch and display game data using the universeId
    const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${universeId}`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const game = data.data[0]; // Assuming the response returns the game info
        document.querySelector('.game-title').textContent = game.name;
        document.querySelector('.game-description').textContent = game.description;
        document.querySelector('.game-icon').src = `https://thumbnails.roblox.com/v1/places/${game.rootPlaceId}/icons?size=150x150&format=Png&isCircular=false`;
        document.querySelector('.active-players').textContent = `Active Players: ${game.playing || 'N/A'}`;
        document.querySelector('.game-likes').textContent = `Likes: ${game.likes || 'N/A'}`;
      })
      .catch(error => {
        console.error('Error fetching game data:', error);
      });
  } else {
    console.error('No game found for the given name.');
  }
});