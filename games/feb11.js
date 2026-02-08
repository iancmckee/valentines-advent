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
    const quizContainer = document.getElementById('quiz-container');
    const modalOverlay = document.getElementById('success-modal');
    const successPhoto = document.getElementById('success-photo');
    const replayBtn = document.getElementById('replay-btn');

    // Instructions: Change the names here to personalize the quiz!
    const name1 = "Ethan";
    const name2 = "Katie";

    const questions = [
        {
            question: "Who is the funnier one?",
            answers: [name1, name2]
        },
        {
            question: "What's the best kind of date?",
            answers: ["Cozy night in", "Fancy night out"]
        },
        {
            question: "Pineapple on pizza?",
            answers: ["Obviously!", "Absolutely not."]
        }
    ];
    let currentQuestionIndex = 0;

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <h2>${question.question}</h2>
            <div class="quiz-answers">
                ${question.answers.map(answer => `<button class="btn-game btn-secondary quiz-answer">${answer}</button>`).join('')}
            </div>
        `;

        document.querySelectorAll('.quiz-answer').forEach(button => {
            button.addEventListener('click', () => {
                // Every answer is the right answer!
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion();
                } else {
                    endGame();
                }
            });
        });
    }

    function endGame() {
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
        currentQuestionIndex = 0;
        showQuestion();
    }

    replayBtn.addEventListener('click', resetGame);

    showQuestion();
});