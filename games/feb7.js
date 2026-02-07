document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const btnContainer = document.getElementById('btn-container');
    const modalOverlay = document.getElementById('success-modal');

    yesBtn.addEventListener('click', () => {
        setTimeout(() => {
            modalOverlay.classList.add('show');
            const duration = 3000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff758c', '#ffcad4', '#f7d1d5']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff758c', '#ffcad4', '#f7d1d5']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }, 200);
    });

    let isRunningAway = false;
    let resetTimer = null;

    const triggerInteraction = (event) => {
        if (isRunningAway) {
            runAway();
            return;
        }

        const behavior = Math.floor(Math.random() * 3);
        if (behavior === 0) {
            runAway();
        } else if (behavior === 1) {
            shrinkBtn();
        }
    };

    noBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (isRunningAway) {
            runAway();
            return;
        }
        if (noBtn.nextSibling === yesBtn) {
            btnContainer.insertBefore(yesBtn, noBtn);
        } else {
            btnContainer.insertBefore(noBtn, yesBtn);
        }
        yesBtn.click();
    });

    noBtn.addEventListener('mouseover', (e) => {
        triggerInteraction(e);
    });

    function runAway() {
        if (noBtn.style.position !== 'fixed') {
            const rect = noBtn.getBoundingClientRect();
            noBtn.style.position = 'fixed';
            noBtn.style.left = rect.left + 'px';
            noBtn.style.top = rect.top + 'px';
            noBtn.style.margin = '0';
            void noBtn.offsetWidth;
        }
        isRunningAway = true;
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const maxLeft = vw - 150;
        const maxTop = vh - 100;
        const newLeft = Math.random() * maxLeft;
        const newTop = Math.random() * maxTop;
        noBtn.style.left = newLeft + 'px';
        noBtn.style.top = newTop + 'px';
        noBtn.style.zIndex = '1000';
        resetResetTimer();
    }

    function shrinkBtn() {
        noBtn.classList.add('shrink');
        resetResetTimer();
    }

    function resetResetTimer() {
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            resetStyles();
        }, 1500);
    }

    function resetStyles() {
        isRunningAway = false;
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.zIndex = '';
        noBtn.style.margin = '';
        noBtn.classList.remove('shrink');
    }
});
