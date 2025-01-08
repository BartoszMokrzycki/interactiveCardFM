const form = document.querySelector('.formDetails');
const confirmInfo = document.querySelector('.confirmationPanel');

//card data variables - inputs
const cardHolder = document.getElementById('cardholderName');
const cardNumber = document.getElementById('cardholderNumber');
const expMonth = document.getElementById('expMonth');
const expYear = document.getElementById('expYear');
const cvcNumber = document.getElementById('cvc');

const allFormInputs = [cardHolder, cardNumber, expMonth, expYear, cvcNumber];

//card data variables to change
const cardHolderToChange = document.querySelector('.cardHolderSpan');
const cardNumberToChange = document.querySelector('.cardNmuberSpan');
const expMonthToChange = document.querySelector('.expMonthSpan');
const expYearToChange = document.querySelector('.expYearSpan');
const cvcToChange = document.querySelector('.cvcNumberSpan');

//errorMsg
const allErrorMsg = document.querySelectorAll('.errorMsg');
const cardHodlerErrorMsg = document.querySelector('.cardHolderErrMsg');
const cardNumberErrorMsg = document.querySelector('.cardNumberErrMsg');
const monthErrorMsg = document.querySelector('.monthErrMsg');
const yearErrorMsg = document.querySelector('.yearErrMsg');
const cvcErrorMsg = document.querySelector('.cvcErrMsg');

//btns
const confirmFormBtn = document.querySelector('.confirmBtn');
const refreshBtn = document.querySelector('.refreshBtn');

const updateCardInfo = () => {
	cardHolderToChange.textContent = cardHolder.value || 'Cardholder Name';
	cardNumberToChange.textContent =
		formatCardNumber(cardNumber.value) || '0000 0000 0000 0000';
	expMonthToChange.textContent = expMonth.value || '00';
	expYearToChange.textContent = expYear.value || '00';
	cvcToChange.textContent = cvcNumber.value || '000';
};

//card number format
const formatCardNumber = number => {
	return number
		.replace(/\D/g, '')
		.replace(/(.{4})/g, '$1 ')
		.trim();
};

function containsNumber(str) {
	return /\d/.test(str);
}
const checkIfInputHasNumbers = () => {
	if (containsNumber(cardHolder.value)) {
		cardHolder.style.border = '1px solid #ff5252';
		cardHodlerErrorMsg.textContent = 'Wrong format, letters only';
		cardHodlerErrorMsg.classList.replace('invisible', 'visible');
	} else {
		cardHolder.style.border = '1px solid #dedddf';
		cardHodlerErrorMsg.classList.replace('visible', 'invisible');
	}
};

const checkCardNumberLength = () => {
	if (cardNumber.value.length !== 16) {
		cardNumber.style.border = '1px solid #ff5252';
		cardNumberErrorMsg.textContent = `Must contain 16 numbers.`;
		cardNumberErrorMsg.classList.replace('invisible', 'visible');
	} else if (cardNumber.value.length == 16) {
		cardNumber.style.border = '1px solid #dedddf';
		cardNumberErrorMsg.classList.replace('visible', 'invisible');
	}
};

cardHolder.addEventListener('input', () => {
	updateCardInfo();
	checkIfInputHasNumbers();
});
cardNumber.addEventListener('input', () => {
	updateCardInfo();
	checkCardNumberLength();
});
expMonth.addEventListener('input', () => {
	updateCardInfo();
	if (expMonth.value.length === 2) {
		expMonth.style.border = '1px solid #dedddf';
		monthErrorMsg.classList.replace('visible', 'invisible');
	}
});

expYear.addEventListener('input', () => {
	updateCardInfo();
	if (expYear.value.length === 2) {
		expYear.style.border = '1px solid #dedddf';
		yearErrorMsg.classList.replace('visible', 'invisible');
	}
});
cvcNumber.addEventListener('input', () => {
	updateCardInfo();
	if (cvcNumber.value.length === 2) {
		cvcNumber.style.border = '1px solid #dedddf';
		cvcErrorMsg.classList.replace('visible', 'invisible');
	}
});

const completeForm = () => {
	let isFormValid = true;

	allFormInputs.forEach(input => {
		if (input.value === ``) {
			input.style.border = '1px solid #ff5252';
			allErrorMsg.forEach(errMsg => {
				errMsg.textContent = `Can't be blank`;
				errMsg.classList.replace('invisible', 'visible');
			});
			isFormValid = false;
		} else {
			input.style.border = '1px solid #dedddf';
			allErrorMsg.forEach(errMsg => {
				errMsg.classList.replace('visible', 'invisible');
			});
		}
	});

	if (cardNumber.value.length !== 16) {
		checkCardNumberLength();
		isFormValid = false;
	}

	if (containsNumber(cardHolder.value)) {
		checkIfInputHasNumbers();
		isFormValid = false;
	}

	if (expMonth.value.length !== 2) {
		expMonth.style.border = '1px solid #ff5252';
		monthErrorMsg.textContent = `Can't be blank`;
		monthErrorMsg.classList.replace('invisible', 'visible');
		isFormValid = false;
	}

	if (expYear.value.length !== 2) {
		expYear.style.border = '1px solid #ff5252';
		yearErrorMsg.textContent = `Can't be blank`;
		yearErrorMsg.classList.replace('invisible', 'visible');
		isFormValid = false;
	}

	if (cvcNumber.value.length !== 3) {
		cvcNumber.style.border = '1px solid #ff5252';
		cvcErrorMsg.textContent = `Can't be blank`;
		cvcErrorMsg.classList.replace('invisible', 'visible');
		isFormValid = false;
	}

	if (isFormValid) {
		form.classList.replace('flex', 'hidden');
		confirmInfo.classList.replace('hidden', 'flex');
	}
};

const refreshPage = () => {
	document.location.reload();
};

const submitWithEnter = e => {
	if (e.key === 'Enter') {
		e.preventDefault();
		completeForm();
	}
};

confirmFormBtn.addEventListener('click', completeForm);
refreshBtn.addEventListener('click', refreshPage);
document.addEventListener('keydown', submitWithEnter);
