// ===== GLOBAL VARIABLES =====
let currentTestimonial = 0;
let testimonialInterval;

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class based on scroll position
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');

    if (!menuToggle || !sidebar || !sidebarOverlay) return;

    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    // Close sidebar when clicking on links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                const sidebarOverlay = document.getElementById('sidebarOverlay');
                if (sidebar && sidebarOverlay) {
                    sidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// ===== ANIMATE ON SCROLL =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== TESTIMONIALS SLIDER =====
const testimonials = {
    ru: [
        {
            name: "Максим, 24 года",
            text: "Через 10 дней после покупки гайда получил первый заказ на 120€. Сейчас стабильно зарабатываю 700-900€ в месяц.",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            role: "Веб-разработчик"
        },
        {
            name: "Анна, 29 лет",
            text: "Благодаря шаблонам из гайда смогла найти 3 постоянных клиента за месяц. Очень довольна результатом!",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            role: "Графический дизайнер"
        },
        {
            name: "Дмитрий, 31 год",
            text: "За первые 2 недели окупил гайд в 5 раз! Теперь рекомендую всем знакомым, кто хочет начать во фрилансе.",
            img: "https://randomuser.me/api/portraits/men/75.jpg",
            role: "Копирайтер"
        },
        {
            name: "Екатерина, 27 лет",
            text: "Никогда не думала, что смогу зарабатывать удаленно. Сейчас имею 4 постоянных клиента и доход от 1000€/мес.",
            img: "https://randomuser.me/api/portraits/women/63.jpg",
            role: "Переводчик"
        },
        {
            name: "Артем, 35 лет",
            text: "После увольнения купил гайд и уже через месяц полностью перешел на фриланс. Лучшее решение в моей жизни!",
            img: "https://randomuser.me/api/portraits/men/90.jpg",
            role: "Маркетолог"
        }
    ],
    en: [
        {
            name: "Max, 24 years",
            text: "10 days after purchasing the guide, I got my first order for €120. Now I consistently earn €700-900 per month.",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            role: "Web Developer"
        },
        {
            name: "Anna, 29 years",
            text: "Thanks to the templates from the guide, I found 3 regular clients in a month. Very happy with the result!",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            role: "Graphic Designer"
        },
        {
            name: "Dmitry, 31 years",
            text: "In the first 2 weeks, I recouped the cost of the guide 5 times! Now I recommend it to everyone who wants to start freelancing.",
            img: "https://randomuser.me/api/portraits/men/75.jpg",
            role: "Copywriter"
        },
        {
            name: "Ekaterina, 27 years",
            text: "I never thought I could earn money remotely. Now I have 4 regular clients and an income of €1000/month.",
            img: "https://randomuser.me/api/portraits/women/63.jpg",
            role: "Translator"
        },
        {
            name: "Artem, 35 years",
            text: "After being laid off, I bought the guide and within a month I switched completely to freelancing. The best decision of my life!",
            img: "https://randomuser.me/api/portraits/men/90.jpg",
            role: "Marketer"
        }
    ]
};

function initTestimonials() {
    const container = document.getElementById('testimonials-container');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    
    if (!container) return;

    function showTestimonial(index) {
        const currentLang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
        const testimonial = testimonials[currentLang][index];
        
        container.innerHTML = `
            <div class="testimonial-slide active">
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        ${testimonial.text}
                    </div>
                    <div class="testimonial-author">
                        <img src="${testimonial.img}" alt="${testimonial.name}" class="testimonial-avatar">
                        <div class="testimonial-info">
                            <h4>${testimonial.name}</h4>
                            <p>${testimonial.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function nextTestimonial() {
        const currentLang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
        currentTestimonial = (currentTestimonial + 1) % testimonials[currentLang].length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        const currentLang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
        currentTestimonial = (currentTestimonial - 1 + testimonials[currentLang].length) % testimonials[currentLang].length;
        showTestimonial(currentTestimonial);
    }

    // Initialize first testimonial
    showTestimonial(currentTestimonial);

    // Add event listeners if buttons exist
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);

    // Auto-rotate testimonials
    testimonialInterval = setInterval(nextTestimonial, 5000);

    // Pause auto-rotation on hover
    container.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    container.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// ===== FAQ ACCORDION =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== LANGUAGE SWITCHER =====
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang, true);
        });
    });

    updateActiveLanguageButton();
}

function switchLanguage(lang, isUserAction = false) {
    try {
        // Save language preference
        localStorage.setItem('preferredLanguage', lang);
        
        // Get current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Determine new page
        let newPage;
        if (lang === 'en') {
            if (currentPage.includes('payment')) {
                newPage = 'payment-en.html';
            } else if (currentPage === 'index.html' || currentPage === '') {
                newPage = 'index-en.html';
            } else {
                newPage = currentPage.replace('.html', '-en.html');
            }
        } else {
            if (currentPage.includes('payment-en')) {
                newPage = 'payment.html';
            } else if (currentPage.includes('-en')) {
                newPage = currentPage.replace('-en.html', '.html');
            } else {
                newPage = currentPage;
            }
        }
        
        // Preserve query parameters
        const query = window.location.search;
        
        // For GitHub Pages use relative paths
        if (isUserAction && currentPage === newPage) {
            window.location.reload();
        } else {
            window.location.href = newPage + query;
        }
        
    } catch (error) {
        console.error('Language switch error:', error);
        window.location.reload();
    }
}

function updateActiveLanguageButton() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentLang = currentPage.includes('-en') ? 'en' : 'ru';
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
            btn.disabled = true;
        } else {
            btn.classList.remove('active');
            btn.disabled = false;
        }
    });
}

// ===== PARALLAX EFFECTS =====
function initParallax() {
    const heroShapes = document.querySelectorAll('.hero-shape');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        heroShapes.forEach((shape, index) => {
            const speed = 0.05 * (index + 1);
            shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.feature-card, .process-step, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Set initial styles and observe
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== CURSOR EFFECTS =====
function initCursorEffects() {
    const buttons = document.querySelectorAll('.btn, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'var(--color-error)';
                    isValid = false;
                    
                    // Remove error style after delay
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (isValid) {
                form.submit();
            }
        });
    });
}

// ===== THEME TOGGLE (FOR FUTURE USE) =====
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// ===== INITIALIZE EVERYTHING =====
function initAll() {
    initPreloader();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initAOS();
    initCounters();
    initTestimonials();
    initFAQ();
    initLanguageSwitcher();
    initParallax();
    initIntersectionObserver();
    initCursorEffects();
    initFormValidation();
    initThemeToggle();
    
    // Check preferred language on load (only for main pages)
    if (!window.location.pathname.includes('payment')) {
        const preferredLanguage = localStorage.getItem('preferredLanguage');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (preferredLanguage === 'en' && !currentPage.includes('-en')) {
            setTimeout(() => switchLanguage('en'), 1000);
        } else if (preferredLanguage === 'ru' && currentPage.includes('-en')) {
            setTimeout(() => switchLanguage('ru'), 1000);
        }
    }
}

// ===== DOCUMENT READY =====
document.addEventListener('DOMContentLoaded', initAll);

// ===== WINDOW LOAD =====
window.addEventListener('load', () => {
    // Additional load-time optimizations
    document.body.classList.add('loaded');
});

// ===== RESIZE HANDLER =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize components that need resize updates
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 250);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Script error:', e.error);
});

// ===== EXPORT FOR MODULAR USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAll,
        switchLanguage,
        initTestimonials
    };
}