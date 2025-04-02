class Coin extends BackgroundObject {
    width = 140;
    height = 140;
    scaledMax = 155;
    scaledMin = 125;
    scaleFactor = 0.45;
    scaleUp=true;
    centerX;
    centerY;

    offset = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    constructor(x, y) {
        super('./img/8_coin/coin_1.png')

        this.x = x;
        this.y = y;

        this.centerX = this.x + this.width/2;
        this.centerY = this.y + this.height/2;

        this.animate();
        this.move();
    }

    animate() {
        setInterval( () => {
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
        }, 1000/60);        
    }

    move() {
        setInterval( () => {
            this.x = this.centerX - this.width/2;
            this.y = this.centerY - this.height/2;
            this.height = this.width;
        }, 1000/60);  
    }
}