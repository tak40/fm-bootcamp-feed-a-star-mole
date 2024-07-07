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

// Array to hold the moles
const moles = [];

// Function to initialize moles
function initializeMoles() {
  for (let i = 0; i < 10; i++) {
    moles.push({
      id: i,
      state: "gone", // Initial state
      next: getGoneInterval(), // Initial timing
      king: Math.random() > 0.9, // 10% chance to be a king mole
    });
  }
}

// Call the function to initialize moles
initializeMoles();

function showMole(mole) {
  const now = Date.now();

  if (mole.state === "gone" && now > mole.next) {
    mole.state = "hungry";
    mole.next = getHungryInterval();
  } else if (mole.state === "hungry" && now > mole.next) {
    mole.state = "sad";
    mole.next = getSadInterval();
  } else if (mole.state === "sad" && now > mole.next) {
    mole.state = "leaving";
    mole.next = getLeavingInterval();
  } else if (mole.state === "leaving" && now > mole.next) {
    mole.state = "gone";
    mole.next = getGoneInterval();
  }

  renderMole(mole);
}

// Function to render moles (placeholder for actual DOM manipulation)
function renderMole(mole) {
  const moleElement = document.querySelector(`#hole-${mole.id} .mole`);
  if (mole.state === "gone" || mole.state === "leaving") {
    moleElement.classList.add("hidden");
  } else {
    moleElement.classList.remove("hidden");
    moleElement.src = `assets/${mole.king ? "king-" : ""}mole-${
      mole.state
    }.png`;
  }
}

// Game loop to update the state of each mole
function gameLoop() {
  const now = Date.now();
  moles.forEach((mole) => {
    if (now > mole.next) {
      showMole(mole);
    }
  });
  requestAnimationFrame(gameLoop);
}

// Start the game loop
// requestAnimationFrame(gameLoop);
