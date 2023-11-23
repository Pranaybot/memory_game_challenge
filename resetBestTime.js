const resetButton = document.querySelector('#reset');
const topTime = document.querySelector('h3');
const savedTimes = JSON.parse(localStorage.getItem("times"));

resetButton.addEventListener('click', function(event) {
    if (localStorage.length > 0) {
        const currentTime = savedTimes.slice(-1)[0].bestTime;
        topTime.innerHTML = topTime.innerHTML.replace(' ' + currentTime, '-');
        localStorage.clear();
    }    
});

