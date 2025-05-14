class Endboss extends Enemy {
    width = 320;
    height = 320;
    currentImgType = 'alert';

    state = 'idle';

    audio;
    audioDead;
    
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

    initAudio() {
        this.audio = new Audio('./audio/endboss.mp3');
        this.audio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.audioDead = new Audio('./audio/endbossdead.mp3');
    }

    initPosition(x) {
        this.x = x;
        this.y = 480 - this.height - 35;
    }

    initGameLevel() {
        switch (gameLevel) {
            case 'easy':
                this.hitpoints = 4;
                this.maxenergy = 50;
                this.speed = 0.5 + Math.random();
                break;
            case 'medium':
                this.hitpoints = 15;
                this.maxenergy = 100;
                this.speed = 0.6 + Math.random();
                break;
            case 'hard':
                this.hitpoints = 30;
                this.maxenergy = 150;
                this.speed = 0.7 + Math.random();
                break;
        }
        this.energy = this.maxenergy;
    }

    isIdle() {
        return this.state === 'idle';
    }

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

    moveDead() {
        this.y += 10;
        if (this.y > 200) {
            this.y = 200;
        }
    }

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

    animateDead() {
        this.audio.pause();
        this.setImgType('dead');
        this.displayNextImageOnce();
    }

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

    animateAttacking() {
        this.setImgType('attack');
        this.displayNextImageOnce();
        if (this.animationDone) {
            this.state = 'walking';
        }
    }

    animateHurted() {
        this.setImgType('hurt');
        this.displayNextImageOnce();
        if (this.animationDone) {
            this.state = 'walking';
        }
    }

    animateWalking() {
        this.setImgType('walk');
        this.displayNextImage();
    }

    attacked() {
        super.attacked();
        this.state = 'attacking';
    }

    hit(hitpoints) {
        super.hit(hitpoints);
        this.state = 'hurted';
        if (this.energy <= 0) {
            if (this.world.playSounds) {
                this.audioDead.play();
            }
        }
    }
}