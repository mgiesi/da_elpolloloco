class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    levelEndX = 700;

    constructor(enemies, clouds, backgroundObjects, coins, levelEndX) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.levelEndX = levelEndX;
    }
}