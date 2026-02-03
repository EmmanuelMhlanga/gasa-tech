document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TERMINAL SCRAMBLE EFFECT ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
    const scrambleHeaders = document.querySelectorAll('h1');

    scrambleHeaders.forEach(header => {
        if (!header.dataset.value) header.dataset.value = header.innerText;

        header.addEventListener('mouseenter', (event) => {
            let iteration = 0;
            const interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return event.target.dataset.value[index];
                        return letters[Math.floor(Math.random() * 37)];
                    })
                    .join("");

                if (iteration >= event.target.dataset.value.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        });
    });

    // --- 2. MAGNETIC BUTTONS ---
    const magneticElements = document.querySelectorAll('.choose-btn, .btn-back, .highlight-btn');

    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- 3. SCROLL REVEAL ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animated-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(el);
    });

    // --- 4. MOBILE MENU ---
    const menuToggle = document.querySelector('#mobile-menu');
    const navList = document.querySelector('#nav-list');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }
});
