/**
 * Represents the game world, managing rendering, game loop, input, audio,
 * and interactions between all game entities.
 */
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

    /**
     * Creates a new World, setting up canvas, audio, and initial render style.
     *
     * @param {HTMLCanvasElement} canvas - The canvas element to render on.
     * @param {Object} keyboard - Keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = '#74b9ff';
        this.audioBackground.loop = true;
    }

    /**
     * Updates a world setting (music or sound) and applies it immediately.
     *
     * @param {string} key - 'music' or 'sound'.
     * @param {boolean} value - Whether the feature should be enabled.
     */
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

    /**
     * Plays or pauses background music based on the playMusic flag.
     */
    toggleMusic() {
        if (this.playMusic) {
            this.audioBackground.volume = 0.1;
            this.audioBackground.play();
        } else {
            this.audioBackground.currentTime = 0;
            this.audioBackground.pause();
        }
    }

    /**
     * Stops the game loop and all running intervals.
     */
    stopGame() {
        this.ingame = false;
        stopIntervals();
    }

    /**
     * Starts a new game at the given level and difficulty:
     * initializes objects, begins rendering, and collision checks.
     *
     * @param {number} levelIdx - Index of the level to load.
     * @param {string} difficulty - Game difficulty setting.
     */
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

    /**
     * Resets or initializes game objects to their starting state.
     */
    setGameObjects() {
        this.character.init();
    }

    /**
     * Instantiates the appropriate Level subclass based on levelIdx
     * and initializes the UI status bars.
     *
     * @param {number} levelIdx - Level number to load.
     */
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

    /**
     * Sets max and current values on all status bars based on level and character state.
     * @private
     */
    initStatusBar() {
        this.initStatusBarValues(this.statusBarCoins, this.level.coins.length, this.character.coins);
        this.initStatusBarValues(this.statusBarBottles, this.level.bottles.length, this.character.bottles);
        this.initStatusBarValues(this.statusBarEnergy, this.character.maxenergy, this.character.energy);
        if (this.level.endboss) {
            this.initStatusBarValues(this.statusBarEndboss, this.level.endboss.maxenergy, this.level.endboss.energy);
        }
    }

    /**
     * Helper to apply max and actual values to a StatusBar instance.
     *
     * @param {StatusBar} bar - The status bar to update.
     * @param {number} maxValue - The maximum possible value.
     * @param {number} actValue - The current value.
     * @private
     */
    initStatusBarValues(bar, maxValue, actValue) {
        bar.setMaxValue(maxValue);
        bar.setActValue(actValue);
    }

    /**
     * Advances to the next level and navigates to the gameplay screen.
     */
    nextLevel() {
        this.levelIdx++;
        this.startGame(this.levelIdx);
        navigateTo('game');
    }

    /**
     * Assigns this World instance to all game objects for reference.
     * @private
     */
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

    /**
     * Assigns this World to each object in the array.
     *
     * @param {Array.<{world: World}>} objects - Array of game objects.
     * @private
     */
    setWorldToObjects(objects) {
        objects.forEach(object => {
            object.world = this;
        });
    }

    /**
     * Returns true if the game loop should be updating (not paused and in-game).
     *
     * @returns {boolean}
     */
    isRunning() {
        return !this.pause && this.ingame;
    }

    /**
     * Main render loop: clears canvas, translates camera, draws game and UI,
     * and schedules the next frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);        
        this.drawGameObjects();
        this.drawInterface();
        this.checkPauseGame();
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Renders all UI elements (status bars).
     * @private
     */
    drawInterface() {
        this.addObjectToGame(this.statusBarEnergy);
        this.addObjectToGame(this.statusBarCoins);
        this.addObjectToGame(this.statusBarBottles);
        if (this.level.endboss && !this.level.endboss.isIdle()) {
            this.addObjectToGame(this.statusBarEndboss);
        }
    }

    /**
     * Renders all world objects: background, door, character, enemies, clouds, coins, bottles.
     * @private
     */
    drawGameObjects() {
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
    }

    /**
     * Renders an array of objects by calling addObjectToGame on each.
     *
     * @param {Array.<DrawableObject>} objects
     * @private
     */
    addObjectsToGame(objects) {
        objects.forEach(object => {
            this.addObjectToGame(object);
        });
    }
    
    /**
     * Draws a single object by invoking its draw(ctx) method.
     *
     * @param {{draw: function(CanvasRenderingContext2D):void}} object
     * @private
     */
    addObjectToGame(object) {
        object.draw(this.ctx);
    }

    /**
     * Starts the collision detection loop for enemies, coins, bottles, and level events.
     */
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

    /**
     * Checks collisions between the character and enemies,
     * handling jump-on kills or damage/hurt reactions.
     * @private
     */
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

    /**
     * Checks collisions between the character and coins,
     * awarding coins and hiding collected ones.
     * @private
     */
    checkCoinCollision() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.addCoin();
                coin.collected();
            }
        });
    }
    
    /**
     * Checks collisions for bottles: picking up idle bottles
     * or hitting enemies with thrown bottles.
     * @private
     */
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

    /**
     * Updates all status bars to reflect current game state values.
     * @private
     */
    updateStatusBar() {
        this.statusBarBottles.setActValue(this.character.bottles.length);
        this.statusBarCoins.setActValue(this.character.coins);
        this.statusBarEnergy.setActValue(this.character.energy);
        if (this.level.endboss) {
            this.statusBarEndboss.setActValue(this.level.endboss.energy);
        }
    }

    /**
     * Detects pause/escape key presses to pause or resume the game.
     * @private
     */
    checkPauseGame() {
        if ((this.keyboard.PAUSE && !this.lastPauseKey && !this.pause) ||
            (this.keyboard.ESCAPE && !this.lastEscapeKey && !this.pause) ) {
            this.pause = true;
            this.character.pause();
            this.level.enemies.forEach((enemy) => {
                enemy.pause();
            });
            navigateTo('pause');
        }

        this.lastPauseKey = this.keyboard.PAUSE;
        this.lastEscapeKey = this.keyboard.ESCAPE;
    }

    /**
     * Resumes the game from a paused state and returns to gameplay screen.
     */
    resumeGame() {
        this.pause = false;
        navigateTo('game');
    }
}