/**
 * Represents a game level, containing all entities and logic for movement boundaries
 * and level completion.
 */
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

    /**
     * Initializes a new Level.
     * (Properties should be populated externally after construction.)
     */
    constructor() {
    }

    /**
     * Determines whether the player (or camera) may move further to the right.
     * Prevents movement past the closed door or beyond the level end boundary.
     *
     * @param {number} x - The proposed new x-coordinate of the player/camera.
     * @returns {boolean} True if moving right is allowed, false otherwise.
     */
    canMoveRight(x) {
        if (this.door.isClosed() && x >= (this.door.x + (this.door.width/4))) {
            return false;
        }
        return x < this.levelEndX;
    }

    /**
     * Checks if the player has reached or passed the level end boundary,
     * and triggers the transition to the next level if so.
     *
     * @param {number} x - The current x-coordinate of the player.
     */
    checkLevelEndReached(x) {
        if (x >= this.levelEndX) {
            showNextLevelScreen();
        }
    }
}