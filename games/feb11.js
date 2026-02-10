const pool = [
    'DSC_0678-Edit.webp', 'DSC_9155.webp', 'IMG_0620.webp', 'IMG_0636.webp',
    'IMG_0651.webp', 'IMG_0744.webp', 'IMG_0838.webp', 'IMG_2276.webp',
    'IMG_2869.webp', 'IMG_3157.webp', 'IMG_3656.webp', 'IMG_3769.webp',
    'IMG_4132.webp', 'IMG_4627.webp', 'IMG_5083.webp', 'IMG_5206.webp',
    'IMG_5332.webp', 'IMG_6852.webp', 'IMG_7010.webp', 'IMG_7210.webp',
    'IMG_7296.webp', 'IMG_8558.webp', 'IMG_8573.webp', 'IMG_8579.webp',
    'IMG_8758.webp'
];

const words = ["SEPTEMBER", "HEART", "LOVE", "CUPID", "ROSE", "KISS", "CANDY", "POEM", "DANCE", "SWEETHEARTS"];

document.addEventListener('DOMContentLoaded', () => {
    const scrambledWordElement = document.getElementById('scrambled-word');
    const guessInputElement = document.getElementById('guess-input');
    const submitButton = document.getElementById('submit-btn');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const modalOverlay = document.getElementById('success-modal');
    const successPhoto = document.getElementById('success-photo');
    const finalScoreText = document.getElementById('final-score-text');

    let currentWordIndex = 0;
    let score = 0;
    let shuffledWords = [];

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function scrambleWord(word) {
        let scrambled = word.split('').sort(() => 0.5 - Math.random()).join('');
        // Ensure the word is actually scrambled
        if (scrambled === word) {
            return scrambleWord(word);
        }
        return scrambled;
    }

    function loadWord() {
        if (currentWordIndex >= shuffledWords.length) {
            endGame();
            return;
        }
        feedbackElement.textContent = '';
        feedbackElement.className = 'feedback';
        guessInputElement.value = '';
        
        // Clear previous tiles
        scrambledWordElement.innerHTML = '';
        
        const word = scrambleWord(shuffledWords[currentWordIndex]);
        word.split('').forEach(letter => {
            const tile = document.createElement('div');
            tile.className = 'letter-tile';
            tile.textContent = letter;
            scrambledWordElement.appendChild(tile);
        });
    }

    function checkGuess() {
        const guess = guessInputElement.value.toUpperCase();
        if (guess === shuffledWords[currentWordIndex]) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            feedbackElement.textContent = "Correct! 🎉";
            feedbackElement.className = 'feedback correct';
            currentWordIndex++;
            setTimeout(loadWord, 1500);
        } else {
            feedbackElement.textContent = "Try again!";
            feedbackElement.className = 'feedback incorrect';
        }
    }

    function startGame() {
        currentWordIndex = 0;
        score = 0;
        scoreElement.textContent = `Score: 0`;
        shuffledWords = shuffle([...words]).slice(0, 5); // 5 words per game
        modalOverlay.classList.remove('show');
        successPhoto.style.display = 'none';
        loadWord();
    }

    function endGame() {
        const randomPhoto = pool[Math.floor(Math.random() * pool.length)];
        successPhoto.src = `../photos/${randomPhoto}`;
        successPhoto.style.display = 'block';
        finalScoreText.textContent = `Final Score: ${score}/${shuffledWords.length}`;
        modalOverlay.classList.add('show');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    submitButton.addEventListener('click', checkGuess);
    guessInputElement.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            checkGuess();
        }
    });
    document.getElementById('replay-btn').addEventListener('click', startGame);

    startGame();
});
