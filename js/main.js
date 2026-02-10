/* GASA TECH INTERACTION ENGINE */

// 1. Neural Network Animation
const canvas = document.getElementById('neural-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00a2ff';
        ctx.strokeStyle = 'rgba(0, 162, 255, 0.1)';
        particles.forEach((p, index) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fill();
            for (let j = index + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 150) {
                    ctx.lineWidth = 1 - dist/150;
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    }
    window.addEventListener('resize', init);
    init(); draw();
}

// 2. Typewriter Effect
const typeTarget = document.getElementById("typewriter");
if (typeTarget) {
    const text = "ENGINEERING DIGITAL INFRASTRUCTURE_";
    let i = 0;
    function type() {
        if (i < text.length) {
            typeTarget.innerHTML += text.charAt(i);
            i++; setTimeout(type, 100);
        }
    }
    window.addEventListener('load', type);
}
