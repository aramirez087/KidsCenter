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
// NOTE: lenisSmoothScroll is assigned later after Lenis init; declared here so handlers can reference it safely.
let lenisSmoothScroll = null;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.offsetTop - offset;

            if (lenisSmoothScroll) {
                lenisSmoothScroll.scrollTo(targetPosition, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            } else {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            navMenu?.classList.remove('active');

            // Reset hamburger animation
            if (navMenu?.classList.contains('active') === false) {
                const spans = hamburger?.querySelectorAll('span');
                if (spans) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        }
    });
});

// Form submission with Vercel API
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Configuration - Vercel Serverless Function endpoint
    const CONTACT_API_URL = '/api/contact';

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
            // Send data to Vercel API (Resend)
            const response = await fetch(CONTACT_API_URL, {
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

// --- Premium Motion Physics: Lenis & GSAP ---

// 1. Initialize Lenis for Smooth Scrolling (wrapped in try-catch for CDN resilience)
try {
    if (typeof Lenis !== 'undefined') {
        lenisSmoothScroll = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenisSmoothScroll.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
} catch (e) {
    console.warn('Lenis smooth scroll failed to initialize:', e);
    lenisSmoothScroll = null;
}

// ── Custom Cursor Engine ──
const cursor = document.getElementById('customCursor');
const cursorDot = cursor?.querySelector('.cursor-dot');
const cursorRing = cursor?.querySelector('.cursor-ring');

if (cursor && !matchMedia('(hover: none)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Dot follows immediately
        gsap.set(cursorDot, { x: mouseX, y: mouseY });
    });

    // Ring follows with elastic delay
    gsap.ticker.add(() => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        gsap.set(cursorRing, { x: ringX, y: ringY });
    });

    // Hover states for interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .gallery-item, .service-card, .modalidad-card, .age-card, .faq-question');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, .btn').forEach(el => el.style.cursor = 'none');
}

// ── Hero Particles Engine ──
const particleCanvas = document.getElementById('heroParticles');
if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 50;

    function resizeCanvas() {
        const hero = particleCanvas.parentElement;
        particleCanvas.width = hero.offsetWidth;
        particleCanvas.height = hero.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.25 + 0.05;
            this.life = Math.random() * 200 + 100;
            this.maxLife = this.life;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;
            // Fade in and out
            const lifeRatio = this.life / this.maxLife;
            this.currentOpacity = lifeRatio > 0.5
                ? this.opacity * ((1 - lifeRatio) * 2)
                : this.opacity * (lifeRatio * 2);
            if (this.life <= 0) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(74, 168, 88, ${this.currentOpacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ── Integrate Lenis with GSAP ScrollTrigger ──
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    lenisSmoothScroll?.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenisSmoothScroll?.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    document.addEventListener('DOMContentLoaded', () => {

        // ── Cinematic Hero Word-by-Word Reveal ──
        const words = document.querySelectorAll('.hero-title .word');
        if (words.length > 0) {
            gsap.to(words, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.08,
                ease: "power4.out",
                delay: 0.3,
            });

            // Then reveal the subtitle and badges after the title
            gsap.fromTo('.hero-subtitle',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.2 }
            );
            gsap.fromTo('.hero-trust-badges',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.5 }
            );
            gsap.fromTo('.hero-buttons',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.7 }
            );

            // Hero image wipe reveal
            const heroImg = document.querySelector('.hero-image img');
            if (heroImg) {
                heroImg.classList.add('img-reveal');
                gsap.to(heroImg, {
                    delay: 0.8,
                    duration: 0,
                    onComplete: () => heroImg.classList.add('revealed')
                });
            }
        }

        // ── Section Titles Reveal ──
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // ── Staggered Cards Reveal ──
        const staggerGroups = [
            '.modalidades-grid .modalidad-card',
            '.age-cards .age-card',
            '.services-grid .service-card',
            '.gallery-grid .gallery-item',
            '.faq-item'
        ];

        staggerGroups.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                const parent = elements[0].parentElement;
                gsap.fromTo(elements,
                    { y: 50, opacity: 0, scale: 0.95 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: parent,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        // ── Image Clip-Path Wipe Reveal on Scroll ──
        gsap.utils.toArray('.about-image img, .espacio-item img').forEach(img => {
            img.classList.add('img-reveal');
            ScrollTrigger.create({
                trigger: img,
                start: "top 85%",
                onEnter: () => img.classList.add('revealed'),
                onLeaveBack: () => img.classList.remove('revealed')
            });
        });

        // ── 3D Perspective Card Tilt ──
        const tiltCards = document.querySelectorAll('.service-card, .modalidad-card, .age-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xPercent = (x / rect.width - 0.5) * 2;
                const yPercent = (y / rect.height - 0.5) * 2;

                gsap.to(card, {
                    rotateY: xPercent * 5,
                    rotateX: -yPercent * 5,
                    transformPerspective: 1000,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });

        // ── Magnetic Buttons Engine (desktop only — breaks touch targets on mobile) ──
        if (!matchMedia('(hover: none)').matches) {
            const magneticButtons = document.querySelectorAll('.btn');
            magneticButtons.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const position = btn.getBoundingClientRect();
                    const x = e.clientX - position.left - position.width / 2;
                    const y = e.clientY - position.top - position.height / 2;
                    gsap.to(btn, {
                        x: x * 0.35,
                        y: y * 0.35,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                });

                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, {
                        x: 0,
                        y: 0,
                        duration: 1.2,
                        ease: "elastic.out(1, 0.3)"
                    });
                });
            });
        }

        // ── Parallax Depth on Hero Blobs ──
        gsap.to('.hero::before', {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
            }
        });

        gsap.to('.hero::after', {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
            }
        });

        // ── Parallax on Hero Image ──
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            gsap.to(heroImage, {
                y: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: '.hero',
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        }
    });
}

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

// Removed Service Worker registration to rely on Vercel's Edge caching

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
    if (lenisSmoothScroll) {
        lenisSmoothScroll.scrollTo(0, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
        // Fallback smooth scroll
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});
