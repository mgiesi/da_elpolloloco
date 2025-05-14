class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    door;
    levelEndX = 700;
    world;
    endboss;

    constructor() {
    }

    canMoveRight(x) {
        if (this.door.isClosed() && x >= (this.door.x + (this.door.width/4))) {
            return false;
        }

        return x < this.levelEndX;
    }

    checkLevelEndReached(x) {
        if (x >= this.levelEndX) {
            showNextLevelScreen();
        }
    }
}