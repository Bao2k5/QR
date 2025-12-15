document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('open-btn');
    const giftScene = document.getElementById('gift-scene');
    const prankScene = document.getElementById('prank-scene');
    const wishScene = document.getElementById('wish-scene');
    const runawayBtn = document.getElementById('runaway-btn');
    let dodgeCount = 0;

    // --- PRANK LOGIC ---
    // --- PRANK LOGIC ---
    // Revert: Click specifically on the box (as requested)
    giftBox.addEventListener('click', () => {
        // Play Music immediately
        const audio = document.getElementById('bg-music');
        audio.volume = 0.6;
        audio.play().catch(e => console.log("Audio play failed trying to autoplay later", e));

        // 1. Shake Effect before opening (Animate the box)
        giftBox.style.animation = 'shake 0.5s';
        setTimeout(() => {
            giftScene.classList.add('hidden');
            prankScene.classList.remove('hidden');
            prankScene.style.display = 'block';
            triggerConfetti();
        }, 500);
    });

    const taunts = [
        "Lêu lêu 😝", "Hụt rồi!", "Bắt em đi!", "Chậm quá à!",
        "Cố lên chị iu!", "Non nớt quá! 🤣", "Kém dọ! 😎",
        "Còn lâu mới bắt được!", "Tay đâu mà chậm thế?", "Ahihi đồ ngốc! 🤪"
    ];

    // Runaway Button Logic
    // FIX 1: Use mouseover for desktop
    runawayBtn.addEventListener('mouseover', moveButton);

    // FIX 2: Handle touchstart carefully
    runawayBtn.addEventListener('touchstart', (e) => {
        // Only prevent click if we are still playing (count < 15)
        if (dodgeCount < 15) {
            e.preventDefault(); // Stop click, just move
            moveButton();
        }
        // If >= 15, do NOTHING -> Let the click happen naturally
    });

    // FIX 3: Click handler - ABSOLUTE FINAL FIX
    runawayBtn.addEventListener('click', (e) => {
        if (dodgeCount < 15) {
            // Still playing
            moveButton();
        } else {
            // WIN STATE
            runawayBtn.innerText = "Giỏi ghê tarr! ❤️";

            // EMERGENCY: Remove all 'touchstart' blockers by cloning the button
            // This strips all event listeners, ensuring the next click is CLEAN
            const newBtn = runawayBtn.cloneNode(true);
            runawayBtn.parentNode.replaceChild(newBtn, runawayBtn);

            // New button just triggers the loading scene
            newBtn.style.position = 'static'; // Reset position logic if needed or keep fixed
            newBtn.style.transform = 'scale(1.2)';
            newBtn.innerText = "Giỏi ghê tarr! ❤️";

            // Auto transition or wait for click?
            // Let's auto-transition to avoid "double click" confusion
            setTimeout(() => {
                // Manually trigger the next sequence
                // We need to access startFakeLoading which is inside this scope
                // So we can't just clone purely if we lose scope access
                // Actually, cloning is risky with scope.

                // Better approach: Just set a flag or rely on the timeout
                // Visual feedback is enough
            }, 100);

            setTimeout(() => {
                startFakeLoading();
            }, 500);
        }
    });

    function moveButton() {
        if (dodgeCount >= 15) return; // Stop if reached limit

        // Change text randomly
        runawayBtn.innerText = taunts[dodgeCount % taunts.length];

        dodgeCount++;
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 50);

        // Ensure button stays on screen
        const safeX = Math.max(10, Math.min(x, window.innerWidth - 160));
        const safeY = Math.max(10, Math.min(y, window.innerHeight - 60));

        runawayBtn.style.position = 'fixed';
        runawayBtn.style.left = `${safeX}px`;
        runawayBtn.style.top = `${safeY}px`;
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
                }, 2000);
            }
        }, 2500);
    }

    // --- STORY LOGIC ---
    window.nextWish = function (stepId) {
        document.querySelectorAll('.wish-step').forEach(el => {
            el.classList.add('hidden');
            el.style.display = 'none';
        });

        const nextStep = document.getElementById(`wish-step-${stepId}`);
        if (nextStep) {
            nextStep.classList.remove('hidden');
            nextStep.style.display = 'block';

            if (stepId === 4) {
                triggerConfetti();
                setInterval(triggerConfetti, 2000);
            }
        }
    };

    // Step 2 Logic (Auto Advance)
    window.transformSadToHappy = function () {
        const title = document.getElementById('title-2');
        const msg = document.getElementById('msg-2');
        const card = document.getElementById('card-2');

        title.innerText = "Yeee! Vui lên nha! 🥰";
        title.style.color = "#d63031";
        msg.innerHTML = "Nụ cười là liều thuốc bổ mà!<br>Cười lên cái xem nào! 📸";

        card.classList.remove('sad-theme');
        card.classList.add('happy-theme');

        confetti({ origin: { y: 0.7 }, particleCount: 50 });

        const btn = card.querySelector('button');
        if (btn) {
            btn.innerText = "Xong rồi! 🥰";
            btn.disabled = true;
            btn.style.backgroundColor = "#2ed573";
        }

        card.style.animation = "none";
        setTimeout(() => { card.style.animation = "bounce 0.5s"; }, 10);

        // AUTO ADVANCE
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
            document.getElementById('wish-step-1').style.display = 'block';
        }, 500);
    }

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
        try {
            if (typeof confetti === 'function') confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });

            const modal = document.getElementById('custom-modal');
            if (!modal) { alert("Lỗi: Không tìm thấy modal!"); return; }

            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
            modal.style.zIndex = '9999';

            const btn = document.getElementById('final-btn');
            if (btn) {
                btn.innerText = "Đã chốt đơn à nha! 🔒";
                btn.disabled = true;
                btn.style.backgroundColor = "#636e72";
            }
            const troll = document.getElementById('final-troll');
            if (troll) {
                troll.innerText = "Giao dịch thành công. Cảm ơn quý khách! 💸";
                troll.classList.remove('hidden');
                troll.style.display = 'block';
            }

        } catch (e) {
            alert("Lỗi hiển thị: " + e.message);
        }
    };

    window.closeModal = function () {
        const modal = document.getElementById('custom-modal');
        modal.classList.add('hidden');
        modal.style.display = 'none';
        triggerConfetti();
    };

    // Ensure event binding for final button if inline onclick fails
    const finalBtn = document.getElementById('final-btn');
    if (finalBtn) {
        finalBtn.onclick = window.finishStory;
    }
});
