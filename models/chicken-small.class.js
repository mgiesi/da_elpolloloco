class ChickenSmall extends Chicken {
    width = 50;
    height = 50;
    speed = 0.3 + Math.random();
    hitpoints = 1;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages('walk', this.IMAGES_WALKING);
        this.loadImages('dead', this.IMAGES_DEAD);

        this.audioAttack = new Audio('./audio/chickenattack.mp3');

        this.x = 500 + Math.random() * 300;
        this.y = 480 - this.height - 60;

        this.animate();
    }

    kill() {
        this.y = 480 - this.height - 50;
        super.kill();
    }
}