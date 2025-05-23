/**
 * @global
 * @type {string}
 * @description Identifier of the currently visible UI container/page.
 */
let currentContainer;
let audioLevelDone = new Audio('./audio/leveldone.mp3');
let audioGameWon = new Audio('./audio/gamewon.mp3');
let audioGameOver = new Audio('./audio/gameover.mp3');

/**
 * Navigates to a specified page by hiding all containers, showing the target,
 * updating state, toggling controls, and managing sounds.
 *
 * @param {string} page - The key of the container to navigate to.
 * @returns {void}
 */
function navigateTo(page) {
    const containerRefs = document.getElementsByClassName('container');
    Array.from(containerRefs).forEach(container => {
        container.classList.add('hidden');
    });
    document.getElementById('container-' + page).classList.remove('hidden');
    currentContainer = page;
    toggleGameButtons();
    stopSounds();
    playGameOverSound();
}

/**
 * Plays the game over sound if the current container is 'gameover'.
 */
function playGameOverSound() {
    if (currentContainer === 'gameover') {
        if (world.playSounds) {
            audioGameOver.currentTime = 0;
            audioGameOver.play();
        }
    }
}

/**
 * Stops all game sounds by pausing the audio elements.
 */
function stopSounds() {
    audioGameWon.pause();
    audioLevelDone.pause();
    audioGameOver.pause();
}

/**
 * Shows or hides the game control buttons based on whether
 * the current container is the game view.
 *
 * @returns {void}
 */
function toggleGameButtons() {
    const containerRefs = document.getElementById('container-game-btns');
    if (currentContainer === 'game') {
        containerRefs.classList.remove('hidden'); 
    } else {
        containerRefs.classList.add('hidden');
    }
}

/**
 * Displays landscape orientation info by hiding all containers,
 * showing the landscape info screen, and pausing the game world.
 *
 * @returns {void}
 */
function showLandscapeInfo() {
    const containerRefs = document.getElementsByClassName('container');
    Array.from(containerRefs).forEach(container => {
        container.classList.add('hidden');
    });
    document.getElementById('container-landscapeinfo').classList.remove('hidden');
    document.getElementById('container-button-overlay').classList.add('hidden');
    if (world !== undefined) {
        world.pause = true;
    }
}

/**
 * Hides the landscape orientation info by showing the game container,
 * updating the current container state, and resuming the game world.
 */
function hideLandscapeInfo() {
    document.getElementById('container-button-overlay').classList.remove('hidden');
    if (currentContainer === 'game') {
        currentContainer = 'pause';
    }
    navigateTo(currentContainer);
}

/**
 * Jumps to the next level or the game won screen.
 *
 * @returns {void}
 */
function showNextLevelScreen() {
    world.stopGame();
    if (world.levelIdx >= 3) {
        showGameWonScreen();
    } else {
        showNextLevelScreenImpl();
    }
}

/**
 * Jumps to the 'game won' screen and plays the game won sound.
 */
function showGameWonScreen() {
    navigateTo('gamewon');
    if (world.playSounds) {
        audioGameWon.currentTime = 1;
        audioGameWon.play();
    }
}

/**
 * Jumps to the 'next level' screen and plays the level done sound.
 * @private
 */
function showNextLevelScreenImpl() {
    document.getElementById('nextlevel_text').innerHTML = "Level " + (world.levelIdx + 1);
    navigateTo('nextlevel');
    if (world.playSounds) {
        audioLevelDone.currentTime = 1;
        audioLevelDone.play();
    }
}

/**
 * Toggles fullscreen mode for the game container element,
 * handling browser vendor prefixes for entering/exiting fullscreen.
 *
 * @returns {void}
 */
function toggleFullscreen() {
    if (document.fullscreenElement) {
        initFullscreen();
    } else {
        resetFullscreen();
    }
    resizeCanvasProportional();
}

/**
 * Initializes fullscreen mode by setting the fullscreen flag to false
 * and exiting fullscreen if possible.
 * @private
 */
function initFullscreen() {
    fullscreen = false;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Resets fullscreen mode by setting the fullscreen flag to true
 * and requesting fullscreen on the game container element.
 * @private
 */
function resetFullscreen() {
    fullscreen = true;
    const element = document.getElementById('container-game-wrapper');
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}