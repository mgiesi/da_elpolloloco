let canvas;
let world;
let keyboard;
let gameLevel;
let fullscreen;

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
    initSoundView();
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


function initSoundView() {
    const btnRef = document.getElementById('btn-toggle-sounds-img');
    if (world.playSounds || world.playMusic) {
        btnRef.src = './img/icons/sounds_off.svg' 
    } else {
        btnRef.src = './img/icons/sounds_on.svg' 
    }
}

/**
 * Toggles the sound (music and sound effects).
 */
function toggleSounds() {
    if (world.playSounds || world.playMusic) {
        setSetting('music', false);
        setSetting('sound', false);
    } else {
        setSetting('music', true);
        setSetting('sound', true);
    }
    initSoundView();
}

/**
 * Function to update the size of the game canvas and to
 * show the orientation information screen if application is
 * in landscape mode.
 */
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
    const wrapper = document.getElementById('container-game-wrapper');
    const maxW = Math.min(wrapper.clientWidth, 1920);
    const maxH = Math.min(wrapper.clientHeight, 1080);
    const heightBasedW = maxH * (720 / 480);
    const widthBasedH = maxW * (480 / 720);
    if (heightBasedW <= maxW) {
        resizeContainers(heightBasedW, maxH)
    } else {
        resizeContainers(maxW, widthBasedH);
    }
}

/**
 * Sets the width/height and minwidth/minheight for the game containers.
 * 
 * @param {number} width new width 
 * @param {number} height new height
 */
function resizeContainers(width, height) {
    const canvas = document.getElementById('canvas-game');
    const containerButtons = document.getElementById('container-button-overlay');
    let widthText = fullscreen ? '100%' : `${width}px`;
    let heightText = fullscreen ? '100%' : `${height}px`;
    canvas.style.width = widthText;
    canvas.style.height = heightText;
    containerButtons.style.width = widthText;
    containerButtons.style.height = heightText;
    const containerRefs = document.getElementsByClassName('container');
    Array.from(containerRefs).forEach(container => {
        container.style.maxWidth = widthText;
        container.style.maxHeight = heightText;
    });    
}

// Event listeners to handle dynamic changes
window.addEventListener("resize", onResizeScreen);
window.addEventListener("orientationchange", checkOrientation);