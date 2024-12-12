// Calculator Script

// Display functions
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function appendFunction(func) {
    const display = document.getElementById('display');
    display.value += func + '(';
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function toggleSign() {
    const display = document.getElementById('display');
    if (display.value.charAt(0) === '-') {
        display.value = display.value.slice(1);
    } else {
        display.value = '-' + display.value;
    }
}

function calculate() {
    const display = document.getElementById('display');
    try {
        // Replace custom function names with their JavaScript equivalents
        let expression = display.value
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/\^/g, '**')
            .replace(/abs\(/g, 'Math.abs(');

        // Evaluate the expression
        const result = eval(expression);
        
        // Handle potential errors and limit decimal places
        display.value = Number.isFinite(result) ? result.toFixed(10).replace(/\.?0+$/, '') : 'Error';
    } catch (error) {
        display.value = 'Error';
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const validKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
        '+', '-', '*', '/', '.', '(', ')', 'Backspace', 'Enter', 'Escape'
    ];

    if (validKeys.includes(event.key)) {
        event.preventDefault();
        const display = document.getElementById('display');

        switch(event.key) {
            case 'Enter':
                calculate();
                break;
            case 'Backspace':
                backspace();
                break;
            case 'Escape':
                clearDisplay();
                break;
            default:
                appendToDisplay(event.key);
        }
    }
});