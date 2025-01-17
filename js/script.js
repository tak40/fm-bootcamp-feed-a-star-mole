// Interval and Timing Functions
// These functions generate the various time intervals used to manage the state transitions of the moles.

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

function getHungryInterval() {
  return Date.now() + 1500; // 1.5 seconds
}

function getFedInterval() {
  return Date.now() + 500; // 0.5 seconds
}

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

// Mole Initialization
// This section sets up the initial state of the moles, including their id, initial state,
// the time when they will next appear, and whether they are a king mole.

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

// Function to update the state of a mole and render the changes
// This function checks the current state of the mole and transitions it to the next state based on the current time and the next timestamp for the state change.

function showMole(mole) {
  const now = Date.now(); // Get the current time in milliseconds since the UNIX epoch

  if (mole.state === "gone" && now > mole.next) {
    mole.state = "hungry";
    mole.next = getHungryInterval();
  } else if (mole.state === "fed" && now > mole.next) {
    mole.state = "gone";
    mole.next = getGoneInterval();
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

// Function to render the mole's appearance in the DOM based on its current state
function renderMole(mole) {
  console.log(mole);
  const moleElement = document.querySelector(`#hole-${mole.id} .mole`);
  if (mole.state === "gone") {
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
requestAnimationFrame(gameLoop);

// event listener for the moles
// add point system

let score = 10;

document.querySelectorAll(".mole").forEach((moleElement) => {
  moleElement.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    const mole = moles[index];

    if (mole.state === "hungry") {
      score += mole.king ? 2 : 1;
      mole.state = "fed";
      mole.next = getFedInterval();
    }
    updateWormMeter();
  });
});

// Worm meter

const wormMeterProgress = document.querySelector(".worm-meter-progress");
const maxScore = 10;

// Function to update the worm meter
function updateWormMeter() {
  const clipValue = 100 - (score / maxScore) * 100;
  wormMeterProgress.style.clipPath = `inset(0 ${clipValue}% 0 0)`;
  wormMeterProgress.classList.remove("hidden"); // Ensure worm meter is visible
  if (score >= maxScore) {
    endGame();
  }
}

function endGame() {
  // Hide previous elements
  document.querySelector(".worm-meter").style.display = "none";
  document.querySelector(".game-board").style.display = "none";

  // Change main background to win.png
  const main = document.querySelector("main");
  main.classList.add("end-game");
}
