let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    navigateTo('splashscreen');
    checkOrientation();
}

function initGame() {
    canvas = document.getElementById('canvas-game');
    world = new World(canvas, keyboard);
    initSettings();
}

function setLevel(level) {
    navigateTo('game');
    world.startGame(level);
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
