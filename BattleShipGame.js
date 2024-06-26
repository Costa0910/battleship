// Description: This file is the entry point for the game. It will be responsible for starting the game and initializing the game board. It will also handle the game logic, such as checking player turns, checking hits or misses, and determining the winner of the game. This file will interact with the Player class to get player information and update player stats. It will also interact with the game board to update the grid based on player actions.
class BattleShipGame {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
    this.otherPlayer = player2;
    this.gameOver = false;
  }

  startGame() {
    const cells = document.querySelectorAll(".grid-cell");
    cells.forEach((cell) => {
      // Add event listener to each cell, passing the checkPlayerTurn function
      // as the callback, and binding the context to the current instance of the game
      cell.addEventListener("click", this.checkPlayerTurn.bind(this));
    });
  }

  checkPlayerTurn(event) {
    if (this.gameOver) return;

    const cellPosition = this.getPosition(event);
    const hit = this.otherPlayer.checkHitOrMiss(cellPosition);

    if (hit) {
      console.log(`It's a hit! ${this.currentPlayer.name} hit ${cellPosition}`);
      const remainingShips = this.otherPlayer.hit(cellPosition);
      this.updateGrid(cellPosition, "hit");
      this.checkGameOver(remainingShips);
    } else {
      console.log(
        `It's a miss! ${this.currentPlayer.name} missed ${cellPosition}`
      );
      this.otherPlayer.miss();
      this.updateGrid(cellPosition, "miss");
    }

    this.switchPlayers();
  }

  getPosition(event) {
    const cellPosition = event.target.dataset;
    return cellPosition.x + cellPosition.y;
  }

  updateGrid(cellPosition, result) {
    const cell = document.querySelector(
      `[data-x="${cellPosition[0]}"][data-y="${cellPosition[1]}"]`
    );

    // Add the result class to the cell
    cell.classList.add(result);

    // Add cell text to show the result
    cell.textContent = result.toUpperCase() + ": " + cellPosition.toUpperCase();

    // Remove the class after 1 second to show the result
    setTimeout(() => {
      cell.classList.remove(result);
      cell.textContent = "";
    }, 1500);
  }

  switchPlayers() {
    [this.currentPlayer, this.otherPlayer] = [
      this.otherPlayer,
      this.currentPlayer,
    ];

    console.log(
      `Switching players. It's now ${this.currentPlayer.name}'s turn`
    );
    // Update the player turn text
    if (!this.gameOver) {
      const showPlayer = document.querySelector(".show-player");
      showPlayer.textContent = `It's ${this.currentPlayer.name}'s turn`;
    }
  }

  checkGameOver(remainingShips) {
    if (remainingShips === 0) {
      console.log("Game Over");
      this.gameOver = true;
      const cells = document.querySelectorAll(".grid-cell");
      cells.forEach((cell) => {
        cell.removeEventListener("click", this.checkPlayerTurn);
        cell.style.cursor = "not-allowed";
        cell.style.backgroundColor = "grey";
      });
    }

    // Display the winner
    if (this.gameOver) {
      const showPlayer = document.querySelector(".show-player");
      showPlayer.textContent = `${this.currentPlayer.name} wins. Congratulations!`;
      this.shipsTheWinnerSunk();
    }
  }

  shipsTheWinnerSunk() {
    const winnerSunkShips = this.otherPlayer.sunkShips;

    winnerSunkShips.forEach((cell) => {
      const sunkCell = document.querySelector(
        `[data-x="${cell[0]}"][data-y="${cell[1]}"]`
      );
      sunkCell.classList.add("sunk");
    });

    const showPlayer = document.querySelector(".show-player");
    showPlayer.classList.add("winner");
  }
}

export default BattleShipGame;
