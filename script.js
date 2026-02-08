document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('calendar-grid');
    const envelopeContainer = document.getElementById('envelope-container');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');

    // Envelope Interaction
    let isOpen = false;

    envelopeContainer.addEventListener('mouseenter', () => {
        if (!isOpen) {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { x: 0.5, y: 0.4 },
                colors: ['#ff758c', '#ffcad4', '#f7d1d5', '#eebec3']
            });
        }
    });


    envelopeContainer.addEventListener('click', () => {
        if (isOpen) return; // Prevent re-triggering
        isOpen = true;

        // Stop shake animation immediately
        envelope.style.animation = 'none';
        void envelope.offsetWidth; // Force reflow

        // 1. Flip
        envelope.classList.add('flip');

        // 2. Open Flap (after flip finishes)
        setTimeout(() => {
            envelope.classList.add('open-flap');
            const frontFace = envelope.querySelector('.front-face');
            if (frontFace) frontFace.style.visibility = 'hidden';
        }, 800);

        // 3. Separation Phase
        setTimeout(() => {
            letter.classList.add('slide-up');
            envelopeWrapper.classList.add('slide-down');

        }, 1400); // 800 + 600

        // 4. Expand Letter (2920ms = 2900ms slide + 20ms pause)
        setTimeout(() => {
            letter.classList.remove('slide-up');

            requestAnimationFrame(() => {
                // Capture current position
                const rect = letter.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Disable transition during reparenting
                letter.style.transition = 'none';
                document.body.appendChild(letter);

                // Freeze at captured position
                letter.style.position = 'fixed';
                letter.style.zIndex = '2000';
                letter.style.top = `${centerY}px`;
                letter.style.left = `${centerX}px`;
                letter.style.margin = '0';
                letter.style.transform = 'translate(-50%, -50%) scale(0.5)';
                letter.style.transformStyle = 'flat';

                void letter.offsetWidth; // Force reflow

                // Restore transition and expand
                letter.style.transition = 'all 1.5s ease-in-out';
                requestAnimationFrame(() => {
                    letter.classList.add('expand');
                });
            });
        }, 2920);
    });

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();

    const startDay = 7;
    const endDay = 14;
    const valentineMonth = 1; // February

    for (let day = startDay; day <= endDay; day++) {
        const door = document.createElement('div');
        door.classList.add('door');
        door.dataset.day = day;
        door.textContent = day;


        if ((currentMonth === valentineMonth && currentDay >= day) || currentMonth > valentineMonth) {
            door.classList.add('unlocked');
            door.addEventListener('click', (e) => {
                e.stopPropagation();
                openDoor(day);
            });
            door.title = "Open!";
        } else {
            door.classList.add('locked');
            door.title = `Wait until Feb ${day}!`;
            door.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        grid.appendChild(door);
    }
});

function openDoor(day) {
    window.location.href = `games/feb${day}.html`;
}
