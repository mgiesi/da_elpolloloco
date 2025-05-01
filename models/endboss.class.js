class Endboss extends Enemy {
    width = 320;
    height = 320;
    speed = 0.5 + Math.random();
    currentImgType = 'alert';
    hitpoints = 4;

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor(x) {
        super().loadImage(this.IMAGES_ALERT[0])
        this.loadImages('alert', this.IMAGES_ALERT, 150);

        this.x = x;
        this.y = 480 - this.height - 35;

        this.animate();
    }

    animate() {
        setStoppableInterval( () => {
            this.displayNextImage();
        }, ANIMATION_INTERVAL);      
    }
}