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

    const taunts = [
        "Lêu lêu 😝",
        "Hụt rồi!",
        "Bắt em đi!",
        "Chậm quá à!",
        "Cố lên chị iu!",
        "Non nớt quá! 🤣",
        "Kém dọ! 😎",
        "Còn lâu mới bắt được!",
        "Tay đâu mà chậm thế?",
        "Ahihi đồ ngốc! 🤪"
    ];

    // Runaway Button
    runawayBtn.addEventListener('mousemove', moveButton);
    runawayBtn.addEventListener('touchstart', (e) => {
        // Prevent default tap zoom/behavior
        e.preventDefault();
        moveButton();
    });

    runawayBtn.addEventListener('click', () => {
        if (dodgeCount < 15) { // Increased to 15 for "nhây" mode
            moveButton();
        } else {
            // STOPPED moving
            runawayBtn.innerText = "Giỏi ghê tarr! ❤️";
            setTimeout(() => {
                startFakeLoading();
            }, 500);
        }
    });

    function moveButton() {
        // Reduced gap to 14 to ensure it definitely finishes but takes longer
        if (dodgeCount >= 15) return;

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
            "Đang tải tình cảm của em Bảo..."
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
                }, 2000); // Wait 2s for suspense
            }
        }, 2500); // Slow update (2.5s) for mystery
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

        // Change content visually
        title.innerText = "Yeee! Vui lên nha! 🥰";
        title.style.color = "#d63031";
        msg.innerHTML = "Nụ cười là liều thuốc bổ mà!<br>Cười lên cái xem nào! 📸";

        // Switch Theme Class
        card.classList.remove('sad-theme');
        card.classList.add('happy-theme');

        // Trigger confetti small
        confetti({ origin: { y: 0.7 }, particleCount: 50 });

        // FIX: Auto-advance logic
        const btn = card.querySelector('button');
        if (btn) {
            btn.innerText = "Xong rồi! 🥰";
            btn.disabled = true;
            btn.style.backgroundColor = "#2ed573";
        }

        // Reset animation
        card.style.animation = "none";
        setTimeout(() => { card.style.animation = "bounce 0.5s"; }, 10);

        // AUTO ADVANCE TO STEP 3 AFTER 2 SECONDS
        setTimeout(() => {
            window.nextWish(3);
        }, 2000);
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
        console.log("Finish Story Triggered");
        try {
            // Check confetti
            if (typeof confetti === 'function') {
                confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
            } else {
                console.warn("Confetti not loaded");
            }

            // Show the Custom Modal
            const modal = document.getElementById('custom-modal');
            if (!modal) {
                alert("Lỗi: Không tìm thấy modal!");
                return;
            }

            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
            modal.style.zIndex = '9999';

            // Change button text
            const btn = document.getElementById('final-btn');
            if (btn) {
                btn.innerText = "Đã chốt đơn à nha! 🔒";
                btn.disabled = true;
                btn.style.backgroundColor = "#636e72";
            }

            // Show validation text
            const troll = document.getElementById('final-troll');
            if (troll) {
                troll.innerText = "Giao dịch thành công. Cảm ơn quý khách! 💸";
                troll.classList.remove('hidden');
                troll.style.display = 'block';
            }

        } catch (e) {
            alert("Lỗi hiển thị: " + e.message);
            console.error(e);
        }
    };

    // Explicit binding to ensure it works
    const finalBtn = document.getElementById('final-btn');
    if (finalBtn) {
        finalBtn.addEventListener('click', window.finishStory);
    }

    window.closeModal = function () {
        const modal = document.getElementById('custom-modal');
        modal.classList.add('hidden');
        modal.style.display = 'none';

        // Final rain of confetti
        triggerConfetti();
    };
});
