let formula = '';
let memory = 0;
let historyArr = [];

const display = document.getElementById('display');
const errorMessage = document.getElementById('error-message');
const currentOperationDisplay = document.getElementById('current-operation');
const historyDisplay = document.getElementById('history');

const openThemeBtn = document.getElementById('open-theme-panel');
const themePanel = document.getElementById('theme-panel');
const closeThemeBtn = document.getElementById('close-theme-panel');
const colorSelect = document.getElementById('color-select');
const fontSelect = document.getElementById('font-select');

function clearDisplay() {
  formula = '';
  display.value = '';
  clearError();
  currentOperationDisplay.textContent = '';
}

function backspace() {
  if (formula.length === 0) return;
  formula = formula.slice(0, -1);
  display.value = formula;
}

function appendNumber(char) {
  clearError();

  if (formula.length >= 50) return; // limita tamanho

  // Regras simples para não inserir símbolos seguidos
  const lastChar = formula.slice(-1);
  const operators = ['+', '-', '*', '/', '^'];

  if (
    operators.includes(char) &&
    (formula === '' || operators.includes(lastChar))
  ) {
    return; // evita dois operadores seguidos ou operador no início
  }

  // Permite '.' se não tiver ponto consecutivo no número atual
  if (char === '.') {
    // encontra o último operador para limitar o número atual
    const lastOpIndex = Math.max(
      formula.lastIndexOf('+'),
      formula.lastIndexOf('-'),
      formula.lastIndexOf('*'),
      formula.lastIndexOf('/'),
      formula.lastIndexOf('^'),
      formula.lastIndexOf('('),
      formula.lastIndexOf(')')
    );
    const currentNumber = formula.slice(lastOpIndex + 1);
    if (currentNumber.includes('.')) return; // já tem ponto
  }

  // Permitir parênteses normalmente
  // Permitir números sempre
  formula += char;
  display.value = formula;
}

function setOperation(op) {
  appendNumber(op);
}

function calculate() {
  clearError();

  if (formula.trim() === '') return;

  try {
    // Transformar '^' em '**' para potência no eval()
    let evalFormula = formula.replace(/\^/g, '**');

    // Verificar parênteses balanceados
    if (!parenthesesAreBalanced(evalFormula)) {
      showError('Parênteses desbalanceados!');
      return;
    }

    // Avaliar expressão (com cuidado)
    let result = eval(evalFormula);

    if (result === Infinity || result === -Infinity) {
      showError('Divisão por zero não permitida!');
      return;
    }

    if (isNaN(result)) {
      showError('Expressão inválida!');
      return;
    }

    // Limitar casas decimais
    result = parseFloat(result.toFixed(10));

    historyArr.unshift(`${formula} = ${result}`);
    updateHistory();

    formula = result.toString();
    display.value = formula;
    currentOperationDisplay.textContent = '';

  } catch (e) {
    showError('Erro na expressão!');
  }
}

