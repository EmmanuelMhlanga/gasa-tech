// GASA TECH 2026 - SYSTEM LOGIC
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Auto-Highlight Active Nav Link
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 2. Scroll Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = "rgba(11, 17, 33, 0.98)";
            header.style.padding = "1rem 8%";
        } else {
            header.style.background = "rgba(11, 17, 33, 0.85)";
            header.style.padding = "1.5rem 8%";
        }
    });

    // 3. Form Submission Feedback (Contact Page)
    const deployForm = document.querySelector('form');
    if (deployForm) {
        deployForm.addEventListener('submit', (e) => {
            const btn = deployForm.querySelector('button');
            btn.innerHTML = "INITIALIZING...";
            btn.style.opacity = "0.7";
        });
    }
});
