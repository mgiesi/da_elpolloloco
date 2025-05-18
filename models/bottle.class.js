/**
 * Represents a throwable bottle in the game, extending the base MovableObject.
 * Bottles can be picked up, thrown, fall under gravity, and play splash animations and sounds.
 *
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    width = 80;
    height = 80;
    centerX;
    centerY;
    hitpoints = 10;

    speedY;

    initX;
    initY;
    speedX;

    audioCollected;
    audioSplash;
    audioThrow;

    state;

    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Collision offsets for fine-tuned hit detection.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 10,
        right: 30,
        bottom: 10,
        left: 30
    };

    /**
     * Initializes a new Bottle at the given position, loads images and sounds,
     * and starts its animation and gravity loops.
     *
     * @param {number} x - The x-coordinate where the bottle spawns.
     * @param {number} y - The y-coordinate where the bottle spawns.
     */
    constructor(x, y) {
        super();
        this.loadImages('bottle', this.IMAGES_BOTTLE, 150);
        this.loadImages('splash', this.IMAGES_SPLASH, 100);
        this.initAudio();
        this.initPosition(x, y);
        this.initBottle();
        this.animate();
        this.gravity();
    }

    /**
     * Loads audio clips for collection, throw, and splash events.
     * @private
     */
    initAudio() {        
        this.audioCollected = new Audio('./audio/bottle.mp3');
        this.audioThrow = new Audio('./audio/throw.mp3');
        this.audioSplash = new Audio('./audio/splash.mp3');
    }

    /**
     * Stores the initial spawn position.
     * @param {number} x - Initial x-coordinate.
     * @param {number} y - Initial y-coordinate.
     * @private
     */
    initPosition(x, y) {
        this.initX = x;
        this.initY = y;
    }

    /**
     * Resets the bottle to its idle state at its initial position
     * and prepares it for throwing.
     * @private
     */
    initBottle() {
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.acceleration = 0.5;
        this.animationDone = false;
        this.currentImgType = undefined;
        this.state = 'idle';
        this.x = this.initX;
        this.y = this.initY;
        this.groundY = 480 - this.height - 25;
    }

    /**
     * Starts the animation loop that updates the bottle's sprite frame
     * or splash sequence based on its current state.
     * @private
     */
    animate() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.state === 'splash') {
                this.animateSplash();
            } else {                
                this.displayNextImage();
            }
        }, ANIMATION_INTERVAL);
    }

    /**
     * Plays the splash animation once, then re-initializes the bottle.
     * @private
     */
    animateSplash() {
        this.displayNextImageOnce();
        if (this.animationDone) {
            this.initBottle();
        }
    }

    /**
     * Handles the bottle being collected by the player:
     * plays a sound, hides the sprite, and updates state.
     */
    collected() {
        if (this.world.playSounds) {
            this.audioCollected.play();
        }
        this.setVisible(false);
        this.state = 'collected';
    }

    /**
     * Checks if the bottle is in its idle state.
     * @returns {boolean} True if idle, false otherwise.
     */
    isIdle() {
        return this.state === 'idle';
    }

    /**
     * Checks if the bottle has been thrown and is in flight.
     * @returns {boolean} True if thrown, false otherwise.
     */
    isThrown() {
        return this.state === 'thrown';
    }

    /**
     * Starts the gravity loop to update vertical motion
     * when the bottle is thrown.
     * @private
     */
    gravity() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.state === 'thrown') {
                this.gravityFly();
            }
            this.lastSpaceState = this.world.keyboard.SPACE;
        }, ANIMATION_INTERVAL);
    }

    /**
     * Throws the bottle from the character's position,
     * sets initial speeds, makes it visible, and plays throw sound.
     */
    throw() {
        this.speedY = 8;
        this.speedX = world.character.mirrorY ? -8 : 8;
        this.x = world.character.x + this.world.character.width/2;
        this.y = world.character.y + 75;
        this.setVisible(true);
        this.state = 'thrown';
        this.setImgType('bottle');
        if (this.world.playSounds) {
            this.audioThrow.play();
        }
    }

    /**
     * Transitions the bottle into its splash state,
     * plays splash sound, and switches to the splash image set.
     */
    splash() {
        this.state = 'splash'
        this.setImgType('splash');
        if (this.world.playSounds) {
            this.audioSplash.currentTime = 0.5;
            this.audioSplash.play();
        }
    }

    /**
     * Applies gravity to the thrown bottle, updating its position,
     * and triggers a splash when it hits the ground.
     * @private
     */
    gravityFly() {
        if (this.state !== 'thrown') {
            return;
        }
        if (this.y < this.groundY || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
        if (this.y >= this.groundY) {
            this.splash();
        } else {
            this.x += this.speedX;
        }
    }  
}