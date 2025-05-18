/**
 * Represents the end boss enemy in the game, with multiple animation states,
 * sound effects, and AI for engaging the player. Extends the generic Enemy class.
 *
 * @extends Enemy
 */
class Endboss extends Enemy {
    width = 320;
    height = 320;
    currentImgType = 'alert';
    state = 'idle';
    audio;
    audioDead;
    /**
     * Collision offset for fine-tuned hit detection.
     * @type {{ top: number, right: number, bottom: number, left: number }}
     */
    offset = {
        top: 50,
        right: 0,
        bottom: 0,
        left: 50
    };

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates the Endboss at the specified x-coordinate, loads all animations and sounds,
     * sets initial game-level stats, and begins its AI loops.
     *
     * @param {number} x - Horizontal spawn position for the end boss.
     */
    constructor(x) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages('walk', this.IMAGES_WALKING, 150);
        this.loadImages('alert', this.IMAGES_ALERT, 150);
        this.loadImages('attack', this.IMAGES_ATTACK, 150);
        this.loadImages('hurt', this.IMAGES_HURT, 150);
        this.loadImages('dead', this.IMAGES_DEAD, 150);
        this.initGameLevel();
        this.initAudio();
        this.initPosition(x);
        this.animate();
        this.move();
    }

    /**
     * Initializes audio: looping battle music and death sound.
     * @private
     */
    initAudio() {
        this.audio = new Audio('./audio/endboss.mp3');
        this.audio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.audioDead = new Audio('./audio/endbossdead.mp3');
    }

    /**
     * Sets the boss's position at ground level based on sprite height.
     *
     * @param {number} x - Horizontal position.
     * @private
     */
    initPosition(x) {
        this.x = x;
        this.y = 480 - this.height - 35;
    }

    /**
     * Configures hitpoints, max energy, and speed based on global difficulty.
     * Supported levels: 'easy', 'medium', 'hard'.
     * @private
     */
    initGameLevel() {
        switch (gameLevel) {
            case 'easy':
                this.setGameLevel(4, 50, 0.5 + Math.random());
                break;
            case 'medium':
                this.setGameLevel(15, 100, 0.6 + Math.random());
                break;
            case 'hard':
                this.setGameLevel(30, 150, 0.7 + Math.random());
                break;
        }
        this.energy = this.maxenergy;
    }

    /**
     * Returns true if the boss is currently idle.
     * @returns {boolean}
     */
    isIdle() {
        return this.state === 'idle';
    }

    /**
     * Starts the movement AI loop: walks toward the player when in 'walking' state,
     * or falls down slightly if dead.
     * @private
     */
    move() {
        setStoppableInterval(() => {
            if (!this.world || !this.world.isRunning()) {
                return;
            }
            if (this.isDead()) {
                this.moveDead();
                return;
            }
            if (this.state !== 'walking') {
                return;
            }
            if (this.world.character.x < this.x) {
                this.mirrorY = false;
                this.moveLeft();
            } else {
                this.mirrorY = true;
                this.moveRight();
            }            
        }, ANIMATION_INTERVAL);
    }

    /**
     * Applies a downward drift when the boss is dead.
     * @private
     */
    moveDead() {
        this.y += 10;
        if (this.y > 200) {
            this.y = 200;
        }
    }

    /**
     * Starts the animation AI loop, transitioning through states:
     * idle → alerted → walking → attacking/hurt → dead.
     * @private
     */
    animate() {
        setStoppableInterval( () => {
            if (this.isDead()) {
                this.animateDead();
                return;
            }
            if (this.state === 'idle' && (this.world.character.x + this.world.character.width) > this.x - 300) {
                this.state = 'alerted';
            } else if (this.state === 'alerted') {
                this.animateAlerted();
            } else if (this.state === 'attacking') {
                this.animateAttacking();
            } else if (this.state === 'hurted') {
                this.animateHurted();
            } else if (this.state === 'walking') {
                this.animateWalking();
            }
        }, ANIMATION_INTERVAL);      
    }

    /**
     * Plays the death animation and stops battle music.
     * @private
     */
    animateDead() {
        this.audio.pause();
        this.setImgType('dead');
        this.displayNextImageOnce();
    }

    /**
     * Plays the alert animation once, then transitions to walking and starts music.
     * @private
     */
    animateAlerted() {
        this.setImgType('alert');
        this.displayNextImageOnce();
        if (this.world.playSounds) {
            this.audio.play();
        }
        if (this.animationDone) {
            this.state = 'walking';
        }
    }

    /**
     * Plays the attack animation once, then returns to walking state.
     * @private
     */
    animateAttacking() {
        this.setImgType('attack');
        this.displayNextImageOnce();
        if (this.animationDone) {
            this.state = 'walking';
        }
    }

    /**
     * Plays the hurt animation once, then returns to walking state.
     * @private
     */
    animateHurted() {
        this.setImgType('hurt');
        this.displayNextImageOnce();
        if (this.animationDone) {
            this.state = 'walking';
        }
    }

    /**
     * Loops through walking frames while in the walking state.
     * @private
     */
    animateWalking() {
        this.setImgType('walk');
        this.displayNextImage();
    }

    /**
     * Called when the boss is attacked: triggers hurt animation and state.
     * @override
     */
    attacked() {
        super.attacked();
        this.state = 'attacking';
    }

    /**
     * Applies damage to the boss, triggers hurt or death logic, and plays death sound if needed.
     *
     * @param {number} hitpoints - Amount of damage to apply.
     * @override
     */
    hit(hitpoints) {
        super.hit(hitpoints);
        this.state = 'hurted';
        if (this.energy <= 0) {
            if (this.world.playSounds) {
                this.audioDead.play();
            }
        }
    }
    
    /**
     * Pauses any ongoing sleep sound.
     */
    pause() {
        this.audio.pause();
    }
}