class Level3 extends Level
{
    endboss = new Endboss(4000);
    enemies = [
        new ChickenNormal(900),
        new ChickenSmall(1300),
        new ChickenNormal(1400),
        new ChickenNormal(2000),
        new ChickenSmall(2400),
        new ChickenSmall(2600), 
        new ChickenNormal(2900),
        new ChickenNormal(3200),
        new ChickenNormal(3600),
        this.endboss
    ];
    clouds = [
        new Cloud(100, 1),
        new Cloud(700, 2),
        new Cloud(1200, 1),
        new Cloud(1800, 2),
        new Cloud(2300, 1),
        new Cloud(2800, 2),
        new Cloud(3200, 1),
        new Cloud(2800, 2),
        new Cloud(3200, 1),
        new Cloud(3800, 2),
        new Cloud(4200, 1),
        new Cloud(4700, 2),
        new Cloud(5400, 1),
        new Cloud(5900, 2),
        new Cloud(6300, 1),
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
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619+719*4),
        
        new BackgroundObject('./img/5_background/layers/air_night.png', 619+719*5),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 619+719*5),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 619+719*5),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 619+719*5),
        new BackgroundObject('./img/5_background/layers/air_night.png', 619+719*6),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 619+719*6),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 619+719*6),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619+719*6),
        
        new BackgroundObject('./img/5_background/layers/air_night.png', 619+719*7),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 619+719*7),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 619+719*7),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 619+719*7),
        new BackgroundObject('./img/5_background/layers/air_night.png', 619+719*8),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 619+719*8),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 619+719*8),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619+719*8),
        
        new BackgroundObject('./img/5_background/layers/air_night.png', 619+719*9),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 619+719*9),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 619+719*9),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 619+719*9),
        new BackgroundObject('./img/5_background/layers/air_night.png', 619+719*9),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 619+719*9),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 619+719*9),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 619+719*9) 
    ];
    door = new Door(619*9);
    coins = [
        new Coin(500, 250),
        new Coin(600, 250),
        new Coin(700, 250),

        new Coin(1100, 200),
        new Coin(1200, 100),
        new Coin(1300, 200),
        new Coin(1400, 100),
        new Coin(1500, 200),
        new Coin(1600, 100),
        
        new Coin(2000, 100),
        new Coin(2200, 150),
        new Coin(2400, 200),
        new Coin(2600, 250),
        new Coin(2800, 300),
        new Coin(3000, 250),
        new Coin(4000, 300),
        new Coin(5000, 150),
        new Coin(5200, 200),
        new Coin(5400, 250),
        new Coin(5600, 300),
    ];
    bottles = [
        new Bottle(500, 320),
        new Bottle(800, 180),
        new Bottle(860, 180),
        new Bottle(1600, 320),
        new Bottle(2000, 320),
        new Bottle(3200, 100),
        new Bottle(3400, 150),
    ];
    levelEndX = 619*10;
}