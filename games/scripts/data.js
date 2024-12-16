document.addEventListener('DOMContentLoaded', () => {
  // Get game name from the URL
  function getUrlWithoutHash() {
  var baseUrl = window.location.search;
  return baseUrl;
}

// Example usage
var urlWithoutHash = getUrlWithoutHash();
console.log(urlWithoutHash); // Logs the URL without the # part
    // var currentUrl = urlWithoutHash
  var gameName = urlWithoutHash //window.location.search.substring(1);
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
          
          
const gameID = gameName.match(/Id=(\d+)/i)[1];
console.log(gameID); // Output will be "1257"

          const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${universeId}`;
          console.log('API URL:', apiUrl);

          // Fetch main game data
          fetch(apiUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Fetched Game Data:', data);
              if (data.data && Array.isArray(data.data) && data.data.length > 0) {
                const gameData = data.data[0];
                console.log('Parsed Game Data:', gameData);

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
const error = document.getElementById('error-sec');
    const game = document.getElementById('game-sec');
    
    const stats = document.getElementById('game-stats-t')
    
    
    
    error.style.display = "none";
    game.style.display = "flex";
    stats.style.display = "flex";
                // Update DOM elements with game data
                document.getElementById('game-title').textContent = gameData.name || 'No title available';
                document.getElementById('side-menu-title').textContent = gameData.name;
                document.getElementById('side-menu-desc').textContent = "One of the games from Unviere or their partners. On some game pages, there are more sections for that game.";
                document.getElementById('game-title-top').textContent = gameData.sourceName || 'No title available';
                document.getElementById('description').innerHTML = gameData.sourceDescription || 'No description available';
                document.getElementById('game-developer').textContent = `by: ${gameData.creator?.name || 'n/a'}`;
                document.getElementById('game-developer-top').textContent = `by: ${gameData.creator?.name || 'n/a'}`;
                document.getElementById('active-top').textContent = ` ${formatNumber(gameData.playing || '0')}`;
                document.getElementById('visits-top').textContent = ` ${formatNumber(gameData.visits || '0')}`;
                document.getElementById('likes-top').textContent = ` ${formatNumber(gameData.likes || 'N/A')}`;
                document.getElementById('active-nav').textContent = ` ${formatNumber(gameData.playing || '0')}`;
                document.getElementById('visits-nav').textContent = ` ${formatNumber(gameData.visits || '0')}`;
                document.getElementById('likes-nav').textContent = ` ${formatNumber(gameData.likes || 'N/A')}`;
                document.getElementById('server-size').textContent = `Server size: ${gameData.maxPlayers || 'N/A'}`;
                document.getElementById('favorites').textContent = `Favorite: ${gameData.favoritedCount || 'N/A'}`;
                document.getElementById('created-date').textContent = `Development started: ${new Date(gameData.created).toLocaleDateString() || 'N/A'}`;
                document.getElementById('last-updated').textContent = `Updated: ${new Date(gameData.updated).toLocaleDateString() || 'N/A'}`;
                document.getElementById('genre').textContent = `Genre: ${gameData.genre || 'N/A'}`;
                
game.style.display = "flex";
                stats.style.display = "flex";

                
                
                
                const gameNavBar = document.getElementById('game-navb-content');
                
                gameNavBar.style.display = "flex";
                
                
                
                
                const metaDescription = document.querySelector('#meta-desc');
                
                if (metaDescription) {
                  console.log("dynamically writing seo")
                  metaDescription.setAttribute('content', `${gameData.sourceName} is one of the few games from unviere, parcle or partners of unviere come join now ${gameData.sourceDescription || 'No description available.'}`);
                  
                  document.title = `unviere | ${gameData.sourceName || 'Game'}`;
                  
                  console.log(metaDescription)
                }

                // Fetch and display game thumbnail
                const imgUrl = `https://thumbnails.roproxy.com/v1/games/multiget/thumbnails?universeIds=${universeId}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`;

                console.log('Constructed Image URL:', imgUrl);

                fetch(imgUrl)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                  })
                  .then(thumbnailData => {
                    console.log('Thumbnail Data:', thumbnailData); // Log full data for inspection
                    if (thumbnailData && thumbnailData.data && thumbnailData.data[0] && thumbnailData.data[0].thumbnails && thumbnailData.data[0].thumbnails.length > 0) {
                      // Get the first image URL from the thumbnails array
                      const firstImageUrl = thumbnailData.data[0].thumbnails[0].imageUrl;
                      console.log('First Image URL:', firstImageUrl); // Log the first image URL

                      // Select the image element
                      const imgElement = document.querySelector('#game-thumb-1');

                      if (imgElement) {
                        imgElement.src = firstImageUrl; // Set the image source to the first image URL
                      } else {
                        console.error('Image element with id="game-thumb-1" not found in DOM');
                      }
                    } else {
                      console.error('No valid thumbnails received from API');
                    }
                  })
                  .catch(error => {
                    console.error('Error fetching the thumbnail:', error);
                  });

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

                      // Update DOM elements with the additional info
                      document.getElementById('sub-genre').textContent = `Other genres: ${subInfoData.genres || 'N/A'}`;
                      document.getElementById('developer-img').src = subInfoData.devIcon || '';
                      document.getElementById('developer-img-link').href = subInfoData.devLink || '';
                      
                      
                      document.getElementById('play-button').href = `https://ro.blox.com/Ebh5?af_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${gameID}&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${gameID}&deep_link_value=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${gameID}`

                     // Make the Discord icon visible based on the response
                  const infoIcon = document.getElementById('info-button');
                  const navIcon = document.getElementById('nav-button');
                  const socialIcon = document.getElementById('social-button');
                
                  if (subInfoData.infoEnabled === true) {
                    infoIcon.style.display = "flex";
                  } else {
                    infoIcon.style.display = "none";
                  }
                  
                  if (subInfoData.navEnabled === true) {
                    navIcon.style.display = "flex";
                  } else {
                    navIcon.style.display = "none";
                  }
                  
                  if (subInfoData.socialsEnabled === true) {
                    socialIcon.style.display = "flex";
                  } else {
                    socialIcon.style.display = "none";
                  }

                  // Discord icon handling
                  const discordIcon = document.getElementById('discord');
                  const discordMobIcon = document.getElementById('discord-mob');
                  if (subInfoData.discord === true) {
                    discordIcon.style.display = "flex";
                    discordMobIcon.style.display = "flex";
                    discordIcon.href = subInfoData.discordLink || ''; // Set the Discord link if available
                    
                    discordMobIcon.href = subInfoData.discordLink || ''; // Set the Discord link if available
                  } else {
                    discordIcon.style.display = "none";
                    discordMobIcon.style.display = "none";
                  }
    
                  // YouTube icon handling
                  const ytIcon = document.getElementById('yt');
                  const ytMobIcon = document.getElementById('yt-mob');
                  if (subInfoData.yt === true) {
                    ytIcon.style.display = "flex";
                    ytMobIcon.style.display = "flex";
                    ytIcon.href = subInfoData.ytLink || ''; 
                    ytMobIcon.href = subInfoData.ytLink || ''; 
                  } else {
                    ytIcon.style.display = "none";
                    ytMobIcon.style.display = "none";
                  }
                  //x
                  const twitterIcon = document.getElementById('x');
                  const twitterMobIcon = document.getElementById('x-mob');
                  if (subInfoData.x === true) {
                    twitterIcon.style.display = "flex";
                    twitterMobIcon.style.display = "flex";
                    twitterIcon.href = subInfoData.xLink || ''; 
                  
                    twitterMobIcon.href = subInfoData.xLink || ''; 
                  } else {
                    twitterIcon.style.display = "none";
                    twitterMobIcon.style.display = "none";
                  }
                  
                                    //insta
                  const instaIcon = document.getElementById('insta');
                  const instaMobIcon = document.getElementById('insta-mob');
                  if (subInfoData.insta === true) {
                    instaIcon.style.display = "flex";
                    instaMobIcon.style.display = "flex";
                    instaIcon.href = subInfoData.instaLink || ''; 
                  
                    instaMobIcon.href = subInfoData.instaLink || ''; 
                  } else {
                    instaIcon.style.display = "none";
                    instaMobIcon.style.display = "none";
                  }
                  //tiktok
                  const tiktokIcon = document.getElementById('tiktok');
                  const tiktokMobIcon = document.getElementById('tiktok-mob');
                  if (subInfoData.tiktok === true) {
                    tiktokIcon.style.display = "flex";
                    tiktokMobIcon.style.display = "flex";
                    tiktokIcon.href = subInfoData.tiktokLink || ''; 
                    
                    tiktokMobIcon.href = subInfoData.tiktokLink || ''; 
                  } else {
                    tiktokIcon.style.display = "none";
                    tiktokMobIcon.style.display = "none";
                  }
                  //guilded 
                  const guildIcon = document.getElementById('guild');
                  const guildMobIcon = document.getElementById('guild-mob');
                  if (subInfoData.guilded === true) {
                    guildIcon.style.display = "flex";
                    guildMobIcon.style.display = "flex";
                    guildIcon.href = subInfoData.guildedLink || ''; 
                  
                    guildMobIcon.href = subInfoData.guildedLink || ''; 
                  } else {
                    guildIcon.style.display = "none";
                    guildMobIcon.style.display = "none";
                  }
                  // Update log handling
                  const updLog = document.getElementById('upd-log');
                  if (subInfoData.updateLog === true) {
                    updLog.style.display = "flex";
                    updLog.href = subInfoData.updateLogLink || '';
                  } else {
                    updLog.style.display = "none";
                  }
                  
                    } else {
                      console.error('No additional info received for the game.');
                    }
                  })
                  .catch(error => {
                    console.error('Error fetching additional info:', error);
                  });

                // Handle case when there are no thumbnails
              } else {
                console.error('No valid game data found.');
              }
            })
            .catch(error => {
              console.error('Error fetching game data:', error);
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