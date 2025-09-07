// Cursor follower effect
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;
    
    followerX += distX * 0.1;
    followerY += distY * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}
animateFollower();

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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.2)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Feature card animation
function animateCard(card) {
    card.style.transform = 'scale(0.95) translateY(-5px)';
    setTimeout(() => {
        card.style.transform = 'translateY(-10px)';
    }, 150);
}

// Random floating elements
function createFloatingElement() {
    const element = document.createElement('div');
    element.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        animation: floatUp 8s linear forwards;
        z-index: 1;
    `;
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 8000);
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-${window.innerHeight + 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create floating elements periodically
setInterval(createFloatingElement, 3000);

// Add entrance animations to feature cards on scroll
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

document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});
// Add this JavaScript to the end of your existing script.js file

// Enhanced feature card animation function (replaces the existing one)
function animateCard(card) {
    // Prevent event bubbling to avoid conflicts with link navigation
    if (event) {
        event.stopPropagation();
    }
    
    // Create ripple effect
    const ripple = document.createElement('div');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Calculate ripple position based on click/touch location
    let x = size / 2;
    let y = size / 2;
    
    if (event) {
        x = (event.clientX || event.touches[0].clientX) - rect.left - size / 2;
        y = (event.clientY || event.touches[0].clientY) - rect.top - size / 2;
    }
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    card.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
    
    // Original card bounce animation
    card.style.transform = 'scale(0.95) translateY(-5px)';
    setTimeout(() => {
        card.style.transform = 'translateY(-15px)';
    }, 150);
}

// Add ripple animation keyframes (if not already exists)
if (!document.getElementById('ripple-animation')) {
    const rippleStyle = document.createElement('style');
    rippleStyle.id = 'ripple-animation';
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Add keyboard navigation support for feature cards
document.addEventListener('DOMContentLoaded', function() {
    const cardLinks = document.querySelectorAll('.feature-card-link');
    
    cardLinks.forEach(link => {
        // Keyboard navigation
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const card = this.querySelector('.feature-card');
                
                // Create a fake event for the animation
                const fakeEvent = {
                    clientX: card.getBoundingClientRect().left + card.offsetWidth / 2,
                    clientY: card.getBoundingClientRect().top + card.offsetHeight / 2,
                    stopPropagation: () => {}
                };
                
                // Store the original event
                const originalEvent = window.event;
                window.event = fakeEvent;
                
                // Trigger the animation
                animateCard(card);
                
                // Restore original event
                window.event = originalEvent;
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
        
        // Add focus and blur effects
        link.addEventListener('focus', function() {
            this.querySelector('.feature-card').style.transform = 'translateY(-5px)';
            this.querySelector('.card-arrow').style.opacity = '1';
            this.querySelector('.card-arrow').style.transform = 'translateX(0)';
        });
        
        link.addEventListener('blur', function() {
            this.querySelector('.feature-card').style.transform = 'translateY(0)';
            this.querySelector('.card-arrow').style.opacity = '0';
            this.querySelector('.card-arrow').style.transform = 'translateX(-10px)';
        });
    });
});

// Enhanced card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            // Scale up the icon slightly
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
            
            // Animate the arrow
            const arrow = this.querySelector('.card-arrow');
            if (arrow) {
                arrow.style.animation = 'bounce 1s infinite';
            }
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            // Reset icon scale
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
            
            // Stop arrow animation
            const arrow = this.querySelector('.card-arrow');
            if (arrow) {
                arrow.style.animation = '';
            }
        });
    });
});

// Add bounce animation for arrows
if (!document.getElementById('bounce-animation')) {
    const bounceStyle = document.createElement('style');
    bounceStyle.id = 'bounce-animation';
    bounceStyle.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(0);
            }
            40% {
                transform: translateX(5px);
            }
            60% {
                transform: translateX(3px);
            }
        }
    `;
    document.head.appendChild(bounceStyle);
}

// Optional: Add loading state for navigation (uncomment if you want this feature)
/*
function navigateWithLoading(url) {
    event.preventDefault();
    const card = event.currentTarget.querySelector('.feature-card');
    
    card.style.opacity = '0.7';
    card.style.transform = 'scale(0.95)';
    
    // Show loading indicator
    const loader = document.createElement('div');
    loader.innerHTML = '⏳';
    loader.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
        z-index: 10;
    `;
    card.appendChild(loader);
    
    // Navigate after brief delay
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}
*/

// Touch support for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98) translateY(-5px)';
        });
        
        card.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});
