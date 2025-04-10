let intervalIds = [];

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopIntervals() {
    intervalIds.forEach(clearInterval);
}