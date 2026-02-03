document.addEventListener('DOMContentLoaded', () => {
    // 1. TERMINAL SCRAMBLE
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
    document.querySelectorAll('h1').forEach(header => {
        if (!header.dataset.value) header.dataset.value = header.innerText;
        header.addEventListener('mouseenter', (e) => {
            let iteration = 0;
            const interval = setInterval(() => {
                e.target.innerText = e.target.innerText.split("").map((letter, index) => {
                    if (index < iteration) return e.target.dataset.value[index];
                    return letters[Math.floor(Math.random() * 37)];
                }).join("");
                if (iteration >= e.target.dataset.value.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        });
    });

    // 2. MAGNETIC BUTTONS
    document.querySelectorAll('.choose-btn, .highlight-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = `translate(0, 0)`);
    });
});
