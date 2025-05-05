class DrawableObject {
    x = 120;
    y = 330;
    width = 100;
    height = 100;
    img;
    imgCache = {};
    imgTimeCache = {};
    currentImg = 0;
    currentImgType;
    currentImgTime = 0;
    animationDone;
    world;

    visible = true;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(type, arr, time) {
        this.imgCache[type] = [];
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[type].push(img);
            this.imgTimeCache[type] = time;
        });
    }

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

    checkNextImage() {
        //console.log(this.currentImgTime + " (" + this.imgTimeCache[this.currentImgType] + ")");        
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

    setImgType(imgType) {
        if (this.currentImgType != imgType) {
            this.currentImgTime = -1;
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
            try {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            } catch (e) {
                console.warn('Error loading image', e);
                console.log('Could not load image ', this.img.src);
            }
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