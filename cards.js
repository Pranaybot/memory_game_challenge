const cards = document.querySelectorAll('.memory-card');
const savedTimes = localStorage.getItem("times") ? JSON.parse(localStorage.getItem("times")) : [];
const countdownEl = document.querySelector('#countdown');

const startingMinutes = 3;
let time = startingMinutes * 60;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let numCardsMatched = 0;

function updateCountdown () {

    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}:${seconds}`;

    if(time > 0) {
        time--;  
    } else {
        setTimeout(function () {
            if (confirm("The matching game is over." + 
            "Do you want to play again?") == true) {
                window.location.href = "cards.html";
            } else {
                window.location.href = "index.html";
            }
        }, 1500);
    } 
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.attribute === secondCard.dataset.attribute;
    isMatch ? disableCards() : unflipCards();
}
 
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    numCardsMatched += 2;

    if (numCardsMatched === document.querySelector('.memory-game').childElementCount - 1) {
        const time1 = "300";
        let time2 = countdownEl.innerHTML.replace(":", "");
        let res = '';

        const minuteDiff = parseInt(time1 / 100 - time2 / 100);
        let secondDiff = '';

        if((60-(time1 % 100)) - (time2 % 100) < 10) {
            secondDiff = '0' + ((60-(time1 % 100)) - (time2 % 100));
        } else if ((60-(time1 % 100)) - (time2 % 100) === 60) {
            secondDiff = '0' + '0';
        } else {
            secondDiff = ((60-(time1 % 100)) - (time2 % 100)).toString();
        }
        
        res = (minuteDiff).toString() + ':' + secondDiff;

        if (savedTimes.length === 0) { 
            savedTimes.push({bestTime: res});
            localStorage.setItem("times", JSON.stringify(savedTimes));
        } else {
            let resTime = res.split(":");
            let besTime = savedTimes.slice(-1)[0].bestTime.split(":");
            const resSeconds = resTime[0]*60+resTime[1]*1;
            const besSeconds = besTime[0]*60+besTime[1]*1;

            if (resSeconds < besSeconds) {
                savedTimes.push({bestTime: res});
                localStorage.setItem("times", JSON.stringify(savedTimes));
            }
        }

        setTimeout(function() {
            alert("You have successfully completed the game in " + 
            (minuteDiff) + " minutes and " + (secondDiff).toString()
            + " seconds.");
            window.location.href = "index.html";
        }, 1500);
        
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

setInterval(updateCountdown, 1000);

cards.forEach(card => card.addEventListener('click', flipCard));
