class Chicken extends Enemy {
    currentImgType = 'walk';

    audioAttack;

    IMAGES_WALKING;
    IMAGES_DEAD;

    killByJumpOn = true;

    constructor() {
        super();
    }

    animate() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.isDead()) {
                this.setImgType('dead');
                this.displayNextImageOnce();
            } else {
                this.setImgType('walk');
                this.displayNextImage();
            }            
        }, 150);
        
        setStoppableInterval(() => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.isDead()) {
                return;
            }
            this.moveLeft();
            if (this.x < -this.width) {
                this.x = 720;
            }
        }, 1000 / 60);  
    }

    attacked() {
        this.audioAttack.currentTime = 2.5;
        this.audioAttack.play();
    }
}