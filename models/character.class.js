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

    offset = {
        top: 100,
        right: 40,
        bottom: 5,
        left: 20
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

    init() {
        this.coins = 0;
        this.bottles = [];
        this.setImgType('idle');
        this.lastKeyPress = Date.now();
        this.x = 0;
        this.offset_x = 100;
        this.targetOffset_x = 100;
        this.move();
        this.animate();
        this.gravity();
        this.initGameLevel();
    }

    initAudio() {        
        this.audioWalk = new Audio('./audio/walk.mp3');
        this.audioSleep = new Audio('./audio/sleep.mp3');
    }

    initPosition() {
        this.groundY = 480 - this.height - 50;
        this.y = this.groundY; 
    }

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

    resetEnergy() {
        this.initGameLevel();
    }

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

    move() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.isDead()) {
                return;
            }
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
        }, ANIMATION_INTERVAL);
    }

    moveRight() {
        this.mirrorY = false;
        if (this.world.playSounds) {
            this.audioWalk.play();
        }
        super.moveRight();
        this.targetOffset_x = 100;
        if (this.offset_x > this.targetOffset_x) {
            this.offset_x -= this.speed/2;
        }
    }

    moveLeft() {
        this.mirrorY = true;
        if (this.world.playSounds) {
            this.audioWalk.play();
        }
        super.moveLeft();
        this.targetOffset_x = this.world.canvas.width - this.width - 100;
        if (this.offset_x < this.targetOffset_x) {
            this.offset_x += this.speed/2;
        }
    }

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

    animateDead() {
        this.setImgType('dead');
        this.displayNextImageOnce();
        if (this.animationDone) {
            navigateTo('gameover');
            this.world.stopGame();
        }
    }

    animateHurt() {
        this.resetSleep();
        this.setImgType('hurt');
        if (this.displayNextImageOnce()) {
            this.isHurtAnimation = false;
        }
    }

    animateJump() {
        this.resetSleep();
        this.setImgType('jump');
        this.displayNextImage()
    }

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

    addCoin() {
        this.coins++;
    }

    addBottle(bottle) {
        this.bottles.push(bottle);
    }

    throwBottle() {
        let bottle = this.bottles.pop();
        if (bottle) {
            bottle.throw();
        }
    }
    
    /**
     * Determines whether this entity has successfully jumped on top of the given object.
     *
     * @param {Object} obj - The target object to check collision against.
     * @param {number} obj.x - The x-coordinate of the object's top-left corner.
     * @param {number} obj.y - The y-coordinate of the object's top-left corner.
     * @param {number} obj.width - The width of the object.
     * @param {number} obj.height - The height of the object.
     * @param {Object} obj.offset - Pixel offsets applied to the object's collision bounds.
     * @param {number} obj.offset.left - Left inset from the object's x position.
     * @param {number} obj.offset.right - Right inset from the object's right edge.
     * @param {number} obj.offset.top - Top inset from the object's y position.
     * @param {number} obj.offset.bottom - Bottom inset from the object's bottom edge.
     * @param {boolean} obj.visible - Whether the object is currently visible.
     * @param {Function} obj.isDead - Function returning true if the object is considered “dead.”
     * @returns {boolean} True if this entity is above the object, moving downward, visible, and within the collision thresholds; otherwise false.
     */
    isJumpedOn(obj) {
        let bx1 = (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left;
        let bx2 = (this.x + this.width - this.offset.right) <= obj.x + obj.width - obj.offset.right;
        let bx3 = (this.x + this.offset.left) >= (obj.x + obj.offset.left);
        let bx4 = (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right);
        let by1 = (this.y + this.height + this.offset.bottom) >= obj.y + obj.offset.top;
        let by2 = (this.y + this.height + this.offset.bottom) <= (obj.y + obj.offset.top + 30);
        return obj.visible &&
               !obj.isDead() && 
               this.speedY < 0 &&
               ((bx1 && bx2) || (bx3 && bx4)) && by1 && by2;
    }

    setSleep() {
        if (this.world.playSounds && this.audioSleep.paused) {
            this.audioSleep.currentTime = 0.5;
            this.audioSleep.play();
        }
    }

    resetSleep() {
        this.lastKeyPress = Date.now();
        if (this.world.playSounds) {
            this.audioSleep.pause();
        }
    }

    hit(hitpoints) {
        super.hit(hitpoints);
        if (this.energy < 0) {
            this.audioSleep.pause();
            this.audioWalk.pause();
        }
    }
}