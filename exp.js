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
            alert('Donate Done!\n\nThank you for your donation of $' + amount + '!\nYour support means a lot to us.');
            document.querySelector('form').reset();
            console.log('Donation of $' + amount + ' completed successfully!');
        }
    }
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
    form.addEventListener('submit', submitDonationForm);
});
