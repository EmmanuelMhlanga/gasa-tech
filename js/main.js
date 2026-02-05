// Hacker Effect for Titles
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
document.querySelectorAll("h1").forEach(header => {
    header.onmouseover = event => {
        let iteration = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) return event.target.dataset.value[index];
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            if (iteration >= event.target.dataset.value.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    };
});

// Particle Background logic
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for(let i=0; i<60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5
            });
        }
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 123, 255, 0.4)';
        particles.forEach(p => {
            p.y -= p.speed;
            if (p.y < 0) p.y = canvas.height;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    window.addEventListener('resize', init);
    init(); animate();
}
