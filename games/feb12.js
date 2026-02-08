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
    const modalOverlay = document.getElementById('success-modal');
    const successPhoto = document.getElementById('success-photo');
    let score = 0;
    let gameInterval;

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
            if (score >= 10) {
                endGame();
            }
        });

        setTimeout(() => {
            if (kiss) kiss.remove();
        }, 1500);
    }

    function startGame() {
        gameInterval = setInterval(popKiss, 800);
    }

    function endGame() {
        clearInterval(gameInterval);

        const randomPhoto = pool[Math.floor(Math.random() * pool.length)];
        successPhoto.src = `../photos/${randomPhoto}`;
        successPhoto.style.display = 'block';

        modalOverlay.classList.add('show');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function resetGame() {
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        modalOverlay.classList.remove('show');
        successPhoto.style.display = 'none';
        startGame();
    }

    document.getElementById('replay-btn').addEventListener('click', resetGame);

    startGame();
});