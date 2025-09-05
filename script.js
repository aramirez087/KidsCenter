// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 
        'rotate(45deg) translateY(8px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 
        'rotate(-45deg) translateY(-8px)' : 'none';
});

// Chat button handlers
const chatBtnHeader = document.getElementById('chatBtnHeader');
const mobileChat = document.getElementById('mobileChat');

// Function to open n8n chat
function openChat() {
    // Try multiple selectors for the n8n chat widget
    const chatLauncher = document.querySelector('.n8n-chat__launcher') || 
                        document.querySelector('[data-n8n-chat]') ||
                        document.querySelector('.n8n-chat__toggle');
    
    if (chatLauncher) {
        chatLauncher.click();
    } else {
        // If chat widget not ready, wait and try again
        setTimeout(() => {
            const retryLauncher = document.querySelector('.n8n-chat__launcher') || 
                                 document.querySelector('[data-n8n-chat]') ||
                                 document.querySelector('.n8n-chat__toggle');
            if (retryLauncher) {
                retryLauncher.click();
            } else {
                console.log('Chat widget not available yet. Please try again.');
            }
        }, 500);
    }
}

// Add click handlers to chat buttons
chatBtnHeader?.addEventListener('click', openChat);
mobileChat?.addEventListener('click', openChat);

// Also add listener for when n8n chat is fully loaded
window.addEventListener('load', () => {
    // Re-attach handlers after a delay to ensure n8n is loaded
    setTimeout(() => {
        const header = document.getElementById('chatBtnHeader');
        const mobile = document.getElementById('mobileChat');
        
        if (header) {
            header.onclick = openChat;
        }
        if (mobile) {
            mobile.onclick = openChat;
        }
    }, 2000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu?.classList.remove('active');
        }
    });
});

// Form submission with n8n webhook integration
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Configuration - n8n webhook URL (production)
    const N8N_WEBHOOK_URL = 'https://n8n.automationbeast.win/webhook/48c697d5-37a5-40fe-9e84-4176b0c76670';
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form elements
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = document.getElementById('form-message');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Add timestamp
        data.timestamp = new Date().toISOString();
        data.source = 'Kids Center Website';
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        btnText.style.display = 'none';
        btnLoading.classList.add('visible');
        formMessage.classList.remove('visible');
        
        try {
            // Send data to n8n webhook
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                // Success - show success message
                formMessage.textContent = '¡Gracias por tu consulta! 🌈 Te contactaremos pronto para agendar una cita.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success', 'visible');
                
                // Reset form
                contactForm.reset();
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide message after 7 seconds
                setTimeout(() => {
                    formMessage.classList.remove('visible');
                }, 7000);
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            // Error - show error message
            console.error('Error:', error);
            formMessage.textContent = 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente o contáctanos al +506 2234-5678.';
            formMessage.classList.remove('success');
            formMessage.classList.add('error', 'visible');
            
            // Hide error message after 10 seconds
            setTimeout(() => {
                formMessage.classList.remove('visible');
            }, 10000);
        } finally {
            // Reset button state
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                btnText.style.display = 'inline';
                btnLoading.classList.remove('visible');
            }, 1000);
        }
    });
}

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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .gallery-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add parallax effect to hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 1 + (index * 0.5);
        shape.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter animation for statistics (if needed in future)
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});