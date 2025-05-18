
/**
 * Initializes game settings by loading stored preferences for music and sound.
 *
 * @returns {void}
 */
function initSettings() {
    loadSetting('music');
    loadSetting('sound');
}

/**
 * Loads a setting from localStorage, updates the UI toggle buttons,
 * and applies the setting to the game world.
 *
 * @param {string} key - The setting key ('music' or 'sound').
 * @returns {void}
 */
function loadSetting(key) {
    let value = (localStorage.getItem(key) === "true");
    const chkBtnOnRef = document.getElementById('settings-' + key + '-on');
    const chkBtnOffRef = document.getElementById('settings-' + key + '-off');
    if (value) {
        chkBtnOnRef.classList.remove('hidden');
        chkBtnOffRef.classList.add('hidden');
    } else {
        chkBtnOnRef.classList.add('hidden');
        chkBtnOffRef.classList.remove('hidden');
    }
    
    world.setSetting(key, value);
}

/**
 * Sets a setting value to the given value and stores it in localStorage.
 * 
 * @param {string} key 
 * @param {string} value 
 */
function setSetting(key, value) {
    localStorage.setItem(key, value);
    loadSetting(key);
}

/**
 * Toggles a setting value between true and false,
 * saves it in localStorage, and reloads the setting elements.
 *
 * @param {string} key - The setting key to toggle ('music' or 'sound').
 * @returns {void}
 */
function toggleSetting(key) {
    let value = (localStorage.getItem(key) === "true");
    value = !value;
    localStorage.setItem(key, value);
    loadSetting(key);
}