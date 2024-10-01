document.addEventListener('DOMContentLoaded', () => {
  const gameTemplate = document.getElementById('game-card').content;
  const gameContainer = document.querySelector('.game-jams-content');

  // Static mapping of game names and universe IDs
  const gamesData = [
    { universeId: '4922186765', name: 'Parallelized-Engineers/game-jam?date=07-2023', id: '14229107623' },
    { universeId: '5574638301', name: 'Diverse-And-Unexpected/game-jam?date=02-2024', id: '16133672663' },
    { universeId: '6449806598', name: 'the-secret-of-puzzle-island/game-jam?date=08-2024', id: '116463530852265' }
  ];

  const fetchAndDisplayGame = (game) => {
    const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${game.universeId}`;
    const imgUrl =`https://unviere.github.io/Unviere/games/api/thumbs/thumbnail${game.universeId}`;

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
          function formatNumber(num) {
            if (num >= 1e9) {
              return (num / 1e9).toFixed(1) + 'b';
            } else if (num >= 1e6) {
              return (num / 1e6).toFixed(1) + 'm';
            } else if (num >= 1e3) {
              return (num / 1e3).toFixed(1) + 'k';
            } else {
              return num;
            }
          }
          gameClone.querySelector('.game-title').textContent = gameData.sourceName || 'No title available';
          gameClone.querySelector('.game-desc').textContent = gameData.sourceDescription || 'No description available';

          // Use static text for other details if needed
          gameClone.querySelector('.active').textContent = ` ${formatNumber(gameData.playing || '0')}`;
          gameClone.querySelector('.owner').textContent = `by: ${gameData.creator?.name || 'N/A'}`;
          gameClone.querySelector('.likes').textContent = `${formatNumber(gameData.likes || 'N/A')}`;
          gameClone.querySelector('.visits').textContent = ` ${formatNumber(gameData.visits || 'N/A')}`;

          // Construct the custom URL for the game page
          const idtag = "id";
          const customPageUrl = `https://unviere.github.io/Unviere/games/game?${idtag}=${game.id}/${game.name}`;
          gameClone.querySelector(".game-card").href = customPageUrl;

          // Use a preset thumbnail URL instead of fetching it dynamically
          gameClone.querySelector('.icon').src = imgUrl; // Preset URL

          // Append the clone to the container after setting the preset icon
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

  // Iterate through each game and display its data
  gamesData.forEach(game => {
    fetchAndDisplayGame(game);
  });
});