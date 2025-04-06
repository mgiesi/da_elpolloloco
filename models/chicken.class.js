class Chicken extends Enemy {
    currentImgType = 'walk';

    audioAttack;

    IMAGES_WALKING;
    IMAGES_DEAD;

    constructor() {
        super();
    }

    animate() {
        setInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            this.displayNextImage();
        }, 150);
        
        setInterval(() => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            this.moveLeft();
            if (this.x < -this.width) {
                this.x = 720;
            }
        }, 1000 / 60);  
    }

    attacked() {
        this.audioAttack.currentTime = 2.6;
        this.audioAttack.play();
    }
}