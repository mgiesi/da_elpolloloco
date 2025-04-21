let currentContainer;

function navigateTo(page) {
    const containerRefs = document.getElementsByClassName('container');
    Array.from(containerRefs).forEach(container => {
        container.classList.add('hidden');
    });
    document.getElementById('container-' + page).classList.remove('hidden');
    currentContainer = page;
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