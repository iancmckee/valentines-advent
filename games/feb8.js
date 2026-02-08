document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.getElementById('hearts-container');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const modalOverlay = document.getElementById('success-modal');
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
        // Faster falling speed (3s instead of 5s)
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
        // Spawn hearts more frequently
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
        modalOverlay.classList.add('show');

        // Clear remaining hearts
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
        scoreElement.textContent = `Score: ${score}`;
        timerElement.textContent = `Time: ${timeLeft}s`;
        modalOverlay.classList.remove('show');
        startGame();
    }

    document.getElementById('replay-btn').addEventListener('click', resetGame);
    startGame();
});
