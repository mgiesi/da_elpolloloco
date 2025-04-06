class DrawableObject {
    x = 120;
    y = 330;
    width = 100;
    height = 100;
    img;
    imgCache = {};
    currentImg = 0;
    currentImgType;
    world;

    visible = true;

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
        if (this.currentImgType !== undefined) {
            this.img = this.imgCache[this.currentImgType][this.currentImg];
            this.currentImg++;
            if (this.currentImg >= this.imgCache[this.currentImgType].length) {
                this.currentImg = 0;
            }
        }
    }

    displayNextImageOnce() {
        this.img = this.imgCache[this.currentImgType][this.currentImg];
        this.currentImg++;
        if (this.currentImg >= this.imgCache[this.currentImgType].length) {
            this.currentImg = this.imgCache[this.currentImgType].length-1;
            return true;
        }
        return false;
    }

    setImgType(imgType) {
        if (this.currentImgType != imgType) {
            this.currentImg = 0;
        }
        this.currentImgType = imgType;
    }

    draw(ctx) {     
        if (this.visible) {   
            this.flipImg(ctx);
            this.drawImg(ctx);
            //this.drawBBox(ctx);
            this.flipImgBack(ctx);
        }
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
        if (this.img !== undefined) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    drawBBox(ctx) {
        if (this instanceof MovableObject) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'green';
            ctx.rect( this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    setVisible(visible) {
        this.visible = visible;
    }
}