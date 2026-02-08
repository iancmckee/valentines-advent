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
    const couponBook = document.querySelector('.coupon-book');
    const successPhoto = document.getElementById('success-photo');
    const replayBtn = document.getElementById('replay-btn');
    const coupons = [
        { title: "One Big Hug", text: "Redeemable for one (1) giant, world-class hug." },
        { title: "Movie Night Choice", text: "You get to pick the movie, no complaints allowed!" },
        { title: "An Argument Won", text: "Cash this in to win one (1) argument. Use wisely." },
        { title: "Control of the Remote", text: "You are the master of the remote for a whole evening." },
        { title: "Get Out of a Chore Free", text: "This coupon absolves you of one (1) chore of your choice." }
    ];

    function renderCoupons() {
        const randomPhoto = pool[Math.floor(Math.random() * pool.length)];
        successPhoto.src = `../photos/${randomPhoto}`;
        successPhoto.style.display = 'block';

        couponBook.innerHTML = '';
        couponBook.appendChild(successPhoto);

        coupons.forEach((couponData, index) => {
            const coupon = document.createElement('div');
            coupon.classList.add('coupon');
            coupon.innerHTML = `
                <div class="coupon-content">
                    <h3>${couponData.title}</h3>
                    <p>${couponData.text}</p>
                </div>
            `;

            coupon.addEventListener('click', () => {
                if (coupon.classList.contains('redeemed')) return;
                coupon.classList.add('redeemed');
                coupon.querySelector('.coupon-content').innerHTML = `<h2>REDEEMED!</h2>`;
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#ff758c', '#ffcad4', '#f7d1d5']
                });
            });
            couponBook.appendChild(coupon);
        });
    }

    replayBtn.addEventListener('click', () => {
        renderCoupons();
    });

    renderCoupons();
});