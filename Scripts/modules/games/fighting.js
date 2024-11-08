document.addEventListener('DOMContentLoaded', () => {
  
  var hostName = window.location.origin;
    console.log(hostName)
    
    function GetHostPath(path) {
    if (window.location.hostname === 'localhost') {
    // Code for localhost
   // console.log("Running on localhost");
    return hostName + '/' + path + '.html'
    
} else {
    // Code for production or other environments
    //console.log("Running on production or another domain");
    return hostName +'/Unviere/' + path
}
    }
  const gameTemplate = document.getElementById('game-card').content;
  const gameContainer = document.querySelector('.fighting-content');

  // Static mapping of game names and universe IDs
 // const gamesData = [
 //   { universeId: '4922186765', name: 'parallelized-engineers', id: '14229107623' },
    
   // { universeId: '1738552509', name: 'Sk-Sword-Fighting', id: '5032972341' },
  //];

  const targetGenres = ['fighting']; // 1. Define the genres we want to check against

  // 2. Fetch game data from the JSON file instead of using a static array
   fetch('https://raw.githubusercontent.com/unviere/Unviere/refs/heads/main/games/api/games.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(gamesData => {
      // 3. Iterate through each game in the data array and display its data using the fetchAndDisplayGame function
      gamesData.genres.forEach(game => { // Access the genres array directly
        fetchAndDisplayGame(game);
      });
    })
    .catch(error => {
      console.error('Error fetching the game data:', error);
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Error fetching the game data. Please try again later.';
      gameContainer.appendChild(errorMessage);
    });

  const fetchAndDisplayGame = (game) => {
    const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${game.universeId}`;
    const imgUrl = `https://unviere.github.io/Unviere/games/api/thumbs/thumbnail${game.universeId}.png`;

    // 4. Check if the game has a genre that matches our target genres
    const hasMatchingGenre = game.genres.some(genre => targetGenres.includes(genre)); // Check for genre match
    if (!hasMatchingGenre) return; // Skip displaying this game if it doesn't match

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
          const customPageUrl = `${GetHostPath('games/game')}?${idtag}=${game.id}/${game.name}`;
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
});