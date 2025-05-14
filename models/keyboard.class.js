/**
 * @class Keyboard
 * @classdesc Manages user input via keyboard and touch controls for the game.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    PAUSE = false;
    ESCAPE = false;

    constructor() {
        this.bindKeyboardKeys();
        this.bindBtnKeys();
    }

    /**
     * Binds touch event listeners to on-screen control buttons.
     * @returns {void}
     */
    bindBtnKeys() {
        document.getElementById("btn-left").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById("btn-left").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        document.getElementById("btn-right").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById("btn-right").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.UP = true;
        });
        document.getElementById("btn-jump").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.UP = false;
        });
        document.getElementById("btn-bottle").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById("btn-bottle").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
        document.getElementById("btn-pause").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.PAUSE = true;
        });
        document.getElementById("btn-pause").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.PAUSE = false;
        });
    }

    /**
     * Binds native keyboard event listeners for keydown and keyup.
     * @returns {void}
     */
    bindKeyboardKeys() {        
        window.addEventListener("keydown", (e) => {
            this.keyDown(e.key);
        });

        window.addEventListener("keyup", (e) => {
            this.keyUp(e.key);
        });
    }

    /**
     * Handles a keydown event by setting the corresponding flag.
     * @param {string} key - The key value from the KeyboardEvent.
     * @returns {void}
     */
    keyDown(key) {
        switch (key) {
            case 'ArrowLeft':
                this.LEFT = true;
                break;
            case 'ArrowRight':
                this.RIGHT = true;
                break;
            case 'ArrowUp':
                this.UP = true;
                break;
            case 'ArrowDown':
                this.DOWN = true;
                break;
            case ' ':              
                this.SPACE = true;
                break;
            case 'Escape':
                this.ESCAPE = true;
                break;
            case 'P':
            case 'p':
                this.PAUSE = true;
                break;
        }
    }

    /**
     * Handles a keyup event by clearing the corresponding flag.
     * @param {string} key - The key value from the KeyboardEvent.
     * @returns {void}
     */
    keyUp(key) {
        switch (key) {
            case 'ArrowLeft':
                this.LEFT = false;
                break;
            case 'ArrowRight':
                this.RIGHT = false;
                break;
            case 'ArrowUp':
                this.UP = false;
                break;
            case 'ArrowDown':
                this.DOWN = false;
                break;
            case ' ':  
                this.SPACE = false;
                break;
            case 'Escape':
                this.ESCAPE = false;
                break;
            case 'P':
            case 'p':
                this.PAUSE = false;
                break;
        }
    }
}