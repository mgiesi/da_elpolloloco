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

    constructor(imgPath) {
        super(imgPath, 400 + Math.random() * 100)

        this.y = 480 - this.height - 50;

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