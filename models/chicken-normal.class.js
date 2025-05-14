class ChickenNormal extends Chicken {
    width = 80;
    height = 80;

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
        this.initGameLevel();
        this.initAudio();
        this.initPosition(x);
        this.move();
        this.animate();
    }

    initAudio() {        
        this.audioAttack = new Audio('./audio/chickenattack.mp3');
    }

    initPosition(x) {
        this.x = x;
        this.y = 480 - this.height - 55;
    }

    initGameLevel() {
        switch (gameLevel) {
            case 'easy':
                this.hitpoints = 2;
                this.maxenergy = 5;
                this.speed = 0.5 + Math.random();
                break;
            case 'medium':
                this.hitpoints = 8;
                this.maxenergy = 20;
                this.speed = 0.6 + Math.random();
                break;
            case 'hard':
                this.hitpoints = 15;
                this.maxenergy = 30;
                this.speed = 0.7 + Math.random();
                break;
        }
        this.energy = this.maxenergy;
    }

    kill() {
        this.y = 480 - this.height - 40;
        super.kill();
    }
}