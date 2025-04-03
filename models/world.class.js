class World {    
    canvas;
    ctx;
    keyboard;
    camera_x;
    character = new Character();
    statusBarEnergy = new StatusBar('./img/7_statusbars/1_statusbar/2_statusbar_health/blue', 20, 0, 1000, 1000);
    statusBarCoins = new StatusBar('./img/7_statusbars/1_statusbar/1_statusbar_coin/orange', 20, 50, 100, 0);
    statusBarBottles = new StatusBar('./img/7_statusbars/1_statusbar/3_statusbar_bottle/green', 20, 100, 5, 0);
    
    audioBackground = new Audio('./audio/backgroundmusic.mp3');

    level;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = '#74b9ff';
        this.setLevel(level1);
        this.draw();
        this.setWorld();
        this.checkCollisions();

        this.audioBackground.volume = 0.1;
        this.audioBackground.play();
    }

    setLevel(level) {
        this.level = level;
        this.statusBarCoins.setMaxValue(this.level.coins.length);
        this.statusBarBottles.setMaxValue(this.level.bottles.length);
    }

    setWorld() {
        this.character.world = this;
        this.statusBarEnergy.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToGame(this.level.backgroundObjects);
        this.addObjectToGame(this.character);
        this.addObjectsToGame(this.level.enemies);
        this.addObjectsToGame(this.level.clouds);
        this.addObjectsToGame(this.level.coins);
        this.addObjectsToGame(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);

        this.addObjectToGame(this.statusBarEnergy);
        this.addObjectToGame(this.statusBarCoins);
        this.addObjectToGame(this.statusBarBottles);

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
            if (this.character.isDead()) {
                return;
            }
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit(enemy.hitpoints);
                    enemy.attacked();
                    this.statusBarEnergy.setActValue(this.character.energy);
                }
            });
            this.level.coins.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.character.addCoin();
                    coin.setVisible(false);
                    this.statusBarCoins.setActValue(this.character.coins);
                }
            });
            this.level.bottles.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    this.character.addBottle();
                    bottle.setVisible(false);
                    this.statusBarBottles.setActValue(this.character.bottles);
                }
            });
        }, 1000/60);
    }
}