class Level2 extends Level
{
    enemies = [
        new ChickenSmall(700),
        new ChickenNormal(900),
        new ChickenSmall(1300),
        new ChickenNormal(1400),
        new ChickenNormal(2000),
        new ChickenSmall(2400),
        new ChickenSmall(2600),
        new ChickenSmall(3000),
        new ChickenNormal(3200),
    ];
    clouds = [
        new Cloud(100, 1),
        new Cloud(700, 2),
        new Cloud(1200, 1),
        new Cloud(1800, 2),
        new Cloud(2300, 1),
        new Cloud(2800, 2),
        new Cloud(3200, 1),
        new Cloud(3800, 2),
        new Cloud(4200, 1),
    ];
    backgroundObjects = [

        new BackgroundObject('./img/5_background/layers/air_afternoon.png', -819),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -819),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -819),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -819),

        new BackgroundObject('./img/5_background/layers/air_afternoon.png', -100),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', -100),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', -100),
        new BackgroundObject('./img/5_background/layers/1_first_layer/3.png', -100),
        new BackgroundObject('./img/5_background/layers/air_afternoon.png', 619),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 619),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 619),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619),
        
        new BackgroundObject('./img/5_background/layers/air_afternoon.png', 619+719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 619+719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 619+719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 619+719),
        new BackgroundObject('./img/5_background/layers/air_afternoon.png', 619+719*2),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 619+719*2),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 619+719*2),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619+719*2),
        
        new BackgroundObject('./img/5_background/layers/air_afternoon.png', 619+719*3),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 619+719*3),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 619+719*3),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 619+719*3),
        new BackgroundObject('./img/5_background/layers/air_afternoon.png', 619+719*4),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 619+719*4),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 619+719*4),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619+719*4),
        
        new BackgroundObject('./img/5_background/layers/air_afternoon.png', 619+719*5),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 619+719*5),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 619+719*5),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 619+719*5),
        new BackgroundObject('./img/5_background/layers/air_afternoon.png', 619+719*6),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 619+719*6),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 619+719*6),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619+719*6)       
    ];
    door = new Door(619*6);
    coins = [
        new Coin(400, 300),
        new Coin(480, 300),
        new Coin(560, 300),

        new Coin(800, 150),
        new Coin(900, 150),
        new Coin(1000, 150),
        new Coin(1100, 150),
        new Coin(1150, 100),
        new Coin(1200, 100),
        new Coin(1300, 100),
        
        new Coin(2000, 320),
        new Coin(2200, 300),
        new Coin(2400, 280),
        new Coin(2600, 260),
        new Coin(2800, 240),
        new Coin(3000, 220),
    ];
    bottles = [
        new Bottle(380, 320),
        new Bottle(800, 320),
        new Bottle(1200, 320),
        new Bottle(1600, 320),
        new Bottle(2000, 320),
    ];
    levelEndX = 619*7;
}