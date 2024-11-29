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
      return hostName + '/Unviere/' + path
    }
  }
  const gameTemplate = document.querySelector('#event-temp');
  const gameContainer = document.querySelector('.events-scroller');

  // Static mapping of game names and universe IDs
  const targetGenres = ['event']; // 1. Define the genres we want to check against

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
      gamesData.events.forEach(game => { // Access the genres array directly
        if (gamesData.events)
          fetchAndDisplayGame(game);
      });
    })
    .catch(error => {
      console.error('Error fetching the game data:', error);
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Error fetching the games api. Please try again later.';
      gameContainer.appendChild(errorMessage);
    });

  const fetchAndDisplayGame = (game) => {
    const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${game.universeId}`;
    const infoUrl = `https://raw.githubusercontent.com/unviere/Unviereapis/refs/heads/main/Events/eventInfo${game.id}.json`;

    console.log(infoUrl)
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
          console.log("temp: ", gameTemplate)
          if (!gameTemplate) {
            console.error("Template not found: #event-temp");
          }





          // Convert "DD-MM-YYYY" to "YYYY-MM-DD"

          var idd = 1
          const gameClone = document.importNode(gameTemplate.content, true);
          console.log(gameClone)

          // Only logs the number of child elements
          // Set the game details from the fetched data




          // Interactive object tree
          // Only logs the number of child elements
          // Check if current date is within the range


          //info

          //extra info

          //tags

          gameClone.querySelector('.event-title').textContent = gameData.sourceName || 'No title available';
          gameClone.querySelector('#desc-ev').querySelector('div').querySelector('p').textContent = gameData.sourceDescription || 'No description available';

          // Use static text for othe6519358648r details if needed
          gameClone.querySelector('.active').textContent = ` ${formatNumber(gameData.playing || '0')}`;
          gameClone.querySelector('.owner').textContent = `by: ${gameData.creator?.name || 'N/A'}`;
          gameClone.querySelector('.likes').textContent = `${formatNumber(gameData.likes || 'N/A')}`;
          gameClone.querySelector('.visits').textContent = ` ${formatNumber(gameData.visits || 'N/A')}`;

          // Construct the custom URL for the game page
          const idtag = "id";
          const customPageUrl = `${GetHostPath('games/game')}?${idtag}=${game.id}/${game.name}`;
          gameClone.querySelector(".more-info").href = customPageUrl;

          // Use a preset thumbnail URL instead of fetching it dynamically
          gameClone.querySelector('.event-icon').src = imgUrl; // Preset URL

          // Append the clone to the container after setting the preset icon
          fetch(infoUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then(data => {
              console.log(data); // Log the response for debugging

              // Check if data is an object with properties we expect
              if (!data || !data.info) {
                throw new Error("Invalid data format received.");
              }

              // Define the formatNumber function


              // Convert "DD-MM-YYYY" to "YYYY-MM-DD"
              function convertToDate(dateStr) {
                const [day, month, year] = dateStr.split("-");
                return new Date(`${year}-${month}-${day}`);
              }

              // Assuming currentDate is declared elsewhere in the code
              //  var currentDate = new Date();

              // Get start and end dates from the data
              const currentDate = new Date();
              var startDDate = convertToDate(game.start);
              var endDDate = convertToDate(game.end);
              var startDate = convertToDate(data.info.StartDate);
              var endDate = convertToDate(data.info.EndDate);

              console.log("Current Date:", currentDate);
              console.log("ev Start Date:", startDate);
              console.log("ev End Date:", endDate);

              // Calculate 5 days before startDate
              const preStartDate = new Date(startDate);
              preStartDate.setDate(startDate.getDate() - 5);

              const preEndDate = new Date(startDate);
              preEndDate.setDate(startDate.getDate() - 5);

              // Assuming gameClone is already defined elsewhere in your code
              if (currentDate >= startDate && currentDate <= endDate) {

                gameClone.querySelector('#running').style.display = "flex";

              } else if (currentDate >= preStartDate && currentDate < startDate) {

                gameClone.querySelector('#soon').style.display = "flex";

              } else if (currentDate >= preEndDate && currentDate < endDate) {

                gameClone.querySelector('#ends-soon').style.display = "flex";

              } else if (currentDate >= endDate) {

                gameClone.querySelector('#last').style.display = "flex";

              } else {

                gameClone.querySelector('#running').style.display = "none";
                gameClone.querySelector('#soon').style.display = "none";
                gameClone.querySelector('#ends-soon').style.display = "none";
                gameClone.querySelector('#last').style.display = "none";
              }

              //reward tag
              if (data.info.Reward.Enabled == true) {
                gameClone.querySelector('#reward-on').style.display = "flex";
                
              } else {
                gameClone.querySelector('#reward-on').style.display = "none";
                
              }

              //datas
              gameClone.querySelector('#start-date-ev').textContent = `from: ${data.info.StartDate} ${data.info.StartTime}`

              gameClone.querySelector('#end-date-ev').textContent = `to: ${data.info.EndDate} ${data.info.EndTime}`

              gameClone.querySelector('#utc-ev').textContent = `UTC ${data.info.TimeZone} ${data.info.UTC}`

              //repeating
              if (data.info.repeating == true) {
                gameClone.querySelector('#repeat-ev').style.display = "flex"
              } else {
                gameClone.querySelector('#repeat-ev').style.display = "none"
              }

              //event description 
              gameClone.querySelector('.tabs-info-top').querySelector('p').textContent = data.Description

              //Reward
              if (data.info.Reward.Enabled == true) {
                gameClone.querySelector('#rewardB').style.display = "block";

              } else {
                gameClone.querySelector('#rewardB').style.display = "none";

              }

              gameClone.querySelector('.reward-img').src = data.info.Reward.Icon;

              gameClone.querySelector('.reward-img').alt = data.info.Reward.IconAlt;

              gameClone.querySelector('.tabs-reward-top').querySelector('p').textContent = data.info.Reward.Title;

              gameClone.querySelector('.tabs-reward-left').querySelector('p').textContent = data.info.Reward.Type

              gameClone.querySelector('.tabs-reward-right').querySelector('p').textContent = data.info.Reward.Description

              // stats date

              gameClone.querySelector('#date').textContent = `${data.info.StartDate} / ${data.info.EndDate}`
              // You can add more actions here, like setting other details in gameClone
            })
            .catch(error => {
              console.error('Error fetching the game data:', error);
              const errorMessage = document.createElement('p');
              errorMessage.textContent = 'Error fetching the event data from unviere api. Please try again later.';
              errorMessage.style.color = "red"
              gameContainer.appendChild(errorMessage);
            });
          idd += 1
          gameClone.id = `event${idd}`
          gameContainer.appendChild(gameClone);

          if (currentDate >= startDDate && currentDate <= endDDate) {
            console.log("running")


            document.querySelector(`#event${idd}`).style.display = "flex";

          } else if (currentDate < startDDate) {
            document.querySelector(`#event${idd}`).style.display = "none";
          } else {
            document.querySelector(`#event${idd}`).style.display = "none";
          }
        });
      })
      .catch(error => {
        console.error('Error fetching the game data:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error fetching the event data from roblox. Please try again later.';
        errorMessage.style.color = "red"
        gameContainer.appendChild(errorMessage);
      });

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

  };
});