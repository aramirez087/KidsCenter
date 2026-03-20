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

// Lightbox functionality
function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightbox.classList.add('active');
    lightboxImg.src = imageSrc;
    lightboxCaption.textContent = caption;

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    lightbox.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
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
                formMessage.textContent = '¡Gracias por tu consulta! Te contactaremos pronto para agendar una cita.';
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

// Intersection Observer for scroll reveal animations
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
    const animateElements = document.querySelectorAll(
        '.service-card, .gallery-item, .modalidad-card, .age-card, .espacio-item, .faq-item, .testimonial-content'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.06}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.06}s`;
        observer.observe(el);
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

// Testimonials Carousel
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Auto-rotate testimonials
if (testimonialCards.length > 0) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Manual navigation for testimonials
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('.faq-icon');
        const isActive = question.classList.contains('active');

        // Close all other FAQs
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
                q.querySelector('.faq-icon').textContent = '▶';
            }
        });

        // Toggle current FAQ
        question.classList.toggle('active');
        answer.classList.toggle('active');
        icon.textContent = isActive ? '▶' : '▼';
    });
});

// SEO Performance Optimization: Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
    script.async = true;
    script.onload = () => {
        const observer = lozad('.lazy');
        observer.observe();
    };
    document.head.appendChild(script);
}

// Add structured data for search results - Dynamic breadcrumb
function updateBreadcrumb() {
    const currentHash = window.location.hash;
    const breadcrumbSchema = document.querySelector('script[type="application/ld+json"]');
    if (breadcrumbSchema && currentHash) {
        const sectionName = currentHash.replace('#', '');
        const capitalizedSection = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
        console.log(`Current section: ${capitalizedSection}`);
    }
}

window.addEventListener('hashchange', updateBreadcrumb);
updateBreadcrumb();

// Service Worker for better performance (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Back to Top Button Functionality
const backToTopBtn = document.getElementById('backToTopBtn');
let scrollTimeout;

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    // Clear any existing timeout
    clearTimeout(scrollTimeout);

    // Debounce the scroll event for better performance
    scrollTimeout = setTimeout(() => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Navbar scrolled state
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.pageYOffset > 60);
        }
    }, 100);
});

// Smooth scroll to top when button is clicked
backToTopBtn?.addEventListener('click', () => {
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Alternative smooth scroll for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    backToTopBtn?.addEventListener('click', () => {
        const scrollToTop = () => {
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, currentScroll - currentScroll / 8);
            }
        };
        scrollToTop();
    });
}
