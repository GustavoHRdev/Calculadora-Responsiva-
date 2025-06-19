let currentOperation = null;
let firstNumber = null;
let shouldResetScreen = false;

const display = document.getElementById("display");

function clearDisplay() {
  display.value = '';
  firstNumber = null;
  currentOperation = null;
}

function backspace() {
  if (shouldResetScreen) return;
  display.value = display.value.slice(0, -1);
}

function appendNumber(number) {
  if (shouldResetScreen) {
    display.value = '';
    shouldResetScreen = false;
  }
  // evitar múltiplos pontos decimais
  if (number === '.' && display.value.includes('.')) return;
  display.value += number;
}

function setOperation(op) {
  if (display.value === '') return;
  if (firstNumber !== null && !shouldResetScreen) {
    calculate();
  }
  firstNumber = parseFloat(display.value);
  currentOperation = op;
  shouldResetScreen = true;
}

function calculate() {
  if (currentOperation === null || shouldResetScreen) return;
  const secondNumber = parseFloat(display.value);
  let result;
  switch (currentOperation) {
    case '+': result = firstNumber + secondNumber; break;
    case '-': result = firstNumber - secondNumber; break;
    case '*': result = firstNumber * secondNumber; break;
    case '/':
      if (secondNumber === 0) {
        alert("Divisão por zero não permitida");
        clearDisplay();
        return;
      }
      result = firstNumber / secondNumber;
      break;
    default: return;
  }
  display.value = result;
  firstNumber = result;
  currentOperation = null;
  shouldResetScreen = true;
}
