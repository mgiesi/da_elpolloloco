class World {    
    canvas;
    ctx;
    keyboard;
    camera_x;
    character = new Character();
    statusBarEnergy = new StatusBar('./img/7_statusbars/1_statusbar/2_statusbar_health/blue', 20, 0, 1000, 1000);
    statusBarCoins = new StatusBar('./img/7_statusbars/1_statusbar/1_statusbar_coin/orange', 20, 50, 100, 0);
    statusBarBottles = new StatusBar('./img/7_statusbars/1_statusbar/3_statusbar_bottle/green', 20, 100, 5, 0);
    statusBarEndboss = new StatusBar('./img/7_statusbars/2_statusbar_endboss/blue', 300, 0, 500, 0);
    
    audioBackground = new Audio('./audio/backgroundmusic.mp3');

    level;
    levelIdx;
    difficulty;

    pause = false;
    lastPauseKey = false;
    lastEscapeKey = false;
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

    stopGame() {
        this.ingame = false;
        stopIntervals();
    }

    startGame(levelIdx, difficulty) {
        this.difficulty = difficulty;
        this.camera_x = 0;
        this.setGameObjects();
        this.setLevel(levelIdx);
        this.setWorld();
        this.draw();
        this.checkCollisions();
        this.pause = false;
        this.ingame = true;
    }

    setGameObjects() {
        this.character.init();
    }

    setLevel(levelIdx) {
        this.levelIdx = levelIdx;
        switch (levelIdx) {
            case 1:
                this.level = new Level1();
                break;
            case 2:
                this.level = new Level2();
                break;
            case 3:
                this.level = new Level3();
                break;
        }
        this.initStatusBar();
    }

    initStatusBar() {
        this.statusBarCoins.setActValue(this.character.coins);
        this.statusBarCoins.setMaxValue(this.level.coins.length);
        this.statusBarBottles.setActValue(this.character.bottles);
        this.statusBarBottles.setMaxValue(this.level.bottles.length);
        this.statusBarEnergy.setMaxValue(this.character.maxenergy);
        this.statusBarEnergy.setActValue(this.character.energy);
        if (this.level.endboss) {
            this.statusBarEndboss.setMaxValue(this.level.endboss.maxenergy);
            this.statusBarEndboss.setActValue(this.level.endboss.energy);
        }
    }

    nextLevel() {
        this.levelIdx++;
        this.startGame(this.levelIdx);
        navigateTo('game');
    }

    setWorld() {
        this.character.world = this;
        this.statusBarEnergy.world = this;
        this.setWorldToObjects(this.level.enemies);
        this.setWorldToObjects(this.level.clouds);
        this.setWorldToObjects(this.level.coins);
        this.setWorldToObjects(this.level.bottles);
        this.level.world = this;
        this.level.door.world = this;
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
        this.addObjectToGame(this.level.door);
        this.addObjectToGame(this.character);
        this.level.door.displaySecondPart(this.ctx);
        this.addObjectsToGame(this.level.enemies);
        this.addObjectsToGame(this.level.clouds);
        this.addObjectsToGame(this.level.coins);
        this.addObjectsToGame(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);

        this.addObjectToGame(this.statusBarEnergy);
        this.addObjectToGame(this.statusBarCoins);
        this.addObjectToGame(this.statusBarBottles);
        if (this.level.endboss && !this.level.endboss.isIdle()) {
            this.addObjectToGame(this.statusBarEndboss);
        }

        this.checkPauseGame();

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
        setStoppableInterval( () => {
            if (!this.isRunning()) {
                return;
            }
            if (this.character.isDead()) {
                return;
            }
            this.checkEnemyCollision();
            this.checkCoinCollision();
            this.checkBottleCollision();
            this.updateStatusBar();
            this.level.door.checkState();
            this.level.checkLevelEndReached(this.character.x);
        }, ANIMATION_INTERVAL);
    }

    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.killByJumpOn && this.character.isJumpedOn(enemy)) {
                enemy.jumpedOn();
            } else if (this.character.isColliding(enemy)) {
                this.character.hit(enemy.hitpoints);
                enemy.attacked();
            }
        });
    }

    checkCoinCollision() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.addCoin();
                coin.collected();
            }
        });
    }
    
    checkBottleCollision() {
        this.level.bottles.forEach((bottle) => {
            if (bottle.isIdle() && this.character.isColliding(bottle)) {
                this.character.addBottle(bottle);
                bottle.collected();
            } else if (bottle.isThrown()) {
                this.level.enemies.forEach((enemy) => {
                    if (enemy.isColliding(bottle)) {
                        enemy.hit(bottle.hitpoints);
                        bottle.splash();
                    }
                });
            }
        });
    }

    updateStatusBar() {
        this.statusBarBottles.setActValue(this.character.bottles.length);
        this.statusBarCoins.setActValue(this.character.coins);
        this.statusBarEnergy.setActValue(this.character.energy);
        if (this.level.endboss) {
            this.statusBarEndboss.setActValue(this.level.endboss.energy);
        }
    }

    checkPauseGame() {
        if ((this.keyboard.PAUSE && !this.lastPauseKey && !this.pause) ||
            (this.keyboard.ESCAPE && !this.lastEscapeKey && !this.pause) ) {
            this.pause = true;
            navigateTo('pause');
        }

        this.lastPauseKey = this.keyboard.PAUSE;
        this.lastEscapeKey = this.keyboard.ESCAPE;
    }

    resumeGame() {
        this.pause = false;
        navigateTo('game');
    }
}