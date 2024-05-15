// Purpose: This file contains the Player class which is used to create a player object with the following properties:
// 1. Name
// 2. Ships
// 3. Missed shots
// 4. Hits
// 5. Sunk ships
// 6. Remaining ships
// The Player class also contains the following methods:
// 1. checkHitOrMiss: This method checks if the cell clicked is a hit or a miss.
// 2. hit: This method is called when a ship is hit. It removes the sunk ship from the ships array and updates the hits, remaining ships, and sunk ships count.
// 3. miss: This method is called when a shot is missed. It updates the missed shots count.
class Player {
  constructor(name, ship1, ship2, ship3, ship4, ship5) {
    // Initialize the number of missed shots, hits, sunk ships, and remaining ships
    this.name = name;
    this.ships = [ship1, ship2, ship3, ship4, ship5];
    this.missedShots = 0;
    this.hits = 0;
    this.sunkShips = [];
    this.remainingShips = this.ships.length;
  }

  // Function to check if the cell clicked is a hit or a miss
  checkHitOrMiss(position) {
    const hit = this.ships.includes(position);
    return hit;
  }

  hit(position) {
    const sunkShipIndex = this.ships.findIndex((ship) => ship === position);

    console.log(sunkShipIndex, this.ships, position);
    if (sunkShipIndex !== -1) {
      const sunkShip = this.ships.splice(sunkShipIndex, 1);
      this.hits += 1;
      this.remainingShips -= 1;
      this.sunkShips.push(sunkShip[0]);
    }

    return this.remainingShips;
  }

  miss() {
    this.missedShots += 1;
    return this.missedShots;
  }
}

export default Player;
