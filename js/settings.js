function initSettings() {
    loadSetting('music');
    loadSetting('sound');
}

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

function toggleSetting(key) {
    let value = (localStorage.getItem(key) === "true");
    value = !value;
    localStorage.setItem(key, value);
    loadSetting(key);
}