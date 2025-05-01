class Coin extends MovableObject {
    width = 140;
    height = 140;
    scaledMax = 155;
    scaledMin = 125;
    scaleFactor = 0.45;
    scaleUp=true;
    centerX;
    centerY;

    audioCollected;

    offset = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    constructor(x, y) {
        super().loadImage('./img/8_coin/coin_1.png');

        this.audioCollected = new Audio('./audio/coin.mp3');

        this.x = x;
        this.y = y;

        this.centerX = this.x + this.width/2;
        this.centerY = this.y + this.height/2;

        this.animate();
        this.move();
    }

    animate() {
        setStoppableInterval( () => {
            if (this.scaleUp) {
                this.width += this.scaleFactor;
                if (this.width >= this.scaledMax) {
                    this.scaleUp = false;
                }
            } else {
                this.width -= this.scaleFactor;
                if (this.width <= this.scaledMin) {
                    this.scaleUp = true;
                }
            }
        }, ANIMATION_INTERVAL);        
    }

    move() {
        setStoppableInterval( () => {
            this.x = this.centerX - this.width/2;
            this.y = this.centerY - this.height/2;
            this.height = this.width;
        }, ANIMATION_INTERVAL);  
    }

    collected() {
        if (this.world.playSounds) {
            this.audioCollected.play();
        }
        this.setVisible(false);
    }
}