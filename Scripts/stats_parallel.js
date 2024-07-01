async function fetchAndDisplayStats() {
  try {
    const response = await fetch(`https://games.roblox.com/v1/games?universeIds=4922186765`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status} - ${response.statusText}`);
    }
    const jsonData = await response.json();
    console.log('Fetched data:', jsonData); // Log fetched data for debugging

    // Update HTML elements with fetched data
    //document.getElementById('likes').textContent = `Likes: ${jsonData.data[0].favoritedCount}`;
    document.getElementById('server-size').textContent = `Server Size: ${jsonData.data[0].maxPlayers}`;
    document.getElementById('favorites').textContent = `Favorites: ${jsonData.data[0].favoritedCount}`;
    document.getElementById('created-date').textContent = `Created: ${new Date(jsonData.data[0].created).toLocaleDateString()}`;
    document.getElementById('last-updated').textContent = `Last Updated: ${new Date(jsonData.data[0].updated).toLocaleDateString()}`;
  //  document.getElementById('genre').textContent = `Genre: ${jsonData.data[0].genre}`;
    //document.getElementById('other-genres').textContent = `Allowed Genres: ${jsonData.data[0].allowedGearGenres.join(', ')}`;
  } catch (error) {
    console.error('Error fetching and displaying stats:', error);
  }
}

// Call the function to fetch and display stats when the page loads 
document.addEventListener('DOMContentLoaded', fetchAndDisplayStats);