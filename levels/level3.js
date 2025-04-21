class Level3 extends Level
{
    enemies = [
        new ChickenSmall(),
        new ChickenNormal()
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('./img/5_background/layers/air.png', 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/air.png', 719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),
        
        new BackgroundObject('./img/5_background/layers/air.png', 719*2),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('./img/5_background/layers/air.png', 719*3),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719*3),
        
        new BackgroundObject('./img/5_background/layers/air.png', 719*4),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719*4),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719*4),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719*4),
        new BackgroundObject('./img/5_background/layers/air.png', 719*5),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719*5),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719*5),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719*5)        
    ];
    door = new Door(719*4);
    coins = [
        new Coin(300, 300),
        new Coin(380, 250),
        new Coin(460, 300),
        
        new Coin(2000, 320),
        new Coin(2200, 320),
        new Coin(2400, 320),
    ];
    bottles = [
        new Bottle(380, 320)
    ];
    levelEndX = 719*5+600;
}