// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Stadium Canvas Animation
const canvas = document.getElementById('stadiumCanvas');
const ctx = canvas.getContext('2d');

// Stadium layout
const exits = [
    { x: 100, y: 100, name: 'Exit A', crowd: 85 },
    { x: 650, y: 100, name: 'Exit B', crowd: 25 },
    { x: 375, y: 450, name: 'Exit C', crowd: 60 }
];

let crowdParticles = [];

function drawStadium() {
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stadium boundary
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, 700, 400);
    
    // Draw exits
    exits.forEach(exit => {
        const gradient = ctx.createRadialGradient(exit.x, exit.y, 0, exit.x, exit.y, 40);
        const crowdLevel = exit.crowd / 100;
        
        gradient.addColorStop(0, `rgba(0, 212, 255, ${crowdLevel * 0.8})`);
        gradient.addColorStop(1, `rgba(0, 212, 255, ${crowdLevel * 0.2})`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(exit.x, exit.y, 40, 0, Math.PI * 2);
        ctx.fill();
        
        // Exit label
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(exit.name, exit.x, exit.y + 5);
        
        // Crowd percentage
        ctx.fillStyle = '#00d4ff';
        ctx.font = '14px Arial';
        ctx.fillText(`${exit.crowd}%`, exit.x, exit.y + 25);
    });
    
    // Draw crowd particles
    crowdParticles.forEach((particle, index) => {
        ctx.fillStyle = `rgba(0, 212, 255, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= 0.01;
        
        if (particle.alpha <= 0) {
            crowdParticles.splice(index, 1);
        }
    });
    
    requestAnimationFrame(drawStadium);
}

// Simulate crowd flow
function simulateCrowd() {
    // Add particles to crowded exit (Exit A)
    for (let i = 0; i < 10; i++) {
        crowdParticles.push({
            x: exits[0].x + (Math.random() - 0.5) * 20,
            y: exits[0].y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            alpha: 1
        });
    }
    
    // Update exit statuses randomly
    exits.forEach(exit => {
        exit.crowd = Math.max(0, Math.min(100, exit.crowd + (Math.random() - 0.5) * 20));
    });
    
    // Show alert
    const alertDiv = document.querySelector('.alert');
    if (exits[0].crowd > 80) {
        alertDiv.style.display = 'block';
    }
}

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Initialize
drawStadium();
setInterval(() => {
    if (Math.random() > 0.7) {
        simulateCrowd();
    }
}, 3000);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
