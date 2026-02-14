document.addEventListener('DOMContentLoaded', () => {
    const bouquet = document.getElementById('bouquet');
    const singleFlower = document.getElementById('single-flower');
    const instruction = document.getElementById('instruction');
    const flowerHead = singleFlower.querySelector('.flower-head');
    const loveStatus = document.getElementById('love-status');
    const successModal = document.getElementById('success-modal');
    const successPhoto = document.getElementById('success-photo');
    const replayBtn = document.getElementById('replay-btn');

    // Pool of photos for the win screen
    const pool = [
        'DSC_0678-Edit.webp', 'DSC_9155.webp', 'IMG_0620.webp', 'IMG_0636.webp',
        'IMG_0651.webp', 'IMG_0744.webp', 'IMG_0838.webp', 'IMG_2276.webp',
        'IMG_2869.webp', 'IMG_3157.webp', 'IMG_3656.webp', 'IMG_3769.webp',
        'IMG_4132.webp', 'IMG_4627.webp', 'IMG_5083.webp', 'IMG_5206.webp',
        'IMG_5332.webp', 'IMG_6852.webp', 'IMG_7010.webp', 'IMG_7210.webp',
        'IMG_7296.webp', 'IMG_8558.webp', 'IMG_8573.webp', 'IMG_8579.webp',
        'IMG_8758.webp'
    ];

    let petalCount = 0;
    let currentStatus = 0; // 0 = He loves me, 1 = He loves me not

    function initGame() {
        bouquet.classList.remove('hidden');
        singleFlower.classList.add('hidden');
        singleFlower.classList.remove('show');
        instruction.textContent = "Grab a flower from the bouquet!";
        instruction.style.opacity = '1';
        loveStatus.textContent = '';
        loveStatus.style.opacity = '0';
        petalCount = 0;
        currentStatus = 0;
        
        // Reset flower head
        flowerHead.innerHTML = '<div class="center"></div>';
        
        bouquet.addEventListener('click', startFlowerSequence, { once: true });
    }

    function startFlowerSequence() {
        instruction.style.opacity = '0';
        setTimeout(() => {
            instruction.textContent = "Pick a petal...";
            instruction.style.opacity = '1';
        }, 500);

        bouquet.classList.add('fade-out'); // Add fade out class if needed in CSS
        
        // Generate petals - ensure odd number between 7 and 13
        const numPetals = 7 + (Math.floor(Math.random() * 4) * 2); // 7, 9, 11, 13
        petalCount = numPetals;

        // Create petals
        for (let i = 0; i < numPetals; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            // Distribute petals in a circle
            const angle = (360 / numPetals) * i;
            petal.style.setProperty('--angle', `${angle}deg`);
            petal.addEventListener('click', (e) => removePetal(e, i));
            flowerHead.appendChild(petal);
        }

        // Animate flower entering
        setTimeout(() => {
            bouquet.classList.add('hidden');
            singleFlower.classList.remove('hidden');
            // Trigger reflow
            void singleFlower.offsetWidth;
            singleFlower.classList.add('show');
        }, 500);
    }

    function removePetal(e, index) {
        const petal = e.target;
        if (petal.classList.contains('falling')) return;

        petal.classList.add('falling');
        
        // Update status text
        loveStatus.style.opacity = '1';
        if (currentStatus === 0) {
            loveStatus.textContent = "He loves me...";
            loveStatus.className = "love-status love";
        } else {
            loveStatus.textContent = "He loves me not...";
            loveStatus.className = "love-status not-love";
        }

        // Toggle status for next click
        currentStatus = 1 - currentStatus;
        petalCount--;

        if (petalCount === 0) {
            setTimeout(endGame, 1000);
        }
    }

    function endGame() {
        loveStatus.textContent = "IAN LOVES YOU! ❤️";
        loveStatus.className = "love-status final-love";
        
        const randomPhoto = pool[Math.floor(Math.random() * pool.length)];
        successPhoto.src = `../photos/${randomPhoto}`;
        successPhoto.style.display = 'block';
        
        setTimeout(() => {
            successModal.classList.add('show');
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff4d6d', '#ff8fa3', '#fff0f3']
            });
        }, 1000);
    }

    replayBtn.addEventListener('click', () => {
        successModal.classList.remove('show');
        bouquet.classList.remove('fade-out');
        initGame();
    });

    initGame();
});
