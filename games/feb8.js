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
    const heartsContainer = document.getElementById('hearts-container');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const modalOverlay = document.getElementById('success-modal');
    const successPhoto = document.getElementById('success-photo');
    let score = 0;
    let timeLeft = 30;
    let heartsInterval;
    let timerInterval;

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        // Randomize heart type
        const rand = Math.random();
        let points = 1;
        if (rand < 0.05) {
            heart.classList.add('heart-gold');
            points = 10;
        } else if (rand < 0.20) {
            heart.classList.add('heart-pink');
            points = 5;
        }

        heart.style.left = `${Math.random() * 90}%`;
        heart.style.animationDuration = '3s';
        heartsContainer.appendChild(heart);

        heart.addEventListener('click', () => {
            score += points;
            scoreElement.textContent = `Score: ${score}`;
            heart.remove();
        });

        setTimeout(() => {
            if (heart.parentElement) heart.remove();
        }, 3000);
    }

    function startGame() {
        heartsInterval = setInterval(createHeart, 600);
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(heartsInterval);
        clearInterval(timerInterval);

        const randomPhoto = pool[Math.floor(Math.random() * pool.length)];
        successPhoto.src = `../photos/${randomPhoto}`;
        successPhoto.style.display = 'block';

        document.getElementById('final-score-text').textContent = `Final Score: ${score}`;

        modalOverlay.classList.add('show');
        heartsContainer.innerHTML = '';
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
        timerElement.textContent = `Time: 30s`;
        modalOverlay.classList.remove('show');
        successPhoto.style.display = 'none';
        startGame();
    }

    document.getElementById('replay-btn').addEventListener('click', resetGame);
    startGame();
});
