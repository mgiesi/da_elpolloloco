class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    levelEndX = 700;

    constructor(enemies, clouds, backgroundObjects, coins, bottles, levelEndX) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.levelEndX = levelEndX;
    }
}