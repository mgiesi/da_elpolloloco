/**
 * Represents a movable object in the game world, extending the base DrawableObject.
 * Provides support for horizontal movement, jumping with gravity, collision detection,
 * and energy/hurt mechanics.
 *
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {    
    speed;
    speedY;
    speedX;
    groundY;
    acceleration;
    mirrorY = false;

    maxenergy = 100;
    energy = this.maxenergy;

    isJumping;
    isJumpAnimation;

    isHurtAnimation;

    /**
     * Offsets for collision detection (in pixels).
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Constructs a new MovableObject.
     */
    constructor() {
        super();
    }

    /**
     * Determines if this object is colliding with another.
     *
     * @param {DrawableObject & { offset: { top: number, left: number, right: number, bottom: number }, isDead: () => boolean, visible: boolean }} obj
     *   Another drawable object with collision offsets and visibility.
     * @returns {boolean} True if the two objects overlap and the other is alive and visible.
     */
    isColliding(obj) {
        return obj.visible &&
               !obj.isDead() &&
               (this.x + this.width - (this.mirrorY ? this.offset.left : this.offset.right)) >= obj.x + obj.offset.left && 
               (this.y + this.height + this.offset.bottom) >= obj.y + obj.offset.top &&
               (this.x + (this.mirrorY ? this.offset.right : this.offset.left)) <= (obj.x + obj.width - obj.offset.right) &&
               (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom);
    }

    /**
     * Applies damage to this object, reducing its energy and triggering the hurt animation.
     *
     * @param {number} hitpoints - Amount of energy to subtract.
     */
    hit(hitpoints) {
        this.isHurtAnimation = true;
        this.energy -= hitpoints;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    /**
     * Placeholder for handling an attack action.
     * Intended to be overridden by subclasses.
     */
    attacked() {
        // to be implemented by subclasses
    }

    /**
     * Checks if the object has no energy left.
     *
     * @returns {boolean} True if energy is zero or below.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Checks if the hurt animation is currently active.
     *
     * @returns {boolean} True if the object is in a hurt animation.
     */
    isHurt() {
        return this.isHurtAnimation;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump: sets jump flags and initial vertical speed.
     */
    jump() {
        this.isJumping = true;
        this.isJumpAnimation = true;
        this.speedY = 14;
    }

    /**
     * Updates vertical position under gravity during a jump.
     * Stops the jump animation when ground is reached and resets flags.
     *
     * @private
     */
    gravityJump() {
        if (this.y < this.groundY || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
        if (this.y >= this.groundY) {
            this.isJumpAnimation = false;
            this.y = this.groundY;
        }
        if (this.y >= this.groundY && !this.world.keyboard.UP) {
            this.isJumping = false;
        }
    }    
}