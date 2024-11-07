// Script 1: Generate random gameID and update the URL with it

// Array of universeIds to pick from
const universeIdsTable = [
  '10135698219',
  '116463530852265',
  '16133672663',
  '107169670237182',
  '5032972341',
  '14229107623',
];

// Function to pick a random universeId from the table
function getRandomUniverseId() {
  const randomIndex = Math.floor(Math.random() * universeIdsTable.length);
  return universeIdsTable[randomIndex];
}

// Get the random gameID
const randomGameId = getRandomUniverseId();

// Get the current URL
const currentUrl = window.location.href;

// Check if there is already a query string and add `gameID` to it
const newUrl = new URL(currentUrl);

// Set or update the gameID query parameter
newUrl.searchParams.set('gameID', randomGameId);

// Update the browser's URL without reloading the page
window.history.replaceState(null, '', newUrl);