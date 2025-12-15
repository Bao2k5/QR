document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('open-btn');
    const giftScene = document.getElementById('gift-scene');
    const prankScene = document.getElementById('prank-scene');
    const wishScene = document.getElementById('wish-scene');

    // Audio effects (Optional - browser policy might block auto play mostly, but click works)
    // const popSound = new Audio('assets/pop.mp3');

    giftBox.addEventListener('click', () => {
        // 1. Shake Effect before opening
        giftBox.style.animation = 'shake 0.5s';

        setTimeout(() => {
            // 2. Hide Gift Scene, Show Prank Scene
            giftScene.classList.add('hidden');
            prankScene.classList.remove('hidden');
            prankScene.style.display = 'block';

            // 3. Trigger Confetti
            triggerConfetti();

            // 4. Wait 4 seconds then show the real wish
            setTimeout(() => {
                transitionToWish();
            }, 4000);
        }, 500); // Wait for shake to finish half-way
    });

    function triggerConfetti() {
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    function transitionToWish() {
        // Fade out prank
        prankScene.style.opacity = '0';

        setTimeout(() => {
            prankScene.classList.add('hidden');
            prankScene.style.display = 'none';

            // Show Wish
            wishScene.classList.remove('hidden');
            wishScene.style.display = 'block';

            // More gentle confetti for the wish
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff6b6b', '#feca57', '#fa8231']
            });
        }, 500);
    }
});
