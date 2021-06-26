const cards = document.querySelectorAll('.card')

let lockBoard = false;
let firstCard;
let secondCard;
let hasFlippedCard = false;
let scoreDisplay = document.querySelector('#showScore');
let score = 0


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
    checkMatchingCards();
    checkResult();
}


function checkMatchingCards() {
    let matchedCards = firstCard.dataset.color === secondCard.dataset.color;

    matchedCards ? disableCards(scoreDisplay.textContent = score += 2) : unflipCards();
}


function checkResult() {

    if (score === 12) {
        confirm('Congratulations! You won the game.');
        shuffle();
        location.reload();
    }
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}


function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


function shuffle() {
    cards.forEach(card => {
        let randomize = Math.floor(Math.random() * 12);
        card.style.order = randomize;
    });
}


cards.forEach(card => card.addEventListener('click', flipCard));
unflipCards();



//Timer
const timerDisplay = document.querySelector('#timeLeft');
const startBtn = document.querySelector('#startBtn');
let timeLeft = 30;
let btnIsClicked = false;

function countDown() {
    setInterval(function () {
        if (timeLeft == 0) {
            if (score < 12) {
                alert(`Game Over! Try again.`);
            }
            startBtn.disabled = false;
            location.reload();
        }
        timeLeft < 10 ? timerDisplay.innerHTML = '0' + timeLeft : timerDisplay.innerHTML = timeLeft;
        timeLeft -= 1;
    }, 1000)
}

function startGame() {
    startBtn.disabled = true;
    resetBoard();
    shuffle();
    countDown();
}

startBtn.addEventListener('click', startGame)





