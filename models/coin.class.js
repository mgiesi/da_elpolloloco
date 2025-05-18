/**
 * Represents a collectible coin in the game world, extending the base MovableObject.
 * Coins pulsate in size and can be collected by the player, playing a sound and becoming invisible.
 *
 * @extends MovableObject
 */
class Coin extends MovableObject {
    width = 140;
    height = 140;
    scaledMax = 155;
    scaledMin = 125;
    scaleFactor = 0.45;
    scaleUp=true;
    centerX;
    centerY;
    audioCollected;

    /**
     * Offsets for collision detection (in pixels).
     * @type {{ top: number, right: number, bottom: number, left: number }}
     */
    offset = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    /**
     * Creates a new Coin at the specified position, loads its image and sound,
     * and starts its pulsating animation and centering logic.
     *
     * @param {number} x - The x-coordinate where the coin spawns.
     * @param {number} y - The y-coordinate where the coin spawns.
     */
    constructor(x, y) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.initAudio();
        this.initPosition(x, y);
        this.animate();
        this.move();
    }

    /**
     * Initializes the audio clip for the collection sound.
     * @private
     */
    initAudio() {        
        this.audioCollected = new Audio('./audio/coin.mp3');
    }

    /**
     * Sets the initial spawn position and computes the coin’s center point.
     *
     * @param {number} x - Initial x-coordinate.
     * @param {number} y - Initial y-coordinate.
     * @private
     */
    initPosition(x, y) {
        this.x = x;
        this.y = y;
        this.centerX = this.x + this.width/2;
        this.centerY = this.y + this.height/2;
    }

    /**
     * Starts the pulsating animation, oscillating the coin’s size between
     * scaledMin and scaledMax at each animation interval.
     * @private
     */
    animate() {
        setStoppableInterval( () => {
            if (this.scaleUp) {
                this.width += this.scaleFactor;
                if (this.width >= this.scaledMax) {
                    this.scaleUp = false;
                }
            } else {
                this.width -= this.scaleFactor;
                if (this.width <= this.scaledMin) {
                    this.scaleUp = true;
                }
            }
        }, ANIMATION_INTERVAL);        
    }

    /**
     * Re-centers the coin on its current center point whenever its size changes,
     * keeping it visually centered on screen.
     * @private
     */
    move() {
        setStoppableInterval( () => {
            this.x = this.centerX - this.width/2;
            this.y = this.centerY - this.height/2;
            this.height = this.width;
        }, ANIMATION_INTERVAL);  
    }

    /**
     * Handles the coin being collected by the player:
     * plays the collection sound (if enabled) and hides the coin.
     */
    collected() {
        if (this.world.playSounds) {
            this.audioCollected.play();
        }
        this.setVisible(false);
    }
}