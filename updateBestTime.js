const bestTime = document.querySelector('h3');
const savedTimeValues = JSON.parse(localStorage.getItem("times"));

if (localStorage.length > 0) {
    const currentBestTime = savedTimeValues.slice(-1)[0].bestTime;
    if (bestTime.innerHTML.includes('-')) {
        bestTime.innerHTML = bestTime.innerHTML.slice(0, -1);
    }

    bestTime.innerHTML = bestTime.innerHTML + ' ' + currentBestTime;
}
