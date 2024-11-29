document.addEventListener('DOMContentLoaded', () => {
  const hostName = window.location.origin;
  console.log(hostName);

  function GetHostPath(path) {
    if (window.location.hostname === 'localhost') {
      // Code for localhost
      // console.log("Running on localhost");
      return hostName + '/' + path + '.html'
  
    } else {
      // Code for production or other environments
      //console.log("Running on production or another domain");
      return hostName + '/Unviere/' + path
    }
  }

  const gameTemplate = document.querySelector('#event-temp');
  const gameContainer = document.querySelector('.events-scroller');
  const targetGenres = ['event'];

  // Fetching the main games JSON
  fetch('https://raw.githubusercontent.com/unviere/Unviere/refs/heads/main/games/api/games.json')
    .then(response => response.json())
    .then(gamesData => {
      if (!gamesData.events) throw new Error("No events found.");
      fetchWithDelay(gamesData.events);
    })
    .catch(error => {
      console.error('Error fetching games data:', error);
      displayError('Error loading events. Please try again later.');
    });

  // Fetch and display game data with a delay
  async function fetchWithDelay(events) {
    for (const event of events) {
      await fetchAndDisplayGame(event);
      await delay(200); // 200ms delay between requests
    }
  }

  // Fetch and display game details
  async function fetchAndDisplayGame(game) {
    const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${game.universeId}`;
    const infoUrl = `https://raw.githubusercontent.com/unviere/Unviereapis/refs/heads/main/Events/eventInfo${game.id}.json`;
    const imgUrl = `https://unviere.github.io/Unviere/games/api/thumbs/thumbnail${game.universeId}.png`;

    try {
      const [gameApiResponse, infoData] = await Promise.all([
        fetch(apiUrl).then(res => res.json()),
        fetch(infoUrl).then(res => res.json())
      ]);

      if (!gameApiResponse.data || !Array.isArray(gameApiResponse.data) || !infoData.info) {
        throw new Error("Invalid API data format");
      }

      const gameData = gameApiResponse.data[0];
      const gameClone = document.importNode(gameTemplate.content, true);
      const currentDate = new Date();
      const startDate = convertToDate(infoData.info.StartDate);
      const endDate = convertToDate(infoData.info.EndDate);

      setGameStatus(gameClone, currentDate, startDate, endDate);

      // Populate game details
      gameClone.querySelector('.event-title').textContent = gameData.name || 'No title available';
      gameClone.querySelector('#desc-ev p').textContent = gameData.description || 'No description available';
      gameClone.querySelector('.active').textContent = formatNumber(gameData.playing);
      gameClone.querySelector('.owner').textContent = `by: ${gameData.creator.name || 'N/A'}`;
      gameClone.querySelector('.likes').textContent = formatNumber(gameData.likes);
      gameClone.querySelector('.visits').textContent = formatNumber(gameData.visits);
      gameClone.querySelector(".event-card").href = `${GetHostPath('games/game')}?id=${game.id}/${game.name}`;
      gameClone.querySelector('.event-icon').src = imgUrl;

      // Populate event information
      gameClone.querySelector('#start-date-ev').textContent = `from: ${infoData.info.StartDate} ${infoData.info.StartTime}`;
      gameClone.querySelector('#end-date-ev').textContent = `to: ${infoData.info.EndDate} ${infoData.info.EndTime}`;
      gameClone.querySelector('#utc-ev').textContent = `UTC ${infoData.info.TimeZone} ${infoData.info.UTC}`;

      // Show or hide reward tag
      if (infoData.info.Reward.Enabled) {
        gameClone.querySelector('#reward-on').style.display = "flex";
      } else {
        gameClone.querySelector('#reward-off').style.display = "flex";
      }

      // Event description and reward details
      gameClone.querySelector('.tabs-info-top p').textContent = infoData.Description || 'No event description available';
      if (infoData.info.Reward.Enabled) {
        gameClone.querySelector('#rewardB').style.display = "block";
        gameClone.querySelector('.reward-img').src = infoData.info.Reward.Icon;
        gameClone.querySelector('.reward-img').alt = infoData.info.Reward.IconAlt;
        gameClone.querySelector('.tabs-reward-top p').textContent = infoData.info.Reward.Title;
      }

      gameContainer.appendChild(gameClone);
    } catch (error) {
      console.error('Error fetching or displaying game data:', error);
      displayError('Error loading game data. Please try again later.');
    }
  }

  // Set game status based on current date
  function setGameStatus(gameClone, currentDate, startDate, endDate) {
    const fiveDaysBeforeStart = new Date(startDate);
    fiveDaysBeforeStart.setDate(startDate.getDate() - 5);
    const fiveDaysBeforeEnd = new Date(endDate);
    fiveDaysBeforeEnd.setDate(endDate.getDate() - 5);

    if (currentDate >= startDate && currentDate <= endDate) {
      gameClone.querySelector('#running').style.display = "flex";
    } else if (currentDate >= fiveDaysBeforeStart && currentDate < startDate) {
      gameClone.querySelector('#soon').style.display = "flex";
    } else if (currentDate >= fiveDaysBeforeEnd && currentDate < endDate) {
      gameClone.querySelector('#ends-soon').style.display = "flex";
    } else if (currentDate > endDate) {
      gameClone.querySelector('#last').style.display = "flex";
    } else {
      hideStatusTags(gameClone);
    }
  }

  // Hide all status tags
  function hideStatusTags(gameClone) {
    ['#running', '#soon', '#ends-soon', '#last'].forEach(tag => {
      gameClone.querySelector(tag).style.display = "none";
    });
  }

  // Utility functions
  function displayError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    gameContainer.appendChild(errorMessage);
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'b';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'm';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
    return num;
  }

  function convertToDate(dateStr) {
    const [day, month, year] = dateStr.split("-");
    return new Date(`${year}-${month}-${day}`);
  }
});