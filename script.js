// Smooth scroll behavior for anchor links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add parallax effect to background
let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
    const scrollY = window.scrollY;
    const overlay = document.querySelector('.background-overlay');
    
    if (overlay) {
        const parallaxSpeed = 0.5;
        overlay.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
        });
        ticking = true;
    }
});

// Add cursor trail effect (subtle)
const createTrail = (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
};

// Throttle cursor trail for performance
let trailTimeout;
document.addEventListener('mousemove', (e) => {
    if (!trailTimeout) {
        trailTimeout = setTimeout(() => {
            if (window.innerWidth > 768) { // Only on desktop
                createTrail(e);
            }
            trailTimeout = null;
        }, 100);
    }
});

// Add pulse animation to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.6s ease';
    });
    
    item.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Dynamic gradient animation for header
const header = document.querySelector('.header');
let hue = 220;

setInterval(() => {
    hue = (hue + 1) % 360;
    document.documentElement.style.setProperty('--primary-hue', hue);
}, 100);

// Add typing effect to tagline (optional, subtle)
const tagline = document.querySelector('.tagline');
if (tagline) {
    const originalText = tagline.textContent;
    tagline.textContent = '';
    let charIndex = 0;
    
    const typeText = () => {
        if (charIndex < originalText.length) {
            tagline.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        }
    };
    
    setTimeout(typeText, 500);
}

// Add floating animation to cards
document.querySelectorAll('.card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add glow effect on scroll for section titles
const titles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.textShadow = '0 0 20px var(--glow-color)';
            setTimeout(() => {
                entry.target.style.textShadow = '';
            }, 1000);
        }
    });
}, { threshold: 0.5 });

titles.forEach(title => {
    title.style.transition = 'text-shadow 0.6s ease';
    titleObserver.observe(title);
});

// Console Easter Egg
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #b370ff;');
console.log('%cLooking for something? Feel free to reach out!', 'font-size: 14px; color: #70b8ff;');
console.log('%c📧 faisalbinsyed@gmail.com', 'font-size: 12px; color: #aaa;');

// Add fade-in animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Any additional scroll-based animations can go here
}, 100);

window.addEventListener('scroll', optimizedScroll);
