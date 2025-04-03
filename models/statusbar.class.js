class StatusBar extends DrawableObject {   
    x;
    y;
    width = 200;
    height = 50;
    rightWidth = 15;
    leftPadding = 22;
    maxValue = 1000;
    actValue = 100;
    actValueWidth = 0;

    constructor(imgPrefix, x, y, maxValue, actValue) {
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
        this.maxValue = maxValue;
        this.setActValue(actValue);
    }

    setMaxValue(maxValue) {
        this.maxValue = maxValue;
        this.setActValue(this.actValue);
    }

    setActValue(actValue) {
        this.actValue = actValue;
        this.actValueWidth = (this.width - this.leftPadding) * (this.actValue / this.maxValue);
    }

    drawImg(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (this.actValueWidth <= this.rightWidth) {
            ctx.drawImage(this.imgCache['bar'][2], this.x + this.leftPadding, this.y, this.actValueWidth, this.height);
        } else {
            ctx.drawImage(this.imgCache['bar'][1], this.x + this.leftPadding, this.y, this.actValueWidth - this.rightWidth, this.height);
            ctx.drawImage(this.imgCache['bar'][2], this.x + this.leftPadding + this.actValueWidth - this.rightWidth, this.y, this.rightWidth, this.height);
        }
        ctx.drawImage(this.imgCache['bar'][3], this.x, this.y, this.width, this.height);
    }
}