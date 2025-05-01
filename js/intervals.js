let intervalIds = [];

const ANIMATION_INTERVAL = 1000/60;

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopIntervals() {
    intervalIds.forEach(clearInterval);
}