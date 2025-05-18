/**
 * Represents a door in the game world, extending the base DrawableObject.
 * The door can be in a closed or opened state, plays a sound when opening,
 * and supports drawing an optional second-part image when opened.
 *
 * @extends DrawableObject
 */
class Door extends DrawableObject {
    y = 190;
    width = 400;
    height = 250;
    audioOpen;
    /**
     * Image element for the second part of the opened door (drawn separately).
     * @type {HTMLImageElement}
     */
    imgSecondPart;

    /**
     * Preloads door images (closed, opened, opened second part), initializes audio,
     * positions the door at the given x-coordinate, and sets it to the closed state.
     *
     * @param {number} x - The x-coordinate where the door should be placed.
     */
    constructor(x) {
        super();
        this.loadImages('closed', ['./img/5_background/door_closed.png']);
        this.loadImages('opened', ['./img/5_background/door_open.png']);
        this.loadImages('opened2ndPart', ['./img/5_background/door_open_2.png']);
        this.initAudio();
        this.initPosition(x);
        this.close();
    }

    /**
     * Creates the Audio object for the door opening sound.
     *
     * @private
     */
    initAudio() {        
        this.audioOpen = new Audio('./audio/door_open.mp3');
    }

    /**
     * Sets the x-coordinate of the door.
     *
     * @param {number} x - The horizontal position to place the door.
     * @private
     */
    initPosition(x) {
        this.x = x;
    }

    /**
     * Checks whether the door is currently in the closed state.
     *
     * @returns {boolean} True if the door is closed, false otherwise.
     */
    isClosed() {
        return this.state === 'closed';
    }

    /**
     * Opens the door: updates state, switches to the "opened" image, and advances one frame.
     */
    open() {
        this.state = 'opened';
        this.setImgType('opened');
        this.displayNextImage(); 
    }

    /**
     * Closes the door: updates state, switches to the "closed" image, and advances one frame.
     */
    close() {
        this.state = 'closed';
        this.setImgType('closed');
        this.displayNextImage(); 
    }

    /**
     * Checks if the player has collected all required coins and the door is closed.
     * If so, opens the door and plays the opening sound.
     */
    checkState() {
        if (this.world.character.coins >= this.world.level.coins.length &&
            this.state === 'closed')
        {
            this.open();
            if (this.world.playSounds) {
                this.audioOpen.play();
            }
        }
    }

    /**
     * Draws the second part of the opened door (e.g., the back panel) if the door is open.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    displaySecondPart(ctx) {
        if (this.state === 'opened') {
            if (this.visible) {   
                if (this.imgCache['opened2ndPart'][0] !== undefined) {
                    try {
                        ctx.drawImage(this.imgCache['opened2ndPart'][0], this.x, this.y, this.width, this.height);
                    } catch (e) {
                        console.warn('Error loading image', e);
                        console.log('Could not load image ', this.imgCache['opened2ndPart'][0].src);
                    }
                }
            }
        }
    }
}