let canvas;
let world;
let keyboard = new Keyboard();
let gameLevel;

function init() {
    navigateTo('splashscreen');
    checkOrientation();
}

function initGame() {
    canvas = document.getElementById('canvas-game');
    world = new World(canvas, keyboard);
    initSettings();
}

function setGameLevel(level) {
    gameLevel = level;
    world.character.resetEnergy();
    world.startGame(1, level);
    navigateTo('game');
}

function restartGame() {
    world.character.resetEnergy();
    world.startGame(1, gameLevel);
    navigateTo('game');
}

function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;    
    if (isLandscape) {
        hideLandscapeInfo();
    } else {
        showLandscapeInfo();
    }
}

window.addEventListener("keydown", (e) => {
    keyboard.keyDown(e.key);
});

window.addEventListener("keyup", (e) => {
    keyboard.keyUp(e.key);
});

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
