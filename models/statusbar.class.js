/**
 * Represents a customizable status bar (e.g., health, energy, progress) in the game,
 * extending the base DrawableObject. Displays a background, dynamic progress fill,
 * and an overlay icon.
 *
 * @extends DrawableObject
 */
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

    /**
     * Creates a new StatusBar.
     *
     * @param {string} imgPrefix - Path prefix for the bar images (without file extension).
     *   Four images are expected under this prefix:
     *   background.png, progressMiddle.png, progressRight.png, icon.png.
     * @param {number} x - X-coordinate where the bar will be drawn.
     * @param {number} y - Y-coordinate where the bar will be drawn.
     * @param {number} maxValue - Maximum value the bar represents.
     * @param {number} actValue - Initial actual value to display.
     */
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

    /**
     * Updates the maximum value of the bar and recalculates the filled width.
     *
     * @param {number} maxValue - New maximum value.
     */
    setMaxValue(maxValue) {
        this.maxValue = maxValue;
        this.setActValue(this.actValue);
    }

    /**
     * Updates the current actual value and recalculates the filled width.
     *
     * @param {number} actValue - New actual value to display.
     */
    setActValue(actValue) {
        this.actValue = actValue;
        this.actValueWidth = (this.width - this.leftPadding) * (this.actValue / this.maxValue);
    }

    /**
     * Draws the status bar: background, progress fill (with middle and right cap),
     * and the overlay icon.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     * @override
     */
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