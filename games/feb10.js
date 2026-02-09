const pool = [
    'DSC_0678-Edit.webp', 'DSC_9155.webp', 'IMG_0620.webp', 'IMG_0636.webp',
    'IMG_0651.webp', 'IMG_0744.webp', 'IMG_0838.webp', 'IMG_2276.webp',
    'IMG_2869.webp', 'IMG_3157.webp', 'IMG_3656.webp', 'IMG_3769.webp',
    'IMG_4132.webp', 'IMG_4627.webp', 'IMG_5083.webp', 'IMG_5206.webp',
    'IMG_5332.webp', 'IMG_6852.webp', 'IMG_7010.webp', 'IMG_7210.webp',
    'IMG_7296.webp', 'IMG_8558.webp', 'IMG_8573.webp', 'IMG_8579.webp',
    'IMG_8758.webp'
];

document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const modalOverlay = document.getElementById('success-modal');
    const successPhoto = document.getElementById('success-photo');
    const finalScoreText = document.getElementById('final-score-text');
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let timerInterval;

    function popKiss() {
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        if (randomHole.children.length > 0) return;

        const kiss = document.createElement('div');
        kiss.classList.add('kiss');
        kiss.textContent = '💋';
        randomHole.appendChild(kiss);

        kiss.addEventListener('click', () => {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            kiss.remove();
        });

        setTimeout(() => {
            if (kiss.parentElement) kiss.remove();
        }, 1500);
    }

    function startGame() {
        gameInterval = setInterval(popKiss, 800);
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timerElement) timerElement.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);

        // Remove any remaining kisses
        document.querySelectorAll('.kiss').forEach(kiss => kiss.remove());

        const randomPhoto = pool[Math.floor(Math.random() * pool.length)];
        successPhoto.src = `../photos/${randomPhoto}`;
        successPhoto.style.display = 'block';

        if (finalScoreText) finalScoreText.textContent = `Final Score: ${score}`;

        modalOverlay.classList.add('show');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function resetGame() {
        score = 0;
        timeLeft = 30;
        scoreElement.textContent = `Score: 0`;
        if (timerElement) timerElement.textContent = `Time: 30s`;
        modalOverlay.classList.remove('show');
        successPhoto.style.display = 'none';
        startGame();
    }

    document.getElementById('replay-btn').addEventListener('click', resetGame);

    startGame();
});