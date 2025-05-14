let canvas;
let world;
let keyboard;
let gameLevel;

/**
 * Initializes the application by navigating to the splash screen.
 *
 * @returns {void}
 */
function init() {
    navigateTo('splashscreen');
    onResizeScreen();
}

/**
 * Sets up the core game components: keyboard input, canvas, and world.
 * Also initializes game settings.
 *
 * @returns {void}
 */
function initGame() {
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas-game');
    world = new World(canvas, keyboard);
    initSettings();
}

/**
 * Starts a new game at the specified difficulty level.
 * Resets the player character's energy, starts the world,
 * navigates to the game view, and resizes the canvas proportionally.
 *
 * @param {number} level - Difficulty level to start the game at.
 * @returns {void}
 */
function setGameLevel(level) {
    gameLevel = level;
    world.character.resetEnergy();
    world.startGame(1, level);
    navigateTo('game');
    resizeCanvasProportional();
}

/**
 * Restarts the current game with the previously selected difficulty level.
 * Resets the player character's energy, restarts the world,
 * navigates to the game view, and resizes the canvas proportionally.
 *
 * @returns {void}
 */
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

/**
 * Checks the current screen orientation and shows or hides
 * landscape mode information accordingly.
 *
 * @returns {void}
 */
function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    if (isLandscape) {
        hideLandscapeInfo();
    } else {
        showLandscapeInfo();
    }
}

/**
 * Resizes the game canvas element proportionally based on
 * the container size, while maintaining a 4:3 aspect ratio.
 *
 * @returns {void}
 */
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

// Event listeners to handle dynamic changes
window.addEventListener("resize", onResizeScreen);
window.addEventListener("orientationchange", checkOrientation);
