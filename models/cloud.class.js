class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.8;

    constructor(x, imgIdx) {
        super().loadImage('./img/5_background/layers/4_clouds/' + imgIdx + '.png')
        this.initPosition(x);        
        this.move();
    }

    initPosition(x) {
        this.x = x;
    }

    move() {
        setStoppableInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            this.moveLeft();
            if (this.x < -this.width) {
                this.x = this.world.level.levelEndX + this.width;
            }
        }, ANIMATION_INTERVAL);
    }
}