/**
 * GASA TECH (PTY) LTD - SYSTEM LOGIC v1.2
 * [REVISION: APRIL 2026]
 * [LOCATION: JOHANNESBURG, GP]
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PWA INITIALIZATION (Service Worker)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('GASA TECH: System Online'))
                .catch(err => console.error('GASA TECH: Deployment Offline', err));
        });
    }

    // 2. NAVIGATION: ACTIVE STATE MAPPING
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = "var(--primary)";
            link.style.borderBottom = "2px solid var(--primary)";
            link.style.paddingBottom = "5px";
        }
    });

    // 3. HEADER: DYNAMIC BLUR & COMPRESSION
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = "rgba(11, 17, 33, 0.98)";
            header.style.padding = "1rem 8%";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        } else {
            header.style.background = "rgba(11, 17, 33, 0.85)";
            header.style.padding = "1.5rem 8%";
            header.style.boxShadow = "none";
        }
    });

    // 4. REVEAL ENGINE: INTERSECTION OBSERVER
    // Makes cards slide in smoothly as you scroll down
    const revealElements = document.querySelectorAll('.service-card, .protocol-block, .terms-block');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
        revealOnScroll.observe(el);
    });

    // 5. DEPLOYMENT FORM INTERFACE (Contact Page)
    const deployForm = document.querySelector('form');
    if (deployForm) {
        deployForm.addEventListener('submit', (e) => {
            // Logic for visual feedback
            const btn = deployForm.querySelector('.cta-btn') || deployForm.querySelector('button');
            if (btn) {
                btn.innerHTML = `<i class="fas fa-sync fa-spin"></i> INITIALIZING...`;
                btn.style.pointerEvents = "none";
                btn.style.opacity = "0.6";
            }
        });
    }

    console.log("GASA TECH Architecture: Fully Loaded.");
});
