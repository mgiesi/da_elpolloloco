class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    PAUSE = false;
    ESCAPE = false;

    constructor() {
        
    }

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
            case 'Space':
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
            case 'Space':
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