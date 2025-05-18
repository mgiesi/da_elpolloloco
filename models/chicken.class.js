/**
 * Represents a chicken enemy that follows the player and can be killed by jumping on it.
 * Extends the generic Enemy class, adding walking and death animations, movement AI,
 * and attack sound effects.
 *
 * @extends Enemy
 */
class Chicken extends Enemy {
    currentImgType = 'walk';
    audioAttack;
    IMAGES_WALKING;
    IMAGES_DEAD;
    killByJumpOn = true;

    /**
     * Constructs a new Chicken. Subclasses should call init methods externally to
     * load images and sounds before starting AI loops.
     */
    constructor() {
        super();
    }

    /**
     * Starts the movement loop: the chicken will walk toward the player’s x-position.
     * When dead, it stops moving.
     *
     * @private
     */
    move() {
        setStoppableInterval(() => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.isDead()) {
                return;
            }
            this.handleMovement();
        }, ANIMATION_INTERVAL);
    }

    /**
     * Handles thechicken movement based on its state.
     * @private
     */
    handleMovement() {
        if (this.world.character.x < this.x) {
            this.mirrorY = false;
            this.moveLeft();
        } else {
            this.mirrorY = true;
            this.moveRight();
        }
    }

    /**
     * Starts the animation loop: displays walking frames when alive,
     * or plays the death animation once when dead.
     *
     * @private
     */
    animate() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.isDead()) {
                this.animateDead();
            } else {
                this.animateWalking();
            }            
        }, ANIMATION_INTERVAL);
    }

    /**
     * Displays the dead animation once.
     */
    animateDead() {
        this.setImgType('dead');
        this.displayNextImageOnce();
    }

    /**
     * Displays the walking animation frames.
     */
    animateWalking() {
        this.setImgType('walk');
        this.displayNextImage();
    }

    /**
     * Handles being attacked: rewinds the attack sound to an appropriate timestamp
     * and plays it (if sounds are enabled).
     */
    attacked() {
        this.audioAttack.currentTime = 2.5;
        if (this.world.playSounds) {
            this.audioAttack.play();
        }
    }
}