function parenthesesAreBalanced(str) {
  let stack = [];
  for (let char of str) {
    if (char === '(') stack.push(char);
    else if (char === ')') {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}

function showError(msg) {
  errorMessage.textContent = msg;
}

function clearError() {
  errorMessage.textContent = '';
}

// Funções matemáticas avançadas

function applySqrt() {
  clearError();
  if (formula === '') return;

  try {
    let evalFormula = formula.replace(/\^/g, '**');
    if (!parenthesesAreBalanced(evalFormula)) {
      showError('Parênteses desbalanceados!');
      return;
    }
    let value = eval(evalFormula);
    if (value < 0) {
      showError('Raiz quadrada de número negativo!');
      return;
    }
    let result = Math.sqrt(value);
    result = parseFloat(result.toFixed(10));
    historyArr.unshift(`√(${formula}) = ${result}`);
    updateHistory();
    formula = result.toString();
    display.value = formula;
  } catch {
    showError('Erro na expressão!');
  }
}

function applySin() {
  clearError();
  if (formula === '') return;
  try {
    let evalFormula = formula.replace(/\^/g, '**');
    if (!parenthesesAreBalanced(evalFormula)) {
      showError('Parênteses desbalanceados!');
      return;
    }
    let value = eval(evalFormula);
    let result = Math.sin(value);
    result = parseFloat(result.toFixed(10));
    historyArr.unshift(`sin(${formula}) = ${result}`);
    updateHistory();
    formula = result.toString();
    display.value = formula;
  } catch {
    showError('Erro na expressão!');
  }
}

function applyCos() {
  clearError();
  if (formula === '') return;
  try {
    let evalFormula = formula.replace(/\^/g, '**');
    if (!parenthesesAreBalanced(evalFormula)) {
      showError('Parênteses desbalanceados!');
      return;
    }
    let value = eval(evalFormula);
    let result = Math.cos(value);
    result = parseFloat(result.toFixed(10));
    historyArr.unshift(`cos(${formula}) = ${result}`);
    updateHistory();
    formula = result.toString();
    display.value = formula;
  } catch {
    showError('Erro na expressão!');
  }
}

// Função porcentagem
function percentage() {
  clearError();
  if (formula === '') return;
  try {
    let evalFormula = formula.replace(/\^/g, '**');
    if (!parenthesesAreBalanced(evalFormula)) {
      showError('Parênteses desbalanceados!');
      return;
    }
    let value = eval(evalFormula);
    let result = value / 100;
    result = parseFloat(result.toFixed(10));
    historyArr.unshift(`${formula}% = ${result}`);
    updateHistory();
    formula = result.toString();
    display.value = formula;
  } catch {
    showError('Erro na expressão!');
  }
}

// Memória
function memoryClear() {
  memory = 0;
}

function memoryRecall() {
  appendNumber(memory.toString());
}

function memoryAdd() {
  try {
    let val = eval(formula.replace(/\^/g, '**'));
    memory += val;
  } catch {}
}

function memorySubtract() {
  try {
    let val = eval(formula.replace(/\^/g, '**'));
    memory -= val;
  } catch {}
}

// Histórico
function updateHistory() {
  historyDisplay.textContent = historyArr.slice(0, 5).join('\n');
}

// Tema personalizado
function openThemePanel() {
  themePanel.hidden = false;
  colorSelect.focus();
}

function closeThemePanel() {
  themePanel.hidden = true;
  openThemeBtn.focus();
}

openThemeBtn.addEventListener('click', openThemePanel);
closeThemeBtn.addEventListener('click', closeThemePanel);

colorSelect.addEventListener('change', () => {
  document.documentElement.style.setProperty('--theme-color', colorSelect.value);
  localStorage.setItem('themeColor', colorSelect.value);
  // Atualizar botão rosa (pink-btn)
  document.documentElement.style.setProperty('--btn-rosa', colorSelect.value);
});

fontSelect.addEventListener('change', () => {
  document.documentElement.style.setProperty('--theme-font', fontSelect.value);
  localStorage.setItem('themeFont', fontSelect.value);
});

// Carregar preferências salvas
window.addEventListener('DOMContentLoaded', () => {
  const savedColor = localStorage.getItem('themeColor');
  const savedFont = localStorage.getItem('themeFont');

  if (savedColor) {
    colorSelect.value = savedColor;
    document.documentElement.style.setProperty('--theme-color', savedColor);
    document.documentElement.style.setProperty('--btn-rosa', savedColor);
  }
  if (savedFont) {
    fontSelect.value = savedFont;
    document.documentElement.style.setProperty('--theme-font', savedFont);
  }
});

// Suporte teclado
window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  const key = e.key;

  // Números
  if ('0123456789'.includes(key)) {
    appendNumber(key);
    animateButton(key);
    e.preventDefault();
  }
  // Operadores
  else if ('+-*/^'.includes(key)) {
    setOperation(key);
    animateButton(key);
    e.preventDefault();
  }
  // Parênteses
  else if (key === '(' || key === ')') {
    appendNumber(key);
    animateButton(key);
    e.preventDefault();
  }
  // Ponto decimal
  else if (key === '.') {
    appendNumber('.');
    animateButton('.');
    e.preventDefault();
  }
  // Enter = calcular
  else if (key === 'Enter') {
    calculate();
    animateButton('=');
    e.preventDefault();
  }
  // Backspace = apagar
  else if (key === 'Backspace') {
    backspace();
    animateButton('←');
    e.preventDefault();
  }
  // C ou Escape para limpar
  else if (key.toLowerCase() === 'c' || key === 'Escape') {
    clearDisplay();
    animateButton('C');
    e.preventDefault();
  }
});

// Animação de botão (quando clicado ou teclado)
function animateButton(char) {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn) => {
    if (btn.textContent === char) {
      btn.classList.add('active');
      setTimeout(() => btn.classList.remove('active'), 100);
    }
  });
}
