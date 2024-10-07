document.addEventListener('DOMContentLoaded', () => {
  // Array of universeIds to pick from
  const universeIdsTable = [
    '4922186765', 
    '3721966693',
    '6449806598',
    '5574638301',
    '1738552509'
  ];

  // Function to pick a random universeId from the table
  function getRandomUniverseId() {
    const randomIndex = Math.floor(Math.random() * universeIdsTable.length);
    return universeIdsTable[randomIndex];
  }

  // Pick a random universeId
  const randomUniverseId = getRandomUniverseId();

  const apiUrl = `https://games.roproxy.com/v1/games?universeIds=${randomUniverseId}`;
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

        // Update DOM elements with game data
        document.getElementById('game-title').textContent = gameData.name || 'No title available';
        //document.getElementById('side-menu-title').textContent = gameData.name;
      //  document.getElementById('side-menu-desc').textContent = "One of the games from Unviere or their partners.";
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

       // document.title = `${gameData.sourceName || 'Game'} | Unviere`;
      //  const metaDescription = document.querySelector('meta[name="description"]');
       // if (metaDescription) {
      //    metaDescription.setAttribute('content', gameData.sourceDescription || 'No description available.');
      //  }

        // Fetch and display game thumbnail
        const imgUrl = `https://thumbnails.roproxy.com/v1/games/multiget/thumbnails?universeIds=${randomUniverseId}&countPerUniverse=1&defaults=false&size=768x432&format=Png&isCircular=false`;

        console.log('Constructed Image URL:', imgUrl);

        fetch(imgUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
          })
          .then(thumbnailData => {
            console.log('Thumbnail Data:', thumbnailData);
            if (thumbnailData && thumbnailData.data && thumbnailData.data[0] && thumbnailData.data[0].thumbnails && thumbnailData.data[0].thumbnails.length > 0) {
              const firstImageUrl = thumbnailData.data[0].thumbnails[0].imageUrl;
              const imgElement = document.querySelector('#game-thumb-1');
              
              if (imgElement) {
                imgElement.src = firstImageUrl;
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
        const infoUrl = `https://raw.githubusercontent.com/unviere/Unviere/refs/heads/main/games/api/game-api%3Fid%3D${randomUniverseId}.json`;

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

              document.getElementById('sub-genre').textContent = `Other genres: ${subInfoData.genres || 'N/A'}`;
              document.getElementById('developer-img').src = subInfoData.devIcon || '';
              document.getElementById('developer-img-link').href = subInfoData.devLink || '';
              document.getElementById('play-button').href = subInfoData.deepLink;

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

              // Discord handling
              const discordIcon = document.getElementById('discord');
              const discordMobIcon = document.getElementById('discord-mob');
              if (subInfoData.discord === true) {
                discordIcon.style.display = "flex";
                discordMobIcon.style.display = "flex";
                discordIcon.href = subInfoData.discordLink || '';
                discordMobIcon.href = subInfoData.discordLink || '';
              } else {
                discordIcon.style.display = "none";
                discordMobIcon.style.display = "none";
              }

              // YouTube handling
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

              // X (Twitter) handling
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

            } else {
              console.error('No additional info found for game');
            }
          })
          .catch(error => {
            console.error('Error fetching additional info:', error);
          });
      } else {
        console.error('No game data found');
      }
    })
    .catch(error => {
      console.error('Error fetching the game data:', error);
    });

  // Scroll to section functionality
  const playButton = document.querySelector('#play-button');
  const scrollSection = document.querySelector('#scroll-to-section');

  if (playButton && scrollSection) {
    playButton.addEventListener('click', (e) => {
      e.preventDefault();
      scrollSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Mobile menu toggle functionality
  const hamburgerMenu = document.querySelector('#hamburger-menu');
  const mobileNav = document.querySelector('#mobile-nav');

  if (hamburgerMenu && mobileNav) {
    hamburgerMenu.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Side menu toggle functionality
  const sideMenuOpenButton = document.querySelector('#side-menu-open');
  const sideMenu = document.querySelector('#side-menu');
  const sideMenuCloseButton = document.querySelector('#side-menu-close');

  if (sideMenuOpenButton && sideMenuCloseButton && sideMenu) {
    sideMenuOpenButton.addEventListener('click', () => {
      sideMenu.classList.add('open');
    });

    sideMenuCloseButton.addEventListener('click', () => {
      sideMenu.classList.remove('open');
    });
  }
});