function add(a, b) { return Number(a) + Number(b); }

function subtract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) { 
    if (b == 0) {
        window.alert('Division by zero is undefined.');
        return 0;
    }
    return a / b; 
}

function dot() { if (operands[active] !== null && !operands[active].includes('.')) write('.'); }

function equal(a, op, b) { 
    return active > 1 ? operators[op].function(a, b) : (Number(a) ?? 0); 
}

operators = {
    '+': {name:'add'     , symbol: '+', function:add     },
    '-': {name:'subtract', symbol: '-', function:subtract},
    '×': {name:'multiply', symbol: '×', function:multiply},
    '÷': {name:'divide'  , symbol: '÷', function:divide  },
    '.': {name:'dot'     , symbol: '.', function:dot     },
    '=': {name:'equal'   , symbol: '=', function:equal   }
}

function clear() {
    operands = [null, null, null];
    result = 0;
    active = 0;
    update();
}

function calculator_delete() {
    if (operands[0] === null)
        return;
    switch(active) {
        case 0:
            operands[0] = operands[0].slice(0, operands[0].length-1);
            break;
        case 2:
            if (operands[2].length == 0) {
                operands[1] = null;
                active = 0;
            }
            else
                operands[2] = operands[2].slice(0, operands[2].length-1);
        break;
    }
    update();
}

function equality() {
    result = equal(...operands);
    console.log(result);
    update();
    operands = [null, null, null];
    active = 0;
}

function binary(op) {
   
    if (active == 0 && operands[0] == null)
        operands[0] = result.toFixed(2);

    if (active == 2) {
            result = equal(...operands);
            operands = [result, null, null];
    }

    operands[1] = op.symbol;
    active = 2;
    update();
}

function write(s) {
    operands[active] = (operands[active] ?? '') + s;
    update();
}

function update() {
    full_text = operands.reduce((a, b) => (a == ' 0' ? '' : a) + ' ' + (b ?? ''), '');
    operation_text.textContent = full_text.slice(-23);
    result_text.textContent = Number(result).toFixed(2);
}

let operation_text = document.querySelector('#operation .text');
let result_text    = document.querySelector('#result .text');

let operands;
let result;
let active;

let numbers = new Set([...Array(10).keys()]);
for (let i of numbers)
    document.querySelector(`#btn${i}`).addEventListener('click', (e) => write(i));

let unary_op = new Set(['.']);
for (let operator of unary_op)
    document.querySelector(`#btn${operators[operator].name}`).addEventListener('click', (e) => operators[operator].function());

let binary_op = new Set(['+', '-', '×', '÷']);
for (let operator of binary_op)
    document.querySelector(`#btn${operators[operator].name}`).addEventListener('click', (e) => binary(operators[operator]));

let equality_op = new Set(['=']);
for (let operator of equality_op)
    document.querySelector(`#btn${operators[operator].name}`).addEventListener('click', (e) => equality());

document.querySelector(`#btnclear`).addEventListener('click', (e) => clear());

document.querySelector(`#btndelete`).addEventListener('click', (e) => calculator_delete());

clear();