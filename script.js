// 
const cards = document.querySelectorAll('.box');
const flipSound = new Audio("./music/pokeball3n.mp3");
flipSound.playbackRate = 0.5;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; // Prevent double-clicking the same card
    
    this.classList.add('flip');
    
    // Play the flip sound
    flipSound.currentTime = 0; // Restart sound from the beginning
    flipSound.play().catch(error => {
        console.error("Error playing sound:", error);
    });

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
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
    }, 1500); // This duration should match your CSS transition duration
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
