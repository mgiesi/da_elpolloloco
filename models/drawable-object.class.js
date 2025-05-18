/**
 * Base class for all drawable objects in the game.
 * Handles image loading, sprite animation, drawing (with optional horizontal mirroring),
 * and bounding‐box visualization for movable objects.
 */
class DrawableObject {
    x = 120;
    y = 330;
    width = 100;
    height = 100;
    /**
     * Current Image element being drawn.
     * @type {HTMLImageElement}
     */
    img;
    /**
     * Cache of loaded images by animation type.
     * @type {Object.<string, HTMLImageElement[]>}
     */
    imgCache = {};
    /**
     * Frame duration cache (milliseconds) for each animation type.
     * @type {Object.<string, number>}
     */
    imgTimeCache = {};
    currentImg = 0;
    currentImgType;
    currentImgTime = 0;
    animationDone;
    world;
    visible = true;

    /**
     * Loads a single image for this object.
     *
     * @param {string} path - URL or path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads an array of images for an animation type.
     *
     * @param {string} type - Identifier for the animation (e.g. "run", "jump").
     * @param {string[]} arr - Array of image URLs/paths.
     * @param {number} time - Duration (ms) each frame should display.
     */
    loadImages(type, arr, time) {
        this.imgCache[type] = [];
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[type].push(img);
            this.imgTimeCache[type] = time;
        });
    }

    /**
     * Advances to the next frame in the current animation, looping back to start.
     */
    displayNextImage() {
        if (!this.checkNextImage()) {
            return;
        }
        if (this.currentImgType !== undefined) {
            this.img = this.imgCache[this.currentImgType][this.currentImg];
            this.currentImg++;
            if (this.currentImg >= this.imgCache[this.currentImgType].length) {
                this.currentImg = 0;
            }
        }
    }

    /**
     * Advances through the current animation once, then stops on the last frame.
     *
     * @returns {boolean} True if the animation has completed his cycle.
     */
    displayNextImageOnce() {
        if (!this.checkNextImage()) {
            return;
        }
        this.img = this.imgCache[this.currentImgType][this.currentImg];
        this.currentImg++;
        if (this.currentImg >= this.imgCache[this.currentImgType].length) {
            this.currentImg = this.imgCache[this.currentImgType].length-1;
            this.animationDone = true;
            return true;
        }
        this.animationDone = false;
        return false;
    }

    /**
     * Determines whether enough time has passed to advance to the next animation frame.
     *
     * @returns {boolean} True if the frame should advance.
     * @private
     */
    checkNextImage() {
        if (this.currentImgTime < 0) {
            this.currentImgTime = 0;
            return true;
        } else {
            this.currentImgTime += ANIMATION_INTERVAL;
            if (this.currentImgTime < this.imgTimeCache[this.currentImgType]) {
                return false;
            }
        }
        this.currentImgTime -= this.imgTimeCache[this.currentImgType];
        return true;
    }

    /**
     * Switches the active animation type, resetting frame counters if changed.
     *
     * @param {string} imgType - Key corresponding to a set of preloaded frames.
     */
    setImgType(imgType) {
        if (this.currentImgType != imgType) {
            this.currentImgTime = -1;
            this.currentImg = 0;
        }
        this.currentImgType = imgType;
    }

    /**
     * Draws the object to the canvas context, applying mirroring if set.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    draw(ctx) {     
        if (this.visible) {   
            this.flipImg(ctx);
            this.drawImg(ctx);
            //this.drawBBox(ctx);
            this.flipImgBack(ctx);
        }
    }

    /**
     * Applies horizontal mirroring transform if mirrorY is true.
     *
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */
    flipImg(ctx) {
        if (this.mirrorY) {
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            this.x = this.x * -1;
        }
    }

    /**
     * Restores canvas state after mirroring and resets x-position.
     *
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */
    flipImgBack(ctx) {
        if (this.mirrorY) {
            this.x = this.x * -1;
            ctx.restore();
        }
    }

    /**
     * Draws the current image frame at (x, y) with the defined width/height.
     *
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */
    drawImg(ctx) {
        if (this.img !== undefined) {
            try {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            } catch (e) {
                console.warn('Error loading image', e);
                console.log('Could not load image ', this.img.src);
            }
        }
    }

    /**
     * Draws a bounding box around the object (for debugging collision).
     *
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */
    drawBBox(ctx) {
        if (this instanceof MovableObject) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'green';
            ctx.rect( this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    /**
     * Sets the visibility of the object.
     *
     * @param {boolean} visible - True to draw the object, false to hide.
     */
    setVisible(visible) {
        this.visible = visible;
    }
}