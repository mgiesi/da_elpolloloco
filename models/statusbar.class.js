class StatusBar extends DrawableObject {   
    x;
    y;
    width = 200;
    height = 50;
    rightWidth = 15;
    leftPadding = 22;
    percentage = 100;
    percentageWidth = 0;

    constructor(imgPrefix, x, y) {
        super();

        let IMAGES_BAR = [
            imgPrefix + '/background.png',
            imgPrefix + '/progressMiddle.png',
            imgPrefix + '/progressRight.png',
            imgPrefix + '/icon.png'
        ];

        this.x = x;
        this.y = y;
        this.loadImages('bar', IMAGES_BAR);
        this.img = this.imgCache['bar'][0];
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        this.percentageWidth = (this.width - this.leftPadding) * this.percentage / 100;
    }

    drawImg(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (this.percentageWidth <= this.rightWidth) {
            ctx.drawImage(this.imgCache['bar'][2], this.x + this.leftPadding, this.y, this.percentageWidth, this.height);
        } else {
            ctx.drawImage(this.imgCache['bar'][1], this.x + this.leftPadding, this.y, this.percentageWidth - this.rightWidth, this.height);
            ctx.drawImage(this.imgCache['bar'][2], this.x + this.leftPadding + this.percentageWidth - this.rightWidth, this.y, this.rightWidth, this.height);
        }
        ctx.drawImage(this.imgCache['bar'][3], this.x, this.y, this.width, this.height);
    }
}