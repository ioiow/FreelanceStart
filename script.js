// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация при прокрутке
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Инициализация анимаций
window.addEventListener('load', () => {
    document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Массивы с отзывами на разных языках
const testimonials = {
    ru: [
        {
            name: "Максим, 24 года",
            text: "Через 10 дней после покупки гайда получил первый заказ на 120€. Сейчас стабильно зарабатываю 700-900€ в месяц.",
            img: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            name: "Анна, 29 лет",
            text: "Благодаря шаблонам из гайда смогла найти 3 постоянных клиента за месяц. Очень довольна результатом!",
            img: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            name: "Дмитрий, 31 год",
            text: "За первые 2 недели окупил гайд в 5 раз! Теперь рекомендую всем знакомым, кто хочет начать во фрилансе.",
            img: "https://randomuser.me/api/portraits/men/75.jpg"
        },
        {
            name: "Екатерина, 27 лет",
            text: "Никогда не думала, что смогу зарабатывать удаленно. Сейчас имею 4 постоянных клиента и доход от 1000€/мес.",
            img: "https://randomuser.me/api/portraits/women/63.jpg"
        },
        {
            name: "Артем, 35 лет",
            text: "После увольнения купил гайд и уже через месяц полностью перешел на фриланс. Лучшее решение в моей жизни!",
            img: "https://randomuser.me/api/portraits/men/90.jpg"
        }
    ],
    en: [
        {
            name: "Max, 24 years",
            text: "10 days after purchasing the guide, I got my first order for €120. Now I consistently earn €700-900 per month.",
            img: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            name: "Anna, 29 years",
            text: "Thanks to the templates from the guide, I found 3 regular clients in a month. Very happy with the result!",
            img: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            name: "Dmitry, 31 years",
            text: "In the first 2 weeks, I recouped the cost of the guide 5 times! Now I recommend it to everyone who wants to start freelancing.",
            img: "https://randomuser.me/api/portraits/men/75.jpg"
        },
        {
            name: "Ekaterina, 27 years",
            text: "I never thought I could earn money remotely. Now I have 4 regular clients and an income of €1000/month.",
            img: "https://randomuser.me/api/portraits/women/63.jpg"
        },
        {
            name: "Artem, 35 years",
            text: "After being laid off, I bought the guide and within a month I switched completely to freelancing. The best decision of my life!",
            img: "https://randomuser.me/api/portraits/men/90.jpg"
        }
    ]
};

// Функция для отображения отзывов
function displayTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;
    
    container.innerHTML = '';

    // Определяем текущий язык
    const currentLang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
    const currentTestimonials = testimonials[currentLang];

    // Выбираем случайные 2 отзыва из массива
    const shuffled = [...currentTestimonials].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    selected.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-image">
                <img src="${testimonial.img}" alt="${currentLang === 'ru' ? 'Фото' : 'Photo'} ${testimonial.name}">
            </div>
            <div class="testimonial-content">
                <p>"${testimonial.text}"</p>
                <div class="author">- ${testimonial.name}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Инициализация отзывов и ротация каждые 10 секунд
window.addEventListener('load', () => {
    displayTestimonials();
    setInterval(displayTestimonials, 10000); // Меняем отзывы каждые 10 секунд
});

// Обработчик для гамбургер-меню
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });
}

// Language switcher logic
// Улучшенный переключатель языков для GitHub Pages
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        switchLanguage(lang, true);
    });
});

function switchLanguage(lang, isUserAction = false) {
    try {
        // Сохраняем предпочтение языка
        localStorage.setItem('preferredLanguage', lang);
        
        // Получаем текущую страницу
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Определяем новую страницу
        let newPage;
        if (lang === 'en') {
            if (currentPage.includes('payment')) {
                newPage = 'payment-en.html';
            } else {
                newPage = 'index-en.html';
            }
        } else {
            if (currentPage.includes('payment-en')) {
                newPage = 'payment.html';
            } else if (currentPage.includes('index-en')) {
                newPage = 'index.html';
            } else {
                // Если это главная страница без index.html в URL
                newPage = 'index.html';
            }
        }
        
        // Сохраняем параметры запроса
        const query = window.location.search;
        
        // Для GitHub Pages используем относительные пути
        if (isUserAction && currentPage === newPage) {
            // Если пользователь нажал кнопку текущего языка - просто обновляем
            window.location.reload();
        } else {
            // Перенаправляем на новую страницу
            window.location.href = newPage + query;
        }
        
    } catch (error) {
        console.error('Ошибка переключения языка:', error);
        // В случае ошибки просто перезагружаем страницу
        window.location.reload();
    }
}

// Проверяем предпочтительный язык при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Только для главных страниц (не для payment)
    if (!window.location.pathname.includes('payment')) {
        const preferredLanguage = localStorage.getItem('preferredLanguage');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Проверяем, нужно ли перенаправление
        if (preferredLanguage === 'en' && !currentPage.includes('-en')) {
            switchLanguage('en');
        } else if (preferredLanguage === 'ru' && currentPage.includes('-en')) {
            switchLanguage('ru');
        }
    }
    
    // Обновляем активную кнопку языка
    updateActiveLanguageButton();
});

// Обновляем активную кнопку языка
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