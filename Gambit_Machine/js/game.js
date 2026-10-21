import { FRUITS, CONFIG } from './config.js';
import { DOM, getCellElement } from './dom.js';
import { state, resetGameState } from './gameState.js';
import { triggerRandomTrollPopup } from './modals.js';

export function setPlayerName(name) {
  state.playerName = name;
  if (DOM.userDisplay) {
    DOM.userDisplay.textContent = name;
  }
}

export function validateBet() {
  if (state.isGameOver) return false;

  const bet = parseFloat(DOM.betInput.value);

  if (isNaN(bet) || bet <= 0) {
    DOM.betFeedback.textContent = "Ставка має бути більшою за 0!";
    DOM.gamblingBtn.disabled = true;
    return false;
  }

  DOM.betFeedback.textContent = "";
  DOM.gamblingBtn.disabled = false;
  return true;
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateGrid() {
  for (let col = 0; col < 3; col++) {
    const shuffled = shuffleArray(FRUITS);
    for (let row = 0; row < 3; row++) {
      state.grid[row][col] = shuffled[row];
    }
  }
}

function generateInitialNonWinningGrid() {
  do {
    generateGrid();
  } while (checkWinningRows().length > 0);
}

function renderGrid() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = getCellElement(col, row);
      cell.classList.remove('win-highlight');
      cell.textContent = state.grid[row][col].icon;
    }
  }
}

function checkWinningRows() {
  const winningRows = [];
  for (let row = 0; row < 3; row++) {
    const first = state.grid[row][0].id;
    const second = state.grid[row][1].id;
    const third = state.grid[row][2].id;

    if (first === second && second === third) {
      winningRows.push(row);
    }
  }
  return winningRows;
}

function handleWin(winningRows) {
  state.isGameOver = true;
  DOM.gameStatus.textContent = `🎉 Перемога! Вітаємо, ${state.playerName}!`;
  DOM.gameStatus.className = 'game-status win';

  winningRows.forEach((row) => {
    for (let col = 0; col < 3; col++) {
      const cell = getCellElement(col, row);
      cell.classList.add('win-highlight');
    }
  });

  finishGame();
}

function handleLoss() {
  state.isGameOver = true;
  const currentBet = parseFloat(DOM.betInput.value) || 0;

  if (currentBet >= CONFIG.highBetThreshold) {
    DOM.gameStatus.textContent = "💀 Ви програли чиюсь річну зарплату! 💸";
  } else {
    DOM.gameStatus.textContent = "💀 Спроби вичерпано. Казино завжди у плюсі!";
  }

  DOM.gameStatus.className = 'game-status loss';
  finishGame();
}

function finishGame() {
  DOM.betInput.disabled = true;
  DOM.gamblingBtn.classList.add('hidden');
  DOM.restartBtn.classList.remove('hidden');
}

function spin() {
  if (state.isGameOver || !validateBet()) return;

  state.currentAttempt++;
  DOM.attemptsDisplay.textContent = `Спроба ${state.currentAttempt} з ${CONFIG.maxAttempts}`;

  generateGrid();
  renderGrid();

  const winningRows = checkWinningRows();

  if (winningRows.length > 0) {
    handleWin(winningRows);
    return;
  }

  if (state.currentAttempt >= CONFIG.maxAttempts) {
    handleLoss();
    return;
  }

  if (Math.random() < CONFIG.trollChance) {
    triggerRandomTrollPopup();
  }
}

export function resetGame() {
  resetGameState();

  DOM.attemptsDisplay.textContent = `Спроба ${state.currentAttempt} з ${CONFIG.maxAttempts}`;
  DOM.gameStatus.textContent = "";
  DOM.gameStatus.className = "game-status";

  DOM.betInput.disabled = false;
  DOM.restartBtn.classList.add('hidden');
  DOM.gamblingBtn.classList.remove('hidden');

  validateBet();
  generateInitialNonWinningGrid();
  renderGrid();
}

export function initGame() {
  DOM.gamblingBtn.addEventListener('click', spin);
  DOM.restartBtn.addEventListener('click', resetGame);
  DOM.betInput.addEventListener('input', validateBet);

  generateInitialNonWinningGrid();
  renderGrid();
}