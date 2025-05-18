/**
 * Represents the main playable character, extending MovableObject.
 * Handles movement, jumping, animations, item collection, and sound effects.
 *
 * @extends MovableObject
 */
class Character extends MovableObject {
    width = 150;
    height = 250;
    currentImgType = 'idle';
    speed = 10;
    acceleration = 0.5;
    coins = 0;
    bottles = [];
    sleepTimeout = 5000;
    audioWalk;
    audioSleep;
    lastKeyPress;
    lastSpaceState;
    offset_x = 100;
    targetOffset_x = 100;
    /**
     * Collision box insets.
     * @type {{ top: number, right: number, bottom: number, left: number }}
     */
    offset = {
        top: 120,
        right: 50,
        bottom: 10,
        left: 30
    };

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEP = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALK = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMP = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Constructs the character, loads images and audio, and sets initial position.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALK[0])
        this.loadImages('idle', this.IMAGES_IDLE, 250);
        this.loadImages('sleep', this.IMAGES_SLEEP, 350);
        this.loadImages('walk', this.IMAGES_WALK, 100);
        this.loadImages('jump', this.IMAGES_JUMP, 150);
        this.loadImages('dead', this.IMAGES_DEAD, 100);
        this.loadImages('hurt', this.IMAGES_HURT, 100);
        this.initAudio(); 
        this.initPosition();
    }

    /**
     * Initializes character state at the start of a level.
     */
    init() {
        this.loadImage(this.IMAGES_WALK[0])
        this.lastKeyPress = Date.now();
        this.x = 0;
        this.offset_x = 100;
        this.targetOffset_x = 100;
        this.mirrorY = false;
        this.initGameObjects();
        this.move();
        this.animate();
        this.gravity();
        this.initGameLevel();
    }

    /**
     * Initializes game objects, including coins and bottles.
     * @private
     */
    initGameObjects() {
        this.coins = 0;
        this.bottles = [];
        this.setImgType('idle');
    }

    /**
     * Loads audio elements for walking and sleeping.
     * @private
     */
    initAudio() {        
        this.audioWalk = new Audio('./audio/walk.mp3');
        this.audioSleep = new Audio('./audio/sleep.mp3');
    }

    /**
     * Sets the character's initial vertical position on the ground.
     * @private
     */
    initPosition() {
        this.groundY = 480 - this.height - 50;
        this.y = this.groundY; 
    }

    /**
     * Configures max energy based on global game level difficulty.
     * @private
     */
    initGameLevel() {
        switch (gameLevel) {
            case 'easy':
                this.maxenergy = 300;
                break;
            case 'medium':
                this.maxenergy = 200;
                break;
            case 'hard':
                this.maxenergy = 100;
                break;
        }
        this.energy = this.maxenergy;
    }

    /**
     * Resets energy to the level-based maximum.
     */
    resetEnergy() {
        this.initGameLevel();
    }

    /**
     * Starts gravity and jump detection loop.
     * @private
     */
    gravity() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.isDead()) {
                return;
            }
            if (this.world.keyboard.UP && !this.isJumping) {
                this.jump();
            }
            this.gravityJump();
        }, ANIMATION_INTERVAL);
    }

    /**
     * Starts movement loop, handling left/right keys, camera follow, and walk sound.
     * @private
     */
    move() {
        setStoppableInterval( () => {
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
     * Handles character movement based on keyboard input.
     */
    handleMovement() {
        let tmpMoveRight = this.world.keyboard.RIGHT && this.world.level.canMoveRight(this.x);
        let tmpMoveLeft = this.world.keyboard.LEFT && this.x > 0;
        if (tmpMoveRight) {
            this.moveRight();
        } else if (tmpMoveLeft) {
            this.moveLeft();
        } else {
            this.audioWalk.pause();
            this.audioWalk.currentTime = 0;
        }
        if (Math.abs(this.world.camera_x) < this.world.level.door.x + 100 || tmpMoveLeft) {
            this.world.camera_x = -this.x + this.offset_x;
        }
    }

    /**
     * Moves character to the right, plays walk sound, and adjusts camera offset.
     * @override
     */
    moveRight() {
        this.mirrorY = false;
        if (this.world.playSounds) {
            this.audioWalk.play();
        }
        super.moveRight();
        this.targetOffset_x = 100;
        if (this.offset_x > this.targetOffset_x) {
            this.offset_x -= this.speed*3;
        }
    }

    /**
     * Moves character to the left, plays walk sound, and adjusts camera offset.
     * @override
     */
    moveLeft() {
        this.mirrorY = true;
        if (this.world.playSounds) {
            this.audioWalk.play();
        }
        super.moveLeft();
        this.targetOffset_x = this.world.canvas.width - this.width - 100;
        if (this.offset_x < this.targetOffset_x) {
            this.offset_x += this.speed*3;
        }
    }

    /**
     * Starts animation loop for idle, walk, jump, hurt, and death states, and
     * detects bottle throws on spacebar press.
     * @private
     */
    animate() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.isDead()) {
                this.animateDead();
            } else if (this.isHurt()) {
                this.animateHurt();
            } else if (this.isJumpAnimation) {
                this.animateJump();
            } else if (!this.isJumpAnimation) {
                this.checkAnimateJump();
            }
            if (this.world.keyboard.SPACE && !this.lastSpaceState) {
                   this.throwBottle();
            }
            this.lastSpaceState = this.world.keyboard.SPACE;
        }, ANIMATION_INTERVAL);        
    }

    /**
     * Plays death animation then transitions to game over.
     * @private
     */
    animateDead() {
        this.setImgType('dead');
        this.displayNextImageOnce();
        if (this.animationDone) {
            navigateTo('gameover');
            this.world.stopGame();
        }
    }

    /**
     * Plays hurt animation and resets hurt flag when done.
     * @private
     */
    animateHurt() {
        this.resetSleep();
        this.setImgType('hurt');
        if (this.displayNextImageOnce()) {
            this.isHurtAnimation = false;
        }
    }

    /**
     * Plays jump animation.
     * @private
     */
    animateJump() {
        this.resetSleep();
        this.setImgType('jump');
        this.displayNextImage()
    }

    /**
     * Determines whether to play walk, idle, or sleep animation based on input and timing.
     * @private
     */
    checkAnimateJump() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.resetSleep();
            this.setImgType('walk');
        } else {
            if (Date.now() - this.lastKeyPress > this.sleepTimeout) {
                this.setSleep();
                this.setImgType('sleep');
            } else {
                this.setImgType('idle');
            }
        } 
        this.displayNextImage(); 
    }

    /**
     * Increments coin count.
     */
    addCoin() {
        this.coins++;
    }

    /**
     * Adds a bottle to the character's inventory.
     * @param {Bottle} bottle - The bottle to add.
     */
    addBottle(bottle) {
        this.bottles.push(bottle);
    }

    /**
     * Throws the last collected bottle, if any.
     */
    throwBottle() {
        let bottle = this.bottles.pop();
        if (bottle) {
            bottle.throw();
        }
    }
    
    /**
     * Determines if the character has landed on top of another object.
     *
     * @param {Object} obj - Target object with x, y, width, height, offset, visible, and isDead().
     * @returns {boolean} True if a valid downward collision from above.
     */
    isJumpedOn(obj) {
        let x1 = (this.x + (this.mirrorY ? this.offset.left : this.offset.right));
        let x2 = (this.x + this.width - (this.mirrorY ? this.offset.left : this.offset.right));
        let xx1 = obj.x + obj.offset.left;
        let xx2 = obj.x + obj.width - obj.offset.right;
        let condition1 = x1 <= xx1 && x2 >= xx2;
        let condition2 = x2 >= xx1 && x2 <= xx2;
        let condition3 = x1 >= xx1 && x1 <= xx2;
        let by1 = (this.y + this.height + this.offset.bottom) >= obj.y + obj.offset.top;
        let by2 = (this.y + this.height + this.offset.bottom) <= (obj.y + obj.offset.top + 30);
        return obj.visible &&
               !obj.isDead() && 
               this.speedY < 0 &&
               (condition1 || condition2 || condition3) && by1 && by2;
    }

    /**
     * Triggers sleep sound if appropriate.
     * @private
     */
    setSleep() {
        if (this.world.playSounds && this.audioSleep.paused) {
            this.audioSleep.currentTime = 0.5;
            this.audioSleep.play();
        }
    }

    /**
     * Resets inactivity timer and pauses sleep sound.
     * @private
     */
    resetSleep() {
        this.lastKeyPress = Date.now();
        if (this.world.playSounds) {
            this.audioSleep.pause();
        }
    }

    /**
     * Handles taking damage and pauses movement sounds if dead.
     * @override
     * @param {number} hitpoints - Damage to apply.
     */
    hit(hitpoints) {
        super.hit(hitpoints);
        if (this.energy < 0) {
            this.audioSleep.pause();
            this.audioWalk.pause();
        }
    }

    /**
     * Pauses any ongoing sleep sound.
     */
    pause() {
        this.audioSleep.pause();
    }
}