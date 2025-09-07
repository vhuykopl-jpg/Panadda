/* Category Page JavaScript - Add this to a new file called category.js or append to your script.js */

// Scroll animation for cards with staggered effect
document.addEventListener('DOMContentLoaded', function() {
    const observeCards = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Staggered animation delay
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all fade-in-up elements
    document.querySelectorAll('.fade-in-up').forEach(card => {
        observeCards.observe(card);
    });
});

// Enhanced card interactions for info cards
document.addEventListener('DOMContentLoaded', function() {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            // Scale up the icon
            const icon = this.querySelector('.info-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
            }
            
            // Animate badges
            const badges = this.querySelectorAll('.course-code, .credits-badge');
            badges.forEach(badge => {
                badge.style.transform = 'scale(1.05)';
            });
            
            // Animate instructor info
            const instructorInfo = this.querySelector('.instructor-info');
            if (instructorInfo) {
                instructorInfo.style.transform = 'scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset icon
            const icon = this.querySelector('.info-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '';
            }
            
            // Reset badges
            const badges = this.querySelectorAll('.course-code, .credits-badge');
            badges.forEach(badge => {
                badge.style.transform = 'scale(1)';
            });
            
            // Reset instructor info
            const instructorInfo = this.querySelector('.instructor-info');
            if (instructorInfo) {
                instructorInfo.style.transform = 'scale(1)';
            }
        });
        
        // Click effect for info cards
        card.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${event.clientX - rect.left - size/2}px;
                top: ${event.clientY - rect.top - size/2}px;
                background: rgba(102, 126, 234, 0.2);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
});

// Smooth scroll for back button and navigation
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.querySelector('.back-button');
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    
    // Add click animation to back button
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
        });
    }
    
    // Add hover effects to breadcrumb links
    breadcrumbLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Assessment grid hover effects
document.addEventListener('DOMContentLoaded', function() {
    const assessmentItems = document.querySelectorAll('.assessment-item');
    
    assessmentItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.background = '#edf2f7';
            this.style.transform = 'translateY(-3px)';
            
            const percentage = this.querySelector('.assessment-percentage');
            if (percentage) {
                percentage.style.transform = 'scale(1.1)';
                percentage.style.color = '#5a67d8';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = '#f7fafc';
            this.style.transform = 'translateY(0)';
            
            const percentage = this.querySelector('.assessment-percentage');
            if (percentage) {
                percentage.style.transform = 'scale(1)';
                percentage.style.color = '#667eea';
            }
        });
        
        // Staggered entrance animation
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Initial state for animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.3s ease';
    });
});

// Floating shapes animation enhancement
document.addEventListener('DOMContentLoaded', function() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
});

// Scroll progress indicator for long content
document.addEventListener('DOMContentLoaded', function() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Enhanced text animations
document.addEventListener('DOMContentLoaded', function() {
    const highlights = document.querySelectorAll('.highlight');
    
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(120deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)';
            this.style.transform = 'scale(1.05)';
        });
        
        highlight.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(120deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)';
            this.style.transform = 'scale(1)';
        });
    });
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // ESC key to go back
    if (e.key === 'Escape') {
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            window.location.href = backButton.href;
        }
    }
    
    // Arrow keys for card navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const cards = document.querySelectorAll('.info-card');
        let currentIndex = Array.from(cards).findIndex(card => card === document.activeElement);
        if (currentIndex < cards.length - 1) {
            cards[currentIndex + 1].focus();
            cards[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        e.preventDefault();
    }
    
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const cards = document.querySelectorAll('.info-card');
        let currentIndex = Array.from(cards).findIndex(card => card === document.activeElement);
        if (currentIndex > 0) {
            cards[currentIndex - 1].focus();
            cards[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        e.preventDefault();
    }
});

// Make cards focusable for keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `ข้อมูลส่วนที่ ${index + 1}`);
        
        // Add focus styles
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '4px';
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
            this.style.outlineOffset = '0';
            this.style.transform = 'translateY(0)';
        });
    });
});