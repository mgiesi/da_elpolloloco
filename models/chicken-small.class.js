class ChickenSmall extends Chicken {
    width = 50;
    height = 50;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
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
        this.y = 480 - this.height - 60;
    }

    initGameLevel() {
        switch (gameLevel) {
            case 'easy':
                this.hitpoints = 1;
                this.maxenergy = 5;                
                this.speed = 0.3 + Math.random();
                break;
            case 'medium':
                this.hitpoints = 4;
                this.maxenergy = 15;
                this.speed = 0.5 + Math.random();
                break;
            case 'hard':
                this.hitpoints = 8;
                this.maxenergy = 30;
                this.speed = 0.6 + Math.random();
                break;
        }
        this.energy = this.maxenergy;
    }

    kill() {
        this.y = 480 - this.height - 50;
        super.kill();
    }
}