/**
 * Represents a background object in the game world, extending the base MovableObject.
 * This object has fixed dimensions and is positioned along the y-axis so that its
 * bottom edge aligns with the ground.
 *
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object in pixels.
     * @type {number}
     */
    width = 720;
    /**
     * The height of the background object in pixels.
     * @type {number}
     */
    height = 480;

    /**
     * Creates a new BackgroundObject.
     *
     * @param {string} imgPath - The path or URL to the image to be used for this background.
     * @param {number} x - The initial x-coordinate (horizontal position) where the background object will be placed.
     */
    constructor(imgPath, x) {
        super().loadImage(imgPath)

        this.x = x;
        this.y = 480 - this.height;
    }
}