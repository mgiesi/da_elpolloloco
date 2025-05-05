class ChickenNormal extends Chicken {
    width = 80;
    height = 80;
    speed = 0.5 + Math.random();
    hitpoints = 2;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages('walk', this.IMAGES_WALKING, 150);
        this.loadImages('dead', this.IMAGES_DEAD, 150);

        this.audioAttack = new Audio('./audio/chickenattack.mp3');

        this.x = x;
        this.y = 480 - this.height - 55;

        this.move();
        this.animate();
    }

    kill() {
        this.y = 480 - this.height - 40;
        super.kill();
    }
}