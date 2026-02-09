const pool = [
    'DSC_0678-Edit.webp', 'DSC_9155.webp', 'IMG_0620.webp', 'IMG_0636.webp',
    'IMG_0651.webp', 'IMG_0838.webp', 'IMG_2276.webp',
    'IMG_2869.webp', 'IMG_3157.webp', 'IMG_3656.webp', 'IMG_3769.webp',
    'IMG_4132.webp', 'IMG_4627.webp', 'IMG_5083.webp', 'IMG_5206.webp',
    'IMG_5332.webp', 'IMG_7010.webp', 'IMG_7210.webp',
    'IMG_7296.webp', 'IMG_8558.webp', 'IMG_8573.webp', 'IMG_8579.webp',
    'IMG_8758.webp'
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.memory-grid');
    const status = document.getElementById('status');
    const modalOverlay = document.getElementById('success-modal');
    const successPhoto = document.getElementById('success-photo');
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let moves = 0;

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
        // Select 6 random photos for 12 cards
        const shuffledPool = [...pool];
        shuffle(shuffledPool);
        const selectedPhotos = shuffledPool.slice(0, 6);
        cards = [...selectedPhotos, ...selectedPhotos];
        shuffle(cards);

        grid.innerHTML = '';
        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = cards[i];

            const inner = document.createElement('div');
            inner.classList.add('card-inner');

            const back = document.createElement('div');
            back.classList.add('card-back');
            // Back is shown initially

            const front = document.createElement('div');
            front.classList.add('card-front');

            const img = document.createElement('img');
            img.src = `../photos/${cards[i]}`;
            front.appendChild(img);

            inner.appendChild(back);
            inner.appendChild(front);
            card.appendChild(inner);

            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                moves++;
                status.textContent = `Moves: ${moves}`;
                checkForMatch();
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            matchedCards.push(card1, card2);
            flippedCards = [];
            if (matchedCards.length === cards.length) {
                setTimeout(endGame, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    function endGame() {
        // Pick a random success photo from the pool (that wasn't necessarily in the game)
        const randomPhoto = pool[Math.floor(Math.random() * pool.length)];
        successPhoto.src = `../photos/${randomPhoto}`;
        successPhoto.style.display = 'block';

        modalOverlay.classList.add('show');
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function resetGame() {
        modalOverlay.classList.remove('show');
        successPhoto.style.display = 'none';
        matchedCards = [];
        moves = 0;
        status.textContent = `Moves: 0`;
        createBoard();
    }

    document.getElementById('replay-btn').addEventListener('click', resetGame);

    createBoard();
});
