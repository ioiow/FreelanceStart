// ===== GLOBAL VARIABLES =====
const urlParams = new URLSearchParams(window.location.search);
const plan = urlParams.get('plan') || 'basic';

// Plan data
const plans = {
    basic: {
        name: "Basic Plan",
        price: "15€",
        features: [
            "PDF Guide (50 pages)",
            "Message Templates",
            "List of 20+ Verified Platforms",
            "First Steps Checklist"
        ],
        cryptoLink: "http://t.me/send?start=IVUVkrONqBqs"
    },
    extended: {
        name: "Extended Plan",
        price: "29€",
        features: [
            "Everything from Basic Package",
            "Video Lessons (3 hours)",
            "Successful Profile Examples",
            "Contract Templates",
            "Support Chat Access",
            "Personal Profile Review"
        ],
        cryptoLink: "http://t.me/send?start=IVcXqn4svwxI"
    }
};

// ===== INITIALIZATION =====
function initPaymentPage() {
    displaySelectedPlan();
    setupPaymentTabs();
    setupFormatters();
    initHeaderScroll();
    initAOS();
}

// ===== HEADER SCROLL =====
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== AOS INIT =====
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

// ===== DISPLAY SELECTED PLAN =====
function displaySelectedPlan() {
    const selectedPlan = plans[plan] || plans.basic;
    const selectedPlanElement = document.getElementById('selectedPlan');
    const totalPriceElement = document.getElementById('totalPrice');
    const payAmountElement = document.getElementById('payAmount');
    const cryptoLinkElement = document.getElementById('cryptoLink');
    const donateAmountElement = document.getElementById('donateAmount');

    // Update donate amount
    if (donateAmountElement) {
        donateAmountElement.textContent = selectedPlan.price;
    }

    // Update selected plan display
    if (selectedPlanElement) {
        selectedPlanElement.innerHTML = `
            <div class="plan-card">
                <div class="plan-header">
                    <h4>${selectedPlan.name}</h4>
                    <span class="plan-price">${selectedPlan.price}</span>
                </div>
                <ul class="plan-features">
                    ${selectedPlan.features.map(feature => `
                        <li>
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    // Update prices
    if (totalPriceElement) totalPriceElement.textContent = selectedPlan.price;
    if (payAmountElement) payAmountElement.textContent = selectedPlan.price;

    // Update crypto link
    if (cryptoLinkElement) {
        cryptoLinkElement.href = selectedPlan.cryptoLink;
    }

    // Generate QR code
    generateCryptoQr(selectedPlan.cryptoLink);
}

// ===== GENERATE QR CODE =====
function generateCryptoQr(url) {
    const qrContainer = document.getElementById('cryptoQr');
    if (!qrContainer) return;

    qrContainer.innerHTML = '';
    new QRCode(qrContainer, {
        text: url,
        width: 180,
        height: 180,
        colorDark: "#2563eb",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// ===== PAYMENT TABS =====
function setupPaymentTabs() {
    const tabs = document.querySelectorAll('.method-tab');
    const methods = document.querySelectorAll('.payment-method');

    if (!tabs.length || !methods.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            tabs.forEach(t => t.classList.remove('active'));
            methods.forEach(m => m.classList.remove('active'));

            // Add active classes
            tab.classList.add('active');
            const methodId = tab.getAttribute('data-method') + 'Payment';
            const methodElement = document.getElementById(methodId);
            
            if (methodElement) {
                methodElement.classList.add('active');
            }
        });
    });
}

// ===== FORM FORMATTERS =====
function setupFormatters() {
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', formatExpiry);
    }

    // CVV validation
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    // Form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentForm);
    }
}

// ===== CARD NUMBER FORMATTING =====
function formatCardNumber(e) {
    const input = e.target;
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (value.length > 16) {
        value = value.substring(0, 16);
    }

    // Format with spaces every 4 characters
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    input.value = formatted;
}

// ===== EXPIRY DATE FORMATTING =====
function formatExpiry(e) {
    const input = e.target;
    let value = input.value.replace(/[^0-9]/g, '');
    
    if (value.length > 2) {
        input.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
        input.value = value;
    }
}

// ===== PAYMENT FORM HANDLING =====
function handlePaymentForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <span class="loading-spinner"></span>
        Processing payment...
    `;

    // Simulate payment processing
    setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate

        if (success) {
            // Save purchase data
            const purchaseData = {
                plan: plan,
                price: plans[plan].price,
                date: new Date().toISOString(),
                email: form.email?.value || ''
            };
            localStorage.setItem('freelanceStartPurchase', JSON.stringify(purchaseData));

            // Redirect to success page
            window.location.href = `success-en.html?plan=${plan}&price=${plans[plan].price.replace('€', '')}`;
        } else {
            // Show error
            alert('Payment error: Please check your card details and try again.');
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    }, 2000);
}

// ===== DOCUMENT READY =====
document.addEventListener('DOMContentLoaded', initPaymentPage);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Payment script error:', e.error);
});