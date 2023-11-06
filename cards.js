const startButton = document.querySelector('#start');

startButton.addEventListener('click', function(event) {
    window.location.href = "cards_copy.html";
});

function preventBack() { window.history.forward(); }  
setTimeout("preventBack()", 0);  
window.onunload = function () { null }; 
