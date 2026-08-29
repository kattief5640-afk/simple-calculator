let display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(num) {
    // Prevent multiple zeros at the start
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else if (num === '.' && currentInput.includes('.')) {
        // Prevent multiple decimal points
        return;
    } else {
        currentInput += num;
    }
    shouldResetDisplay = false;
    updateDisplay();
}

function appendOperator(op) {
    if (shouldResetDisplay === false && operator !== null) {
        // Calculate previous operation first
        calculate();
    } else {
        previousInput = currentInput;
    }
    operator = op;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculate() {
    if (operator === null || previousInput === null) {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error';
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;
    currentInput = result.toString();
    operator = null;
    previousInput = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-') {
        appendOperator(e.key);
    } else if (e.key === '*') {
        e.preventDefault();
        appendOperator('*');
    } else if (e.key === '/') {
        e.preventDefault();
        appendOperator('/');
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();