let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas-game');
    world = new World(canvas, keyboard);
    initSettings();
}

function setLevel(level) {
    navigateTo('game');
    world.startGame(level);
}

window.addEventListener("keydown", (e) => {
    keyboard.keyDown(e.key);
});

window.addEventListener("keyup", (e) => {
    keyboard.keyUp(e.key);
});