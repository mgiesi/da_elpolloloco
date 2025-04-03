class MovableObject extends DrawableObject {
    
    speed;
    speedY;
    groundY;
    acceleration;
    mirrorY = false;

    energy = 100;

    isJumping;
    isJumpAnimation;

    isHurtAnimation;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    constructor() {
        super();
    }

    isColliding(obj) {
        return obj.visible &&
               (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left && 
               (this.y + this.height + this.offset.bottom) >= obj.y + obj.offset.top &&
               (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) &&
               (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom);
    }

    hit(hitpoints) {
        this.isHurtAnimation = true;
        this.energy -= hitpoints;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    attacked() {
        
    }

    isDead() {
        return this.energy <= 0;
    }

    isHurt() {
        return this.isHurtAnimation;
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