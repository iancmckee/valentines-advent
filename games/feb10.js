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
    const photos = document.querySelectorAll('.photo-choice');
    const modalOverlay = document.getElementById('success-modal');
    const successPhoto = document.getElementById('success-photo');
    const replayBtn = document.getElementById('replay-btn');
    const failureModal = document.getElementById('failure-modal');
    const tryAgainBtn = document.getElementById('try-again-btn');

    // Define winGame and resetGame functions
    function winGame() {
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
        modalOverlay.classList.remove('show');
        successPhoto.style.display = 'none';
    }

    photos.forEach(choice => {
        choice.addEventListener('click', (e) => {
            if (e.target.id === 'correct-choice') {
                // Call winGame when the correct choice is made
                winGame();
            } else {
                failureModal.classList.add('show');
            }
        });
    });

    tryAgainBtn.addEventListener('click', () => {
        failureModal.classList.remove('show');
    });

    document.getElementById('replay-btn').addEventListener('click', () => {
        modalOverlay.classList.remove('show');
    });
});
