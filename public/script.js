document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('open-btn');
    const giftScene = document.getElementById('gift-scene');
    const prankScene = document.getElementById('prank-scene');
    const wishScene = document.getElementById('wish-scene');
    const runawayBtn = document.getElementById('runaway-btn');
    let dodgeCount = 0;

    // --- PRANK LOGIC ---
    giftBox.addEventListener('click', () => {
        // Play Music immediately on user interaction
        const audio = document.getElementById('bg-music');
        audio.volume = 0.6; // Not too loud
        audio.play().catch(e => console.log("Audio play failed trying to autoplay later", e));

        // 1. Shake Effect before opening
        giftBox.style.animation = 'shake 0.5s';
        setTimeout(() => {
            giftScene.classList.add('hidden');
            prankScene.classList.remove('hidden');
            prankScene.style.display = 'block';
            triggerConfetti();
        }, 500);
    });

    const taunts = ["Lêu lêu 😝", "Hụt rồi!", "Bắt em đi!", "Chậm quá à!", "Cố lên chị iu!"];

    // Runaway Button
    runawayBtn.addEventListener('mousemove', moveButton);
    runawayBtn.addEventListener('touchstart', (e) => {
        if (dodgeCount < 1) { e.preventDefault(); moveButton(); }
    });
    runawayBtn.addEventListener('click', () => {
        if (dodgeCount < 1) { // Reduced to 1 for testing
            moveButton();
        } else {
            // STOPPED moving
            runawayBtn.innerText = "Giỏi lắm! ❤️";
            setTimeout(() => {
                startFakeLoading();
            }, 500);
        }
    });

    function moveButton() {
        if (dodgeCount >= 5) return;

        // Change text randomly
        runawayBtn.innerText = taunts[dodgeCount % taunts.length];

        dodgeCount++;
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 50);
        runawayBtn.style.position = 'fixed';
        runawayBtn.style.left = `${x}px`;
        runawayBtn.style.top = `${y}px`;
    }

    function startFakeLoading() {
        prankScene.classList.add('hidden');
        prankScene.style.display = 'none';
        runawayBtn.style.display = 'none';

        const loadingScene = document.getElementById('loading-scene');
        const loadingText = document.getElementById('loading-text');
        loadingScene.classList.remove('hidden');
        loadingScene.style.display = 'block';

        const messages = [
            "Đang phân tích sự dễ thương...",
            "Phát hiện mức độ cute quá tải! ⚠️",
            "Đang tải tình cảm của em Bảo...",
            "Xong rồi nè! ❤️"
        ];

        let i = 0;
        const interval = setInterval(() => {
            loadingText.innerText = messages[i];
            i++;
            if (i >= messages.length) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingScene.classList.add('hidden');
                    loadingScene.style.display = 'none';
                    transitionToStory();
                }, 1000);
            }
        }, 1500);
    }

    // --- STORY LOGIC ---
    // Make functions global so HTML onclick can find them
    window.nextWish = function (stepId) {
        // Hide all steps
        document.querySelectorAll('.wish-step').forEach(el => {
            el.classList.add('hidden');
            el.style.display = 'none';
        });

        // Show target step
        const nextStep = document.getElementById(`wish-step-${stepId}`);
        if (nextStep) {
            nextStep.classList.remove('hidden');
            nextStep.style.display = 'block';

            // Special effect for final step
            if (stepId === 4) {
                triggerConfetti();
                setInterval(triggerConfetti, 2000); // Loop confetti for finale
            }
        }
    };

    window.transformSadToHappy = function () {
        // Step 2 specific interaction
        const title = document.getElementById('title-2');
        const msg = document.getElementById('msg-2');
        const card = document.getElementById('card-2');

        // Change content
        title.innerText = "Yeee! Vui lên nha! 🥰";
        msg.innerText = "Nụ cười là liều thuốc bổ mà!";
        card.style.backgroundColor = "#fff0f0"; // warmer color

        // Trigger confetti small
        confetti({ origin: { y: 0.7 }, particleCount: 50 });

        // Wait a bit then move to step 3 automatically or show a button?
        // Let's show a "Next" button replacing the old one
        const btn = card.querySelector('button');
        btn.innerText = "Tiếp hông?";
        btn.onclick = () => nextWish(3);

        // Add a jumping animation
        card.style.animation = "bounce 0.5s";
    };

    function transitionToStory() {
        prankScene.style.opacity = '0';
        runawayBtn.style.display = 'none';
        setTimeout(() => {
            prankScene.classList.add('hidden');
            prankScene.style.display = 'none';
            wishScene.classList.remove('hidden');
            wishScene.style.display = 'block';

            // Show Step 1 explicitly
            document.getElementById('wish-step-1').style.display = 'block';
        }, 500);
    }

    // --- UTILS ---
    function triggerConfetti() {
        var duration = 2000;
        var end = Date.now() + duration;
        (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }

    window.finishStory = function () {
        // Stop confetti
        // Show the funny alert
        alert("✅ XÁC NHẬN THÀNH CÔNG!\n\nHệ thống đã ghi nhận: Thùy Anh đồng ý bao Bảo một chầu bánh ngọt thật ngon để trả công làm chiếc web xịn xò này! \n\nKhông được đổi ý nha! Chụp màn hình làm bằng chứng rồi đó! 📸😎");

        // Change button text
        const btn = document.getElementById('final-btn');
        btn.innerText = "Đã chốt đơn à nha! 🔒";
        btn.disabled = true;
        btn.style.backgroundColor = "#636e72";

        // Show validation text
        const troll = document.getElementById('final-troll');
        troll.innerText = "Giao dịch thành công. Cảm ơn quý khách! 💸";
        troll.classList.remove('hidden');
        troll.style.display = 'block';

        // More confetti
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    };
});
