function navigateTo(page) {
    const containerRefs = document.getElementsByClassName('container');
    Array.from(containerRefs).forEach(container => {
        container.classList.add('hidden');
    });
    document.getElementById('container-' + page).classList.remove('hidden');
}