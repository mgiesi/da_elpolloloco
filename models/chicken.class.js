class Chicken extends Enemy {
    width = 80;
    height = 80;
    speed = 0.5 + Math.random();
    currentImgType = 'walk';
    hitpoints = 2;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages('walk', this.IMAGES_WALKING);

        this.x = 250 + Math.random() * 300;
        this.y = 480 - this.height - 55;

        this.animate();
    }

    animate() {
        setInterval( () => {
            this.displayNextImage();
        }, 150);
        
        setInterval(() => {
            this.moveLeft();
            if (this.x < -this.width) {
                this.x = 720;
            }
        }, 1000 / 60);  
    }
}