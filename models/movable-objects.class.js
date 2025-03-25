class MovableObject {
    x = 120;
    y = 200;
    width = 100;
    height = 100;
    img;

    constructor() {
        
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}