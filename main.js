import Player from "./player.js";
import BattleShipGame from "./BattleShipGame.js";
// Grid cells
const cells = document.querySelectorAll(".grid-cell");

const playerInfoBox = document.getElementById("playersBox");
// Form and input fields
const form = document.getElementById("player-info");
// Input fields for player names and ships
const player1Name = document.getElementById("player1-name");
const player2Name = document.getElementById("player2-name");
const player1Ships = document.getElementById("player1-ships");
const player2Ships = document.getElementById("player2-ships");

// Event listener for the form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkUserInput()) {
    const player1 = new Player(
      player1Name.value,
      ...player1Ships.value.split(",")
    );
    const player2 = new Player(
      player2Name.value,
      ...player2Ships.value.split(",")
    );
    const battleShipGame = new BattleShipGame(player1, player2);
    battleShipGame.startGame();

    // Hide the player info box
    playerInfoBox.style.display = "none";
  } else {
    alert(`Please enter valid input. Make sure this criteria are met:
    1. Player names and ships are not empty.
    2. There are exactly 5 ships for each player.
    3. The ships location are unique.
    4. The ships are in the format A1,'B2', etc.`);
  }
});

// Function to check if the user input is valid
function checkUserInput() {
  if (
    player1Name.value === "" ||
    player2Name.value === "" ||
    player1Ships.value === "" ||
    player2Ships.value === ""
  ) {
    return false;
  }

  // Split the input string and check if it is valid
  const player1ShipsArray = player1Ships.value
    .split(",")
    .map((ship) => ship.trim())
    .map((ship) => ship.toUpperCase());
  const player2ShipsArray = player2Ships.value
    .split(",")
    .map((ship) => ship.trim())
    .map((ship) => ship.toUpperCase());
  const validShips = ["A", "B", "C", "D", "E"];
  const validPositions = ["1", "2", "3", "4", "5"];

  if (
    player1ShipsArray.length !== 5 ||
    player2ShipsArray.length !== 5 ||
    player1ShipsArray.some(
      (ship) =>
        !validShips.includes(ship[0]) || !validPositions.includes(ship[1])
    ) ||
    player2ShipsArray.some(
      (ship) =>
        !validShips.includes(ship[0]) || !validPositions.includes(ship[1])
    )
  ) {
    return false;
  }

  // Check if the ships are unique
  const uniqueShips1 = new Set(player1ShipsArray); // Set only allows unique values
  const uniqueShips2 = new Set(player2ShipsArray);
  if (uniqueShips1.size !== 5 || uniqueShips2.size !== 5) {
    return false;
  }

  // If all the conditions are met, return true
  return true;
}

// Start the game Over again
const restartButton = document.getElementById("startOver");
restartButton.addEventListener("click", () => {
  location.reload();
});
