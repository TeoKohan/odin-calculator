operators = {
    ADD: 'add',
    SUBTRACT: 'subtract',
    MULTIPLY: 'multiply',
    DIVIDE: 'divide'
}

function operate(a, o, b) {
    switch(o) {
        case operators.ADD:
            return add(a, b);
        case operators.SUBTRACT:
            return subtract(a, b);
        case operators.MULTIPLY:
            return multiply(a, b);
        case operators.DIVIDE:
            return divide(a, b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return undefined;
    return a / b;
}

