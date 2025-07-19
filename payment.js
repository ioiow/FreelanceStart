// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const plan = urlParams.get('plan') || 'basic';
const price = urlParams.get('price') || '15';

// Данные о тарифах
const plans = {
    basic: {
        name: "Базовый тариф",
        price: "15€",
        features: [
            "PDF-гайд (50 страниц)",
            "Шаблоны сообщений",
            "Список бирж фриланса",
            "Чек-лист первых шагов"
        ],
        cryptoLink: "http://t.me/send?start=IVUVkrONqBqs"
    },
    extended: {
        name: "Расширенный тариф",
        price: "29€",
        features: [
            "Всё из Базового пакета",
            "Видео-уроки (3 часа)",
            "Примеры профилей",
            "Шаблоны договоров",
            "Доступ в чат поддержки"
        ],
        cryptoLink: "http://t.me/send?start=IVcXqn4svwxI"
    }
};

// Отображаем выбранный тариф
function displaySelectedPlan() {
    const selectedPlan = plan === 'basic' ? plans.basic : plans.extended;
    const selectedPlanElement = document.getElementById('selectedPlan');
    const totalPriceElement = document.getElementById('totalPrice');
    const payAmountElement = document.getElementById('payAmount');
    const cryptoLinkElement = document.getElementById('cryptoLink');
    
    selectedPlanElement.innerHTML = `
        <div class="plan-name">${selectedPlan.name}</div>
        <ul class="plan-features">
            ${selectedPlan.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    
    totalPriceElement.textContent = selectedPlan.price;
    payAmountElement.textContent = selectedPlan.price;
    
    // Устанавливаем правильную ссылку для криптоплатежа
    if (cryptoLinkElement) {
        cryptoLinkElement.href = selectedPlan.cryptoLink;
    }
    
    // Генерируем QR-код для криптоплатежа
    generateCryptoQr(selectedPlan.cryptoLink);
}

// Генерация QR-кода для криптоплатежа
function generateCryptoQr(url) {
    const qrContainer = document.getElementById('cryptoQr');
    if (qrContainer) {
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
            text: url,
            width: 150,
            height: 150,
            colorDark: "#4361ee",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// Форматирование номера карты
function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
        input.value = parts.join(' ');
    } else {
        input.value = value;
    }
}

// Форматирование срока действия
function formatExpiry(input) {
    let value = input.value.replace(/[^0-9]/g, '');
    
    if (value.length > 2) {
        input.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
}

// Переключение между методами оплаты
function setupPaymentTabs() {
    const tabs = document.querySelectorAll('.method-tab');
    const methods = document.querySelectorAll('.payment-method');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Удаляем активный класс у всех табов и методов
            tabs.forEach(t => t.classList.remove('active'));
            methods.forEach(m => m.classList.remove('active'));
            
            // Добавляем активный класс к выбранному табу и методу
            tab.classList.add('active');
            const methodId = tab.getAttribute('data-method') + 'Payment';
            document.getElementById(methodId).classList.add('active');
        });
    });
}

// Обработка формы оплаты
function handlePaymentForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Показываем индикатор загрузки
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading-spinner"></span> Обработка платежа...';
    
    // Имитация обработки платежа (в реальном проекте здесь будет запрос к платежной системе)
    setTimeout(() => {
        // В реальном проекте здесь будет редирект на страницу успеха или обработка ответа от платежной системы
        const paymentSuccess = Math.random() > 0.1; // 90% успешных платежей для демонстрации
        
        if (paymentSuccess) {
            // Сохраняем данные о покупке в localStorage
            const purchaseData = {
                plan: plan,
                price: price,
                date: new Date().toISOString(),
                email: form.email.value
            };
            localStorage.setItem('freelanceStartPurchase', JSON.stringify(purchaseData));
            
            // Перенаправляем на страницу успеха
            window.location.href = `success.html?plan=${plan}&price=${price}`;
        } else {
            // Показываем ошибку
            alert('Ошибка платежа: Пожалуйста, проверьте данные карты и попробуйте снова.');
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    }, 2000);
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    // Отображаем выбранный тариф
    displaySelectedPlan();
    
    // Настройка переключения методов оплаты
    setupPaymentTabs();
    
    // Настройка маски для номера карты
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', () => formatCardNumber(cardNumberInput));
    }
    
    // Настройка маски для срока действия
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', () => formatExpiry(expiryInput));
    }
    
    // Обработка отправки формы
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentForm);
    }
    
    // Валидация CVV
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
});