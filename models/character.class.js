class Character extends MovableObject {
    width = 150;
    height = 250;
    currentImgType = 'idle';
    speed = 10;
    acceleration = 0.5;
    coins = 0;

    audioWalk;
    audioCoin;

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
        this.loadImages('idle', this.IMAGES_IDLE);
        this.loadImages('walk', this.IMAGES_WALK);
        this.loadImages('jump', this.IMAGES_JUMP);
        this.loadImages('dead', this.IMAGES_DEAD);
        this.loadImages('hurt', this.IMAGES_HURT);
        this.audioWalk = new Audio('./audio/walk.mp3');
        this.audioCoin = new Audio('./audio/coin.mp3');
        this.groundY = 480 - this.height - 50;
        this.y = this.groundY;

        this.move();
        this.animate();
        this.gravity();
    }

    gravity() {
        setInterval( () => {
            if (this.isDead()) {
                return;
            }
            if (this.world.keyboard.UP && !this.isJumping) {
                this.jump();
            }
            this.gravityJump();
        }, 1000/60);
    }

    move() {
        setInterval( () => {
            if (this.isDead()) {
                return;
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.mirrorY = false;
                this.audioWalk.play();
                this.moveRight();
            } else if (this.world.keyboard.LEFT && this.x > 0) {
                this.mirrorY = true;
                this.audioWalk.play();
                this.moveLeft();
            } else {
                this.audioWalk.pause();
                this.audioWalk.currentTime = 0;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000/60);
    }

    animate() {
        setInterval( () => {
            if (this.isDead()) {
                this.setImgType('dead');
                this.displayNextImageOnce();
            }
            else if (this.isHurt()) {
                this.setImgType('hurt');
                if (this.displayNextImageOnce()) {
                    this.isHurtAnimation = false;
                }
            } else if (!this.isJumpAnimation) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.setImgType('walk');
                } else {
                    this.setImgType('idle');
                } 
                this.displayNextImage(); 
            }
        }, 100);
        setInterval( () => {
            if (this.isDead()) {
                return;
            }
            if (this.isJumpAnimation) {
                this.setImgType('jump');
                this.displayNextImage()
            } 
        }, 150);
        
    }

    addCoin() {
        this.coins++;
        this.audioCoin.play();
    }
}