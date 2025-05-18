/**
 * Represents a small chicken enemy with size, animation frames, and difficulty-based stats.
 * Extends the generic Chicken class, customizing appearance, hitpoints, speed, and kill behavior.
 *
 * @extends Chicken
 */
class ChickenSmall extends Chicken {
    width = 50;
    height = 50;
    /**
     * Collision box offsets for the small chicken.
     * @type {{ top: number, right: number, bottom: number, left: number }}
     */
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    };

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    /**
     * Creates a small chicken at the given x-coordinate, loads its images and sounds,
     * initializes its position, difficulty-based stats, and starts movement & animation loops.
     *
     * @param {number} x - The horizontal spawn position for the small chicken.
     */
    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages('walk', this.IMAGES_WALKING, 150);
        this.loadImages('dead', this.IMAGES_DEAD, 150);
        this.initGameLevel();
        this.initAudio();
        this.initPosition(x);
        this.move();
        this.animate();
    }

    /**
     * Initializes the attack sound for the small chicken.
     * @private
     */
    initAudio() {        
        this.audioAttack = new Audio('./audio/chickenattack.mp3');
    }

    /**
     * Sets the initial position based on x and aligns vertically to the ground.
     *
     * @param {number} x - Horizontal spawn coordinate.
     * @private
     */
    initPosition(x) {
        this.x = x;
        this.y = 480 - this.height - 60;
    }

    /**
     * Configures hitpoints, max energy, and speed based on the global gameLevel setting.
     * Supported levels: 'easy', 'medium', 'hard'.
     *
     * @private
     */
    initGameLevel() {
        switch (gameLevel) {
            case 'easy':
                this.setGameLevel(1, 5, 0.3 + Math.random());
                break;
            case 'medium':
                this.setGameLevel(4, 15, 0.5 + Math.random());
                break;
            case 'hard':
                this.setGameLevel(8, 30, 0.6 + Math.random());
                break;
        }
        this.energy = this.maxenergy;
    }

    /**
     * Overrides the kill method to adjust vertical position before marking dead.
     * @override
     */
    kill() {
        this.y = 480 - this.height - 50;
        super.kill();
    }
}