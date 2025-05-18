/**
 * Represents a moving cloud in the background, extending the base MovableObject.
 * Clouds drift left across the screen and wrap around when they leave the viewport.
 *
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.8;

    /**
     * Creates a new Cloud instance at the given horizontal position,
     * loading the specified cloud image and starting its automatic movement.
     *
     * @param {number} x - The initial x-coordinate where the cloud spawns.
     * @param {number|string} imgIdx - The index or identifier of the cloud image file
     *                                 (appended to the image path).
     */
    constructor(x, imgIdx) {
        super().loadImage('./img/5_background/layers/4_clouds/' + imgIdx + '.png')
        this.initPosition(x);        
        this.move();
    }

    /**
     * Sets the horizontal position of the cloud.
     *
     * @param {number} x - The x-coordinate to position the cloud at.
     * @private
     */
    initPosition(x) {
        this.x = x;
    }

    /**
     * Starts the automatic movement loop, moving the cloud left at each animation interval.
     * When the cloud moves completely off the left side of the screen, it wraps around
     * to just beyond the level's right boundary.
     *
     * @private
     */
    move() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            this.moveLeft();
            if (this.x < -this.width) {
                this.x = this.world.level.levelEndX + this.width;
            }
        }, ANIMATION_INTERVAL);
    }
}