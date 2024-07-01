// Replace 'YOUR_GAME_ID' with your actual Roblox game ID
const gameId = '14229107623';

// Function to fetch and display stats
async function fetchAndDisplayStats() {
  try {
    const response = await fetch(`https://api.roblox.com/games/${gameId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    // Update HTML with fetched data
    document.getElementById('likes').textContent = `Likes: ${data.likes}`;
    document.getElementById('server-size').textContent = `Server Size: ${data.maxPlayers}`;
    document.getElementById('favorites').textContent = `Favorites: ${data.favoritesCount}`;
    document.getElementById('created-date').textContent = `Created: ${data.created}`;
    document.getElementById('last-updated').href = data.updated;
  //  document.getElementById('last-updated').innerHTML = `Last Updated: <a href="${data.updated}">See here</a>`;//
  } catch (error) {
    console.error('Error fetching and displaying stats:', error);
  }
}

// Call the function to fetch and display stats when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayStats);