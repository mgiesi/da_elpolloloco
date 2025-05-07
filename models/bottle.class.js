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

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    constructor(x, y) {
        super();
        this.loadImages('bottle', this.IMAGES_BOTTLE, 150);
        this.loadImages('splash', this.IMAGES_SPLASH, 100);

        this.audioCollected = new Audio('./audio/bottle.mp3');
        this.audioThrow = new Audio('./audio/throw.mp3');
        this.audioSplash = new Audio('./audio/splash.mp3');
        this.initX = x;
        this.initY = y;

        this.initBottle();
        this.animate();
        this.gravity();
    }

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

    animate() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.state === 'splash') {
                this.displayNextImageOnce();
                if (this.animationDone) {
                    this.initBottle();
                }
            } else {                
                this.displayNextImage();
            }
        }, ANIMATION_INTERVAL);
    }

    collected() {
        if (this.world.playSounds) {
            this.audioCollected.play();
        }
        this.setVisible(false);
        this.state = 'collected';
    }

    isIdle() {
        return this.state === 'idle';
    }

    isThrown() {
        return this.state === 'thrown';
    }

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

    splash() {
        this.state = 'splash'
        this.setImgType('splash');
        if (this.world.playSounds) {
            this.audioSplash.currentTime = 0.5;
            this.audioSplash.play();
        }
    }

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