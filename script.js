const cardNumberInput = document.getElementById('cardNumber');
const checkBtn = document.getElementById('checkBtn');
const resultDiv = document.getElementById('result');

checkBtn.addEventListener('click', checkCard);
cardNumberInput.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        checkCard();
    }
});

function checkCard() {
    const cardNumber = cardNumberInput.value.replace(/\s+/g, '');
    resultDiv.textContent = '';
    cardNumberInput.classList.remove('error');

    if (!/^\d+$/.test(cardNumber)) {
        showError('Por favor, digite apenas números.');
        return;
    }

    let brand = identifyCardBrand(cardNumber);

    if (brand) {
        showSuccess(`✅ Cartão identificado: ${brand}`);
    } else {
        showError('Cartão não reconhecido ou inválido.');
    }
}

function identifyCardBrand(number) {
    if (/^4\d{12}(\d{3})?$/.test(number)) return 'Visa';
    if (/^4\d{15}$/.test(number)) return 'Visa 16 Dígitos';
    if (/^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7([01]\d{12}|20\d{12})))$/.test(number)) return 'MasterCard';
    if (/^5\d{15}$/.test(number)) return 'Master';
    if (/^3[47]\d{13}$/.test(number)) return 'American Express';
    if (/^3(0[0-5]|6|8)\d{11}$/.test(number)) return 'Diners Club';
    if (/^(6011\d{12}|65\d{14}|64[4-9]\d{13}|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9([01]\d|2[0-5]))\d{10})$/.test(number)) return 'Discover';
    if (/^(2014|2149)\d{11}$/.test(number)) return 'enRoute';
    if (/^35(2[8-9]|[3-8][0-9])\d{12}$/.test(number)) return 'JCB';
    if (/^8699\d{11}$/.test(number)) return 'Voyager';
    if (/^(606282\d{10}|63(7(0[5-9]|[1-5]\d|6[0-8]))\d{10})$/.test(number)) return 'HiperCard';
    if (/^50\d{14,17}$/.test(number)) return 'Aura';

    return null;
}

function showSuccess(message) {
    resultDiv.textContent = message;
    resultDiv.style.color = '#4caf50';
}

function showError(message) {
    resultDiv.textContent = message;
    resultDiv.style.color = '#ff6b6b';
    cardNumberInput.classList.add('error');
}