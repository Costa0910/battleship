class Player {
  constructor(name, ship1, ship2, ship3, ship4, ship5) {
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
    // console.log(hit, position, this.ships);
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
