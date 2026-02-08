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
    const askBtn = document.getElementById('ask-btn');
    const questionInput = document.getElementById('question-input');
    const answerDiv = document.getElementById('oracle-answer');
    const modalOverlay = document.getElementById('success-modal');
    const successPhoto = document.getElementById('success-photo');

    const answers = [
        "It is decidedly so (just like my love for you!)",
        "Without a doubt, you cutie.",
        "Yes, definitely. Now give me a kiss.",
        "You can count on it.",
        "My sources say yes... and that you're cute.",
        "The stars are aligned for a big YES!",
        "Ask again later, I'm busy thinking about you."
    ];

    askBtn.addEventListener('click', () => {
        if (questionInput.value.trim() === "") {
            alert("Please ask a question!");
            return;
        }

        const randomIndex = Math.floor(Math.random() * answers.length);
        answerDiv.textContent = answers[randomIndex];
        answerDiv.classList.add('show');

        setTimeout(() => {
            const randomPhoto = pool[Math.floor(Math.random() * pool.length)];
            successPhoto.src = `../photos/${randomPhoto}`;
            successPhoto.style.display = 'block';

            modalOverlay.classList.add('show');
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 3000);
    });
    function resetGame() {
        modalOverlay.classList.remove('show');
        questionInput.value = '';
        answerDiv.textContent = '';
        answerDiv.classList.remove('show');
        successPhoto.src = '';
        successPhoto.style.display = 'none';
    }

    document.getElementById('replay-btn').addEventListener('click', resetGame);
});