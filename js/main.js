/**
 * GASA TECH - Global UI Engine 2026
 * Standardized for all Deployment Tiers
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TERMINAL SCRAMBLE EFFECT ---
    // Targets all <h1> tags. Requires data-value attribute on the HTML element.
    const letters = "ABCDEFGHIKLMNOPQRSTUVWYZ0123456789@#$";
    const scrambleHeaders = document.querySelectorAll('h1');

    scrambleHeaders.forEach(header => {
        // Store the original text in a data attribute if not already there
        if (!header.dataset.value) {
            header.dataset.value = header.innerText;
        }

        header.addEventListener('mouseenter', (event) => {
            let iteration = 0;
            const interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return event.target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 37)];
                    })
                    .join("");

                if (iteration >= event.target.dataset.value.length) {
                    clearInterval(interval);
                }
                iteration += 1 / 3;
            }, 30);
        });
    });

    // --- 2. MAGNETIC BUTTON INTERACTION ---
    // Adds a physical 'pull' to buttons when the mouse gets close
    const magneticElements = document.querySelectorAll('.choose-btn, .btn-back, .visit-link');

    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Subtle pull effect
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- 3. SCROLL REVEAL (Intersection Observer) ---
    // Standardizes the 'fade-in' for all cards and sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to specific elements
    document.querySelectorAll('.project-card, .pricing-card, .service-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        revealObserver.observe(el);
    });

    // --- 4. NAVIGATION LOGIC ---
    const menuToggle = document.querySelector('#mobile-menu');
    const navList = document.querySelector('#nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Animate hamburger icon (spans)
            const spans = menuToggle.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = navList.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
                spans[1].style.opacity = navList.classList.contains('active') ? '0' : '1';
                spans[2].style.transform = navList.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : '';
            }
        });
    }
});
