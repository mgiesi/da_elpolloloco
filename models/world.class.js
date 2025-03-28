class World {    
    canvas;
    ctx;
    keyboard;
    camera_x;
    character = new Character();
    level = level1;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = '#74b9ff';
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToGame(this.level.backgroundObjects);
        this.addObjectToGame(this.character);
        this.addObjectsToGame(this.level.enemies);
        this.addObjectsToGame(this.level.clouds);
        this.addObjectsToGame(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToGame(objects) {
        objects.forEach(object => {
            this.addObjectToGame(object);
        });
    }
    
    addObjectToGame(object) {
        object.draw(this.ctx);
    }

    checkCollisions() {
        setInterval( () => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.energy -= 2;
                    console.log('energy: ' + this.character.energy);
                                        
                }
            });
        }, 1000/60);
    }
}