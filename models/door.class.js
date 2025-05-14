class Door extends DrawableObject {
    y = 190;
    width = 400;
    height = 250;

    audioOpen;
    imgSecondPart;

    constructor(x) {
        super();
        this.loadImages('closed', ['./img/5_background/door_closed.png']);
        this.loadImages('opened', ['./img/5_background/door_open.png']);
        this.loadImages('opened2ndPart', ['./img/5_background/door_open_2.png']);
        this.initAudio();
        this.initPosition(x);
        this.close();
    }

    initAudio() {        
        this.audioOpen = new Audio('./audio/door_open.mp3');
    }

    initPosition(x) {
        this.x = x;
    }

    isClosed() {
        return this.state === 'closed';
    }

    open() {
        this.state = 'opened';
        this.setImgType('opened');
        this.displayNextImage(); 
    }

    close() {
        this.state = 'closed';
        this.setImgType('closed');
        this.displayNextImage(); 
    }

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