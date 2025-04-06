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

    pause = true;
    ingame = false;

    playSounds;
    playMusic;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = '#74b9ff';

        this.audioBackground.loop = true;
    }

    setSetting(key, value) {
        switch (key) {
            case 'music': 
                this.playMusic = value;
                this.toggleMusic();
                break;

            case 'sound':
                this.playSounds = value;
                break;
        }
    }

    toggleMusic() {
        if (this.playMusic) {
            this.audioBackground.volume = 0.1;
            this.audioBackground.play();
        } else {
            this.audioBackground.currentTime = 0;
            this.audioBackground.pause();
        }
    }

    startGame(difficulty) {
        this.setLevel(level1, difficulty);
        this.setWorld();
        this.draw();
        this.checkCollisions();
        this.pause = false;
        this.ingame = true;
    }

    setLevel(level, difficulty) {
        this.level = level;
        this.statusBarCoins.setMaxValue(this.level.coins.length);
        this.statusBarBottles.setMaxValue(this.level.bottles.length);
    }

    setWorld() {
        this.character.world = this;
        this.statusBarEnergy.world = this;
        this.setWorldToObjects(this.level.enemies);
        this.setWorldToObjects(this.level.clouds);
    }

    setWorldToObjects(objects) {
        objects.forEach(object => {
            object.world = this;
        });
    }

    isRunning() {
        return !this.pause && this.ingame;
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

        this.pause = this.keyboard.PAUSE;

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
            if (!this.isRunning()) {
                return;
            }
            if (this.character.isDead()) {
                return;
            }
            this.level.enemies.forEach((enemy) => {
                if (enemy.killByJumpOn && this.character.isJumpedOn(enemy)) {
                    console.log('jumped on');
                    
                    enemy.jumpedOn();
                } else if (this.character.isColliding(enemy)) {
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