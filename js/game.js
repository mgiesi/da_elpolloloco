let canvas;
let world;
let keyboard;
let gameLevel;

function init() {
    navigateTo('splashscreen');
    onResizeScreen();
}

function initGame() {
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas-game');
    world = new World(canvas, keyboard);
    initSettings();
}

function setGameLevel(level) {
    gameLevel = level;
    world.character.resetEnergy();
    world.startGame(1, level);
    navigateTo('game');
    resizeCanvasProportional();
}

function restartGame() {
    world.character.resetEnergy();
    world.startGame(1, gameLevel);
    navigateTo('game');
    resizeCanvasProportional();
}

function onResizeScreen() {
    checkOrientation();
    resizeCanvasProportional();
}

function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    if (isLandscape) {
        hideLandscapeInfo();
    } else {
        showLandscapeInfo();
    }
}

function resizeCanvasProportional() {
    const canvas = document.getElementById('canvas-game');
    const wrapper = document.getElementById('container-game');
    const maxW = Math.min(wrapper.clientWidth, 1920);
    const maxH = Math.min(wrapper.clientHeight, 1080);

    const heightBasedW = maxH * (720 / 480);
    const widthBasedH = maxW * (480 / 720);

    if (heightBasedW <= maxW) {
        canvas.style.width = `${heightBasedW}px`;
        canvas.style.height = `${maxH}px`;
    } else {
        canvas.style.width = `${maxW}px`;
        canvas.style.height = `${widthBasedH}px`;
    }
}

window.addEventListener("resize", onResizeScreen);
window.addEventListener("orientationchange", checkOrientation);
