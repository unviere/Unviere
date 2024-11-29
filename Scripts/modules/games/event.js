document.addEventListener('DOMContentLoaded', () => {
  const hostName = window.location.origin;
  const gameTemplate = document.querySelector('#event-temp');
  const gameContainer = document.querySelector('.events-scroller');

  // Helper function to build the path to a page based on environment
  function GetHostPath(path) {
    return window.location.hostname === 'localhost'
      ? `${hostName}/${path}.html`
      : `${hostName}/Unviere/${path}`;
  }

  // Fetch game data
  fetch('https://raw.githubusercontent.com/unviere/Unviere/refs/heads/main/games/api/games.json')
    .then(response => response.json())
    .then(gamesData => {
      console.log("Games data fetched:", gamesData); // Debugging output
      if (gamesData.events) {
        gamesData.events.forEach(fetchAndDisplayGame);
      } else {
        console.log('No events found in game data.');
      }
    })
    .catch(() => displayError('Failed to load game data.'));

  // Function to fetch and display a game
  function fetchAndDisplayGame(game) {
    console.log(game)
    const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${game.universeId}`;
    const infoUrl = `https://raw.githubusercontent.com/unviere/Unviereapis/refs/heads/main/Events/eventInfo${game.id}.json`;

    console.log(`Fetching data for game: ${game.name}`); // Debugging output

    // Fetch both game data and event info data concurrently
    Promise.all([fetch(apiUrl).then(res => res.json()), fetch(infoUrl).then(res => res.json())])
      .then(([robloxData, eventData]) => {
        console.log("Roblox data:", robloxData); // Debugging output
        console.log("Event data:", eventData); // Debugging output

        if (!robloxData || !robloxData.data || !robloxData.data[0]) {
          console.log('No valid Roblox game data found.');
          return;
        }

        const gameData = robloxData.data[0];
        const gameClone = document.importNode(gameTemplate.content, true);

        // Event details
        gameClone.querySelector('.event-title').textContent = gameData.sourceName || 'No title available';
        gameClone.querySelector('#desc-ev div p').textContent = gameData.sourceDescription || 'No description available';
        gameClone.querySelector('.active').textContent = ` ${formatNumber(gameData.playing || 0)}`;
        gameClone.querySelector('.owner').textContent = `by: ${gameData.creator?.name || 'N/A'}`;
        gameClone.querySelector('.likes').textContent = `${formatNumber(gameData.likes || 0)}`;
        gameClone.querySelector('.visits').textContent = ` ${formatNumber(gameData.visits || 0)}`;
        gameClone.querySelector('.more-info').href = `${GetHostPath('games/game')}?id=${game.id}/${game.name}`;
        gameClone.querySelector('.event-icon').src = `https://unviere.github.io/Unviere/games/api/thumbs/thumbnail${game.universeId}.png`;

        // Event Status Handling
        const currentDate = new Date();
        const startDate = new Date(eventData.info.StartDate);
        const endDate = new Date(eventData.info.EndDate);
        const gameStartDate = new Date(game.start);  // Assuming this is from the game API
        console.log("game: ", game.start)
        const gameEndDate = new Date(game.end);      // Assuming this is from the game API

        console.log("Current Date:", currentDate); // Debugging output
        console.log("Event Start Date:", startDate, "Event End Date:", endDate); // Debugging output
        console.log("Game Start Date:", gameStartDate, "Game End Date:", gameEndDate); // Debugging output

        // Only display the event if both event and game are within their respective active periods
        if (shouldDisplayEvent(currentDate, startDate, endDate, gameStartDate, gameEndDate)) {
          console.log('Displaying event:', gameData.sourceName); // Debugging output
          setEventStatus(gameClone, getStatus(currentDate, startDate, endDate));
          populateEventDetails(gameClone, eventData);
          gameContainer.appendChild(gameClone);
        } else {
          console.log('Event is not within the active date range.');
        }
      })
      .catch(error => {
        console.error('Error fetching game or event data:', error);
        displayError('Failed to load specific game details.');
      });
  }

  // Helper function to determine if the event should be displayed
  function shouldDisplayEvent(currentDate, eventStartDate, eventEndDate, gameStartDate, gameEndDate) {
    // Check if the current date is within both the event and game date ranges
    return currentDate >= eventStartDate && currentDate <= eventEndDate && 
           currentDate >= gameStartDate && currentDate <= gameEndDate;
  }

  // Function to get the status of the event (running, soon, ends soon, or last)
  function getStatus(current, start, end) {
    if (current >= start && current <= end) return 'running';
    if (current < start) return 'soon';
    if (current > end) return 'last';
    return '';
  }

  // Function to set the event status visibility
  function setEventStatus(clone, status) {
    clone.querySelector('#running').style.display = 'none';
    clone.querySelector('#soon').style.display = 'none';
    clone.querySelector('#ends-soon').style.display = 'none';
    clone.querySelector('#last').style.display = 'none';

    if (status === 'running') {
      clone.querySelector('#running').style.display = 'flex';
    } else if (status === 'soon') {
      clone.querySelector('#soon').style.display = 'flex';
    } else if (status === 'ends-soon') {
      clone.querySelector('#ends-soon').style.display = 'flex';
    } else if (status === 'last') {
      clone.querySelector('#last').style.display = 'flex';
    }
  }

  // Function to populate event details
  function populateEventDetails(clone, eventData) {
    clone.querySelector('.tabs-info-top p').textContent = eventData.Description || 'No description available';
    clone.querySelector('#start-date-ev').textContent = `from: ${eventData.info.StartDate} ${eventData.info.StartTime}`;
    clone.querySelector('#end-date-ev').textContent = `to: ${eventData.info.EndDate} ${eventData.info.EndTime}`;
    clone.querySelector('#utc-ev').textContent = `UTC ${eventData.info.TimeZone} ${eventData.info.UTC}`;
    clone.querySelector('.reward-img').src = eventData.info.Reward.Icon;
    clone.querySelector('.reward-img').alt = eventData.info.Reward.IconAlt;
    clone.querySelector('.tabs-reward-top p').textContent = eventData.info.Reward.Title;
    clone.querySelector('.tabs-reward-left p').textContent = eventData.info.Reward.Type;
    clone.querySelector('.tabs-reward-right p').textContent = eventData.info.Reward.Description;
  }

  // Function to format numbers with suffixes
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

  // Function to handle errors by displaying a message
  function displayError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    gameContainer.appendChild(errorMessage);
  }
});