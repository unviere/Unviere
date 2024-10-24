document.addEventListener('DOMContentLoaded', () => {
  const gameTemplate = document.getElementById('test').content;
  const gameContainer = document.querySelector('.click-test-content');

  // Static mapping of game names and universe IDs
  const gamesData = [
    { universeId: '4922186765', name: 'parallelized-engineers', id: '14229107623' },
    { universeId: '6449806598', name: 'the-secret-of-puzle-island', id: '116463530852265' },
    { universeId: '3721966693', name: 'happy-obbies', id: '10135698219' }
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
          gameClone.querySelector('.active').textContent = ` ${formatNumber(gameData.playing|| '0')}`;
          gameClone.querySelector('.owner').textContent = `by: ${gameData.creator?.name || 'N/A'}`;
          gameClone.querySelector('.likes').textContent = `${formatNumber(gameData.likes|| 'N/A')}`;
          gameClone.querySelector('.visits').textContent = ` ${formatNumber(gameData.visits|| 'N/A')}`;

          // Construct the custom URL for the game page
const idtag = "id"
const customPageUrl = `https://unviere.github.io/Unviere/games/game?${idtag}=${game.id}/${game.name}`;
gameClone.querySelector(".game-card").href = customPageUrl;

          // Fetch game icon (image) dynamically for each game
          const imgUrl = `https://thumbnails.roproxy.com/v1/games/multiget/thumbnails?universeIds=${game.universeId}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`;

          fetch(imgUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
          })
          .then(imageData => {
            // Check if valid image data is returned
            if (imageData?.data?.[0]?.thumbnails?.[0]?.imageUrl) {
              const imageUrl = imageData.data[0].thumbnails[0].imageUrl;
              gameClone.querySelector('.icon').src = imageUrl; // Set the image URL in the card
            } else {
              console.error('Invalid image data received from API');
              gameClone.querySelector('.icon').src = 'path/to/placeholder-image.png'; // Use a fallback image
            }
        
            // Append the clone to the container after setting the icon
            gameContainer.appendChild(gameClone);
          })
          .catch(error => {
            console.error('Error fetching the thumbnail:', error);
            // Use a fallback image if the fetch fails
            gameClone.querySelector('.icon').src = 'https://unviere.github.io/Unviere/Img/unv_games.png';
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