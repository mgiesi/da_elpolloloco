let currentContainer;

function navigateTo(page) {
    const containerRefs = document.getElementsByClassName('container');
    Array.from(containerRefs).forEach(container => {
        container.classList.add('hidden');
    });
    document.getElementById('container-' + page).classList.remove('hidden');
    currentContainer = page;
    toggleGameButtons();
}

function toggleGameButtons() {
    const containerRefs = document.getElementById('container-game-btns');
    if (currentContainer === 'game') {
        containerRefs.classList.remove('hidden'); 
    } else {
        containerRefs.classList.add('hidden');
    }
}

function showLandscapeInfo() {
    const containerRefs = document.getElementsByClassName('container');
    Array.from(containerRefs).forEach(container => {
        container.classList.add('hidden');
    });
    document.getElementById('container-landscapeinfo').classList.remove('hidden');
    if (world !== undefined) {
        world.pause = true;
    }
}

function hideLandscapeInfo() {
    navigateTo(currentContainer);
}

function showNextLevelScreen() {
    world.stopGame();
    if (world.levelIdx >= 3) {
        navigateTo('gamewon');
    } else {
        document.getElementById('nextlevel_text').innerHTML = "Level " + (world.levelIdx + 1);
        navigateTo('nextlevel');
    }
}

function toggleFullscreen() {
    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    } else {
        const element = document.getElementById('container-game-wrapper');
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
            element.msRequestFullscreen();
        } else if (element.webkitRequestFullscreen) {  // iOS Safari
            element.webkitRequestFullscreen();
        }
    }
}