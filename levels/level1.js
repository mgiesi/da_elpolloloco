const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(719*5)
    ],
    [
        new Cloud()
    ],
    [
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
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719*5),
        
    ],
    [
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
    ],
    719*5+600
);