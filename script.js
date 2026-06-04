document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Packet Handlers
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('// COMM LINK SUCCESSFUL: Data packet transmitted safely to Sami.');
            contactForm.reset();
        });
    }

    // 2. Interactive Cyber-Purple Particle Engine
    const canvas = document.getElementById('gamer-matrix');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    const mouse = { x: null, y: null, radius: 120 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 20) + 8;
            // Mixed Cyan and Cyber Purple particle variants
            this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(139, 92, 246, 0.3)';
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.hypot(dx, dy);
                
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = (dx / distance) * force * this.density * 0.6;
                    let directionY = (dy / distance) * force * this.density * 0.6;
                    this.x += directionX;
                    this.y += directionY;
                    return;
                }
            }
            
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 15;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 15;
            }
        }
    }

    function init() {
        particles = [];
        const numberOfParticles = Math.min((canvas.width * canvas.height) / 9000, 280);
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }
    init();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
});
