/**
 * Represents a generic enemy in the game world, extending MovableObject.
 * Enemies have hitpoints, can be killed (optionally) by jumping on them,
 * and track a dead state.
 *
 * @extends MovableObject
 */
class Enemy extends MovableObject {
    hitpoints = 2;
    killByJumpOn = false;
    dead = false;
    
    /**
     * Sets the game level parameters for hitpoints, max energy, and speed.
     * @param {number} lvlHitpoints 
     * @param {number} lvlMaxEnergy 
     * @param {number} lvlSpeed 
     */
    setGameLevel(lvlHitpoints, lvlMaxEnergy, lvlSpeed) {        
        this.hitpoints = lvlHitpoints;
        this.maxenergy = lvlMaxEnergy;                
        this.speed = lvlSpeed;
    }

    /**
     * Called when the player jumps on this enemy.
     * If killByJumpOn is enabled, the enemy is killed.
     */
    jumpedOn() {
        if (this.killByJumpOn) {
            this.kill();
        }
    }

    /**
     * Kills the enemy by setting its energy to zero and marking it dead.
     */
    kill() {
        this.energy = 0;
    }
    
    /**
     * Pauses any ongoing sounds.
     */
    pause() {
    }
}