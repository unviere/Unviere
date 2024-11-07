document.addEventListener('DOMContentLoaded', () => {
  // Get game name from the URL
  const gameName = window.location.search.substring(1);
  console.log('Game Name from URL:', gameName);

  if (gameName) {
    
    
    
    // Load the JSON file from the specified URL
    fetch('https://raw.githubusercontent.com/unviere/Unviere/refs/heads/main/games/api/games.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Access the games object from the fetched data
        const games = data.games;

        // Check if the game exists in the games object
        if (games.hasOwnProperty(gameName)) {
          const game = games[gameName]; // Access the game details
          console.log('Matching Game Details:', game);

          // Now you can use the game's universeId or any other details
          const universeId = game.universeId;

          

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


                // Fetch additional info (sub-genres, etc.)
                const infoUrl = `https://raw.githubusercontent.com/unviere/Unviere/refs/heads/main/games/api/game-api%3Fid%3D${universeId}.json`;
                console.log('Additional Info URL:', infoUrl);

                fetch(infoUrl)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                  })
                  .then(infoData => {
                    console.log('Fetched Sub-Genre Data:', infoData);
                    if (infoData && infoData.data && infoData.data.length > 0) {
                      const subInfoData = infoData.data[0];
  // check if  store be used
                      
                      
                      const storeB = document.getElementById('storeB');
                      
                      if (subInfoData.tabs.store === true) {
                        storeB.style.display = "flex";
                        
                      } else {
                        storeB.style.display = "none";
                        
                      }
                      
                        // check if  badges be used
                      
                      
                      const badgeB = document.getElementById('badgeB');
                      
                      if (subInfoData.tabs.badges === true) {
                        badgeB.style.display = "flex";
                        
                      } else {
                        badgeB.style.display = "none";
                        
                      }
                                              // check if  trailers be used
                      
                      
                      const videoB = document.getElementById('vidB');
                      
                      if (subInfoData.tabs.videos === true) {
                        videoB.style.display = "flex";
                        
                      } else {
                        videoB.style.display = "none";
                        
                      }
                      
                                              // check if  servers be used
                      
                      
                                              const serversB = document.getElementById('serverB');
                      
                                              if (subInfoData.tabs.servers === true) {
                                                serversB.style.display = "flex";
                      
                                              } else {
                                                serversB.style.display = "none";
                      
                                              }
                      // check if nav bar be used
                      
                      
                      const navbarForGame = document.getElementById('game-buttons-bar');
                      
                      if (subInfoData.tabs.enabled === true) {
                        navbarForGame.style.display = "flex";
                        
                      } else {
                        navbarForGame.style.display = "none";
                        
                      }
                    } else {
                      console.error('No additional info received for the game.');
                    }
                  })
                  .catch(error => {
                    console.error('Error fetching additional info:', error);
                  });


            
            
        } else {
          console.error(`Game "${gameName}" not found in the list.`);
          // Handle case when the game is not found
        //  document.getElementById('game-title').textContent = 'Game Not Found';
        }
      })
      .catch(error => {
        console.error('Error fetching games list:', error);
      });
  } else {
    console.error('No game name provided in the URL.');
    // Handle case when no game name is specified
    //document.getElementById('game-title').textContent = 'No Game Selected';
  }
});