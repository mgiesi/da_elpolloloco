class Enemy extends MovableObject {
    hitpoints = 2;

    killByJumpOn = false;

    dead = false;

    jumpedOn() {
        if (this.killByJumpOn) {
            this.kill();
        }
    }

    kill() {
        this.energy = 0;
    }
}