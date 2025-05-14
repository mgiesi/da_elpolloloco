/**
 * @global
 * @type {number[]}
 * @description Array storing the IDs of active intervals for later cancellation.
 */
let intervalIds = [];

/**
 * @constant {number}
 * @description Default animation interval duration in milliseconds for ~60 FPS.
 */
const ANIMATION_INTERVAL = 1000/60;

/**
 * Creates an interval that can be stopped collectively by stopIntervals.
 *
 * @param {Function} fn - Callback to invoke on each tick of the interval.
 * @param {number} time - Time in milliseconds between each invocation.
 * @returns {void}
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Clears all intervals created via setStoppableInterval.
 *
 * @returns {void}
 */
function stopIntervals() {
    intervalIds.forEach(clearInterval);
}