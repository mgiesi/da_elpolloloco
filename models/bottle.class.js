class Bottle extends MovableObject {
    width = 80;
    height = 80;
    centerX;
    centerY;
    hitpoints = 10;

    audioCollected;

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
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages('bottle', this.IMAGES_BOTTLE);
        this.loadImages('splash', this.IMAGES_SPLASH);

        this.audioCollected = new Audio('./audio/bottle.mp3');

        this.x = x;
        this.y = y;

        this.animate();
    }

    animate() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            this.displayNextImage();
        }, 150);
    }

    collected() {
        this.audioCollected.play();
        this.setVisible(false);
    }
}