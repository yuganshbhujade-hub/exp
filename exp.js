// Function to validate donation form
function validateDonationForm() {
    const name = document.querySelector('input[type="text"][required]').value.trim();
    const email = document.querySelector('input[type="email"][required]').value.trim();
    const cardNumber = document.querySelector('input[placeholder="XXXX XXXX XXXX XXXX"]').value.trim();
    
    if (name === '') {
        alert('Please enter your name');
        return false;
    }
    
    if (email === '') {
        alert('Please enter your email');
        return false;
    }
    
    if (!email.includes('@')) {
        alert('Please enter a valid email');
        return false;
    }
    
    if (cardNumber === '') {
        alert('Please enter card number');
        return false;
    }
    
    return true;
}

// Function to get selected donation amount
function getDonationAmount() {
    const radioButtons = document.querySelectorAll('input[name="amount"]');
    for (let radio of radioButtons) {
        if (radio.checked) {
            return radio.value;
        }
    }
    
    const customAmount = document.querySelector('input[type="number"]').value;
    if (customAmount && customAmount > 0) {
        return customAmount;
    }
    
    alert('Please select or enter a donation amount');
    return null;
}

// Function to handle form submission
function submitDonationForm(event) {
    event.preventDefault();
    
    if (validateDonationForm()) {
        const amount = getDonationAmount();
        if (amount) {
            document.querySelector('form').reset();
            showDonationPopup(amount);
            console.log('Donation of $' + amount + ' completed successfully!');
        }
    }
}

// Function to show donation popup
function showDonationPopup(amount) {
    const popup = document.getElementById('donationPopup');
    const message = document.getElementById('donationPopupMessage');
    message.textContent = 'Thank you for donating $' + amount + '! Your support brings clean water closer to those in need.';
    popup.classList.add('open');
}

// Function to hide donation popup
function hideDonationPopup() {
    const popup = document.getElementById('donationPopup');
    popup.classList.remove('open');
}

// Function to update progress bar
function updateProgressBar(newAmount, target) {
    const meter = document.querySelector('meter');
    meter.value = newAmount;
    meter.max = target;
    
    const percentage = (newAmount / target * 100).toFixed(0);
    const progressText = document.querySelector('section:nth-of-type(2) p:last-child');
    progressText.innerHTML = '<b>' + percentage + '% completed</b> — Help us reach our goal!';
}

// Function to reset form
function resetForm() {
    document.querySelector('form').reset();
}

// Initialize form when page loads
window.addEventListener('load', function() {
    const form = document.querySelector('form');
    const popupClose = document.getElementById('donationPopupClose');
    const popupButton = document.getElementById('donationPopupButton');
    const popup = document.getElementById('donationPopup');

    form.addEventListener('submit', submitDonationForm);
    popupClose.addEventListener('click', hideDonationPopup);
    popupButton.addEventListener('click', hideDonationPopup);
    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            hideDonationPopup();
        }
    });
});
