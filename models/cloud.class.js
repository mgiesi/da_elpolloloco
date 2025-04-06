class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.1;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 500;

        this.move();
    }

    move() {
        setInterval( () => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            this.moveLeft();
        }, 1000/60);
    }
}