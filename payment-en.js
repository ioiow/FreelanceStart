// Get parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const plan = urlParams.get('plan') || 'basic';
const price = urlParams.get('price') || '15';

// Plan data
const plans = {
    basic: {
        name: "Basic Plan",
        price: "15€",
        features: [
            "PDF Guide (50 pages)",
            "Message Templates",
            "List of Freelance Platforms",
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
            "Profile Examples",
            "Contract Templates",
            "Access to Support Chat"
        ],
        cryptoLink: "http://t.me/send?start=IVcXqn4svwxI"
    }
};

// Display selected plan
function displaySelectedPlan() {
    const selectedPlan = plan === 'basic' ? plans.basic : plans.extended;
    const selectedPlanElement = document.getElementById('selectedPlan');
    const totalPriceElement = document.getElementById('totalPrice');
    const payAmountElement = document.getElementById('payAmount');
    const cryptoLinkElement = document.getElementById('cryptoLink');
    const donateAmountElement = document.getElementById('donateAmount');
    
    if (donateAmountElement) {
        donateAmountElement.textContent = selectedPlan.price;
    }
    
    selectedPlanElement.innerHTML = `
        <div class="plan-name">${selectedPlan.name}</div>
        <ul class="plan-features">
            ${selectedPlan.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    
    totalPriceElement.textContent = selectedPlan.price;
    payAmountElement.textContent = selectedPlan.price;
    
    // Set correct crypto payment link
    if (cryptoLinkElement) {
        cryptoLinkElement.href = selectedPlan.cryptoLink;
    }
    
    // Generate QR code for crypto payment
    generateCryptoQr(selectedPlan.cryptoLink);
}

// Generate QR code for crypto payment
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

// Format card number
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

// Format expiry date
function formatExpiry(input) {
    let value = input.value.replace(/[^0-9]/g, '');
    
    if (value.length > 2) {
        input.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
}

// Switch between payment methods
function setupPaymentTabs() {
    const tabs = document.querySelectorAll('.method-tab');
    const methods = document.querySelectorAll('.payment-method');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and methods
            tabs.forEach(t => t.classList.remove('active'));
            methods.forEach(m => m.classList.remove('active'));
            
            // Add active class to selected tab and method
            tab.classList.add('active');
            const methodId = tab.getAttribute('data-method') + 'Payment';
            document.getElementById(methodId).classList.add('active');
        });
    });
}

// Handle payment form submission
function handlePaymentForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Show loading indicator
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading-spinner"></span> Processing payment...';
    
    // Simulate payment processing (in a real project this would be a request to payment system)
    setTimeout(() => {
        // In a real project this would redirect to success page or handle payment system response
        const paymentSuccess = Math.random() > 0.1; // 90% success rate for demo
        
        if (paymentSuccess) {
            // Save purchase data in localStorage
            const purchaseData = {
                plan: plan,
                price: price,
                date: new Date().toISOString(),
                email: form.email.value
            };
            localStorage.setItem('freelanceStartPurchase', JSON.stringify(purchaseData));
            
            // Redirect to success page
            window.location.href = `success-en.html?plan=${plan}&price=${price}`;
        } else {
            // Show error
            alert('Payment error: Please check your card details and try again.');
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    }, 2000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Display selected plan
    displaySelectedPlan();
    
    // Setup payment method tabs
    setupPaymentTabs();
    
    // Setup card number mask
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', () => formatCardNumber(cardNumberInput));
    }
    
    // Setup expiry date mask
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', () => formatExpiry(expiryInput));
    }
    
    // Handle form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentForm);
    }
    
    // Validate CVV
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
});