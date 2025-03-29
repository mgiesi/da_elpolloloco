class StatusBar extends DrawableObject {
    IMAGES_BAR = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png'
    ];

    x = 20;
    y = 20;
    width = 200;
    height = 40;
    percentage = 0;

    constructor() {
        super().loadImages('bar', this.IMAGES_BAR);
        this.img = this.imgCache['bar'][0];
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        this.resolveImage();
    }

    resolveImage() {
        if (this.percentage > 80) {
            this.img = this.imgCache['bar'][0];
        } else if (this.percentage > 60) {
            this.img = this.imgCache['bar'][1];
        } else if (this.percentage > 40) {
            this.img = this.imgCache['bar'][2];
        } else if (this.percentage > 20) {
            this.img = this.imgCache['bar'][3];
        } else if (this.percentage > 0) {
            this.img = this.imgCache['bar'][4];
        } else {
            this.img = this.imgCache['bar'][5];
        }
    }

    drawImg(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}