class MovableObject {
    x = 120;
    y = 330;
    width = 100;
    height = 100;
    img;
    imgCache = {};
    currentImg = 0;
    currentImgType;
    speed;
    speedY;
    groundY;
    acceleration;
    world;
    mirrorY = false;

    energy = 100;

    isJumping;
    isJumpAnimation;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    constructor() {
        
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(type, arr) {
        this.imgCache[type] = [];
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[type].push(img);
        });
    }

    displayNextImage() {
        this.img = this.imgCache[this.currentImgType][this.currentImg];
        this.currentImg++;
        if (this.currentImg >= this.imgCache[this.currentImgType].length) {
            this.currentImg = 0;
        }
    }

    setImgType(imgType) {
        if (this.currentImgType != imgType) {
            this.currentImg = 0;
        }
        this.currentImgType = imgType;
    }

    draw(ctx) {        
        this.flipImg(ctx);
        this.drawImg(ctx);
        this.drawBBox(ctx);
        this.flipImgBack(ctx);        
    }

    flipImg(ctx) {
        if (this.mirrorY) {
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            this.x = this.x * -1;
        }
    }

    flipImgBack(ctx) {
        if (this.mirrorY) {
            this.x = this.x * -1;
            ctx.restore();
        }
    }

    drawImg(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawBBox(ctx) {
        if (this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'green';
            ctx.rect( this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    isColliding(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left && 
               (this.y + this.height + this.offset.bottom) >= obj.y + obj.offset.top &&
               (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) &&
               (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom);
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.isJumping = true;
        this.isJumpAnimation = true;
        this.speedY = 14;
    }

    gravityJump() {
        if (this.y < this.groundY || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }

        if (this.y >= this.groundY) {
            this.isJumpAnimation = false;
            this.y = this.groundY;
        }
        if (this.y >= this.groundY && !this.world.keyboard.UP) {
            this.isJumping = false;
        }
    }
}