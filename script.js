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

// Обработчик для кнопок "Купить сейчас"
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        // Здесь можно добавить логику для открытия формы оплаты
        alert('Открытие формы оплаты. В реальном проекте подключите платежную систему!');
    });
});

// Таймер скидки (опционально)
const discountTimer = () => {
    const timerElement = document.createElement('div');
    timerElement.className = 'discount-timer';
    timerElement.innerHTML = `
        <div class="timer-content">
            <i class="fas fa-clock"></i>
            <span>Скидка 40% закончится через: <span id="countdown">30:00</span></span>
        </div>
    `;
    document.body.appendChild(timerElement);
    
    let time = 30 * 60; // 30 минут в секундах
    
    const countdown = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        
        document.getElementById('countdown').textContent = 
            `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        time--;
        
        if (time < 0) {
            clearInterval(countdown);
            timerElement.style.display = 'none';
        }
    }, 1000);
};

// Раскомментируйте для включения таймера
// discountTimer();

// Массив с отзывами
const testimonials = [
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
];

// Функция для отображения отзывов
function displayTestimonials() {
    const container = document.getElementById('testimonials-container');
    container.innerHTML = '';

    // Выбираем случайные 2 отзыва из массива
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    selected.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-image">
                <img src="${testimonial.img}" alt="Фото ${testimonial.name}">
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