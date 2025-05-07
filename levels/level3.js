class Level3 extends Level
{
    enemies = [
        /*new ChickenSmall(700),
        new ChickenSmall(900),
        new ChickenSmall(1300),
        new ChickenNormal(1400),
        new ChickenNormal(2000),
        new ChickenSmall(2400),
        new ChickenSmall(2600),*/
    ];
    clouds = [
        new Cloud(100, 1),
        new Cloud(700, 2),
        new Cloud(1200, 1),
        new Cloud(1800, 2),
        new Cloud(2300, 1),
        new Cloud(2800, 2),
        new Cloud(3200, 1),
    ];
    backgroundObjects = [

        new BackgroundObject('./img/5_background/layers/air_night.png', -819),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -819),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -819),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -819),

        new BackgroundObject('./img/5_background/layers/air_night.png', -100),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', -100),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', -100),
        new BackgroundObject('./img/5_background/layers/1_first_layer/3.png', -100),
        new BackgroundObject('./img/5_background/layers/air_night.png', 619),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 619),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 619),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619),
        
        new BackgroundObject('./img/5_background/layers/air_night.png', 619+719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 619+719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 619+719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 619+719),
        new BackgroundObject('./img/5_background/layers/air_night.png', 619+719*2),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 619+719*2),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 619+719*2),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619+719*2),
        
        new BackgroundObject('./img/5_background/layers/air_night.png', 619+719*3),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 619+719*3),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 619+719*3),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 619+719*3),
        new BackgroundObject('./img/5_background/layers/air_night.png', 619+719*4),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 619+719*4),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 619+719*4),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619+719*4)        
    ];
    door = new Door(619*4);
    coins = [
        new Coin(300, 300),
        new Coin(380, 250),
        new Coin(460, 300),

        new Coin(800, 150),
        new Coin(900, 100),
        new Coin(1000, 50),
        new Coin(1100, 50),
        new Coin(1150, 80),
        new Coin(1200, 110),
        
        new Coin(2000, 320),
        new Coin(2200, 320),
        new Coin(2400, 320),
    ];
    bottles = [
        new Bottle(380, 320),
        new Bottle(800, 180),
        new Bottle(860, 180),
        new Bottle(1600, 320),
        new Bottle(2000, 320),
    ];
    levelEndX = 619*5;
}