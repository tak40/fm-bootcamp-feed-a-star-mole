function getRandomInterval(min, max) {
  // Math.random() generates a floating-point number between 0 (inclusive) and 1 (exclusive).
  // Multiplying it by (max - min + 1) scales this number to the range [0, max - min + 1).
  // Adding min shifts this range to [min, max + 1).
  // Math.floor() rounds down to the nearest whole number, resulting in a final range of [min, max].
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utility function to get the current time in milliseconds since the UNIX epoch (January 1, 1970),
// and add a specific interval to it. The resulting timestamp is used to determine when the next
// state transition should occur for a mole.
function getSadInterval() {
  return Date.now() + 1500; // 1.5 seconds
}

function getLeavingInterval() {
  return Date.now() + 500; // 0.5 seconds
}

// Generates a random interval between 0.5 and 2 seconds, and adds it to the current time.
// This timestamp will determine when the mole should reappear in the game.
function getGoneInterval() {
  return Date.now() + getRandomInterval(500, 2000); // Random time between 0.5 and 2 seconds
}

function getHungryInterval() {
  return Date.now() + 1500; // 1.5 seconds
}

function getFedInterval() {
  return Date.now() + 500; // 0.5 seconds
}
