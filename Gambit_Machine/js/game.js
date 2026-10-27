import { PIECE_TYPES, MULTIPLIERS, CONFIG } from './config.js';
import { DOM, getCellElement, getMultiplierButtons } from './dom.js';
import { state, resetGameState, resetBalanceState } from './gameState.js';
import { triggerRandomTrollPopup } from './modals.js';

const messages = [
  '💀 Повний мат! Тепер ваші гроші в надійних руках!',
  '💀 Пат! Ходи вичерпано, ми збережемо ваші кошти!'
]

export function initGame() {
  renderMultiplierButtons();
  updateBalanceUI();

  DOM.gamblingBtn.addEventListener('click', spin);
  DOM.restartBtn.addEventListener('click', resetGame);
  DOM.betInput.addEventListener('input', validateBet);

  DOM.multiplierGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-multiplier');
    if (!btn) return;

    state.selectedMultiplier = MULTIPLIERS.find((m) => m.id === btn.dataset.coefId);
    getMultiplierButtons().forEach((b) => b.classList.toggle('active', b === btn));
    updatePayoutAndOddsUI();
    generateNonWinningGrid();
    renderGrid();
  });

  resetGame();
}

export function resetGame() {
  if (state.isSpinning) return;
  resetGameState();

  DOM.attemptsDisplay.textContent = `Хід 0 з ${CONFIG.maxAttempts}`;
  if (state.balance >= 1 && Number(DOM.betInput.value) > state.balance) {
    DOM.betInput.value = Math.floor(state.balance);
  }

  toggleEndGameUI(false);
  validateBet();
  generateNonWinningGrid();
  renderGrid();
}

function toggleEndGameUI(isOver, statusText = '', statusClass = '') {
  state.isGameOver = isOver;
  setControlsLocked(isOver);
  DOM.gamblingBtn.classList.toggle('hidden', isOver);
  DOM.restartBtn.classList.toggle('hidden', !isOver);
  DOM.gameStatus.textContent = statusText;
  DOM.gameStatus.className = `game-status ${statusClass}`.trim();
}

function setControlsLocked(isLocked) {
  DOM.betInput.disabled = isLocked;
  getMultiplierButtons().forEach((btn) => (btn.disabled = isLocked));
}

async function spin() {
  if (state.isGameOver || state.isSpinning) return;

  if (state.currentAttempt === 0) {
    if (!validateBet()) return;
    state.currentBet = Number(DOM.betInput.value);
    state.balance = Number((state.balance - state.currentBet).toFixed(2));
    updateBalanceUI();
    setControlsLocked(true);
  }

  state.isSpinning = true;
  state.currentAttempt++;
  DOM.gamblingBtn.disabled = true;
  DOM.attemptsDisplay.textContent = `Хід ${state.currentAttempt} з ${CONFIG.maxAttempts}`;
  DOM.gameStatus.textContent = '♟️ Розігруємо гамбіт...';

  if (Math.random() < calculateEffectiveWinChance(state.currentBet)) {
    generateWinningGrid();
  } else {
    generateNonWinningGrid();
  }

  await animateSpin();
  state.isSpinning = false;
  DOM.gamblingBtn.disabled = false;

  const winningRows = checkWinningRows();
  if (winningRows.length > 0) return handleWin(winningRows);
  if (state.currentAttempt >= CONFIG.maxAttempts) return handleLoss();

  DOM.gameStatus.textContent = 'Лінія не зібрана. Ваш наступний хід!';
  if (Math.random() < CONFIG.trollChance) triggerRandomTrollPopup();
}

function renderMultiplierButtons() {
  DOM.multiplierGroup.style.gridTemplateColumns = `repeat(${MULTIPLIERS.length}, 1fr)`;
  DOM.multiplierGroup.innerHTML = MULTIPLIERS.map(
    (m) => `<button type="button" class="btn btn-multiplier ${m.id === state.selectedMultiplier.id ? 'active' : ''}" data-coef-id="${m.id}">${m.label}</button>`
  ).join('');
}

function updateBalanceUI() { 
  DOM.balanceDisplay.textContent = state.balance.toFixed(2);
}

export function validateBet() {
  updatePayoutAndOddsUI();
  if (state.isGameOver || state.isSpinning) return false;

  const bet = Number(DOM.betInput.value);
  let error = '';

  if (state.balance < 1) {
    error = 'Банк порожній! Змініть гросмейстера для нового балансу.';
  } else if (!Number.isFinite(bet) || bet < 1) {
    error = 'Ставка має бути не меншою за 1$!';
  } else if (bet > state.balance) {
    error = `Недостатньо коштів! Ваш баланс: ${state.balance.toFixed(2)}$`;
  }

  DOM.betFeedback.textContent = error;
  DOM.gamblingBtn.disabled = Boolean(error);
  return !error;
}

function updatePayoutAndOddsUI() {
  const { value, modeText } = state.selectedMultiplier;
  const bet = Math.max(0, Number(DOM.betInput.value) || 0);
  const effective = calculateEffectiveWinChance(bet);

  DOM.oddsDisplay.textContent = `Шанс: ${Math.round(effective * 1000) / 10}% • ${modeText}`;
  DOM.payoutDisplay.textContent = `Можливий виграш: ${(bet * value).toFixed(2)}$`;
}

export function calculateEffectiveWinChance(bet) {
  const { winChance } = state.selectedMultiplier;
  if (!(bet > CONFIG.baseBetForFullOdds)) return winChance;

  const factor = Math.max(
    CONFIG.minPenaltyMultiplier,
    1 - Math.log10(bet / CONFIG.baseBetForFullOdds) * CONFIG.betPenaltyFactor
  );
  return Number((winChance * factor).toFixed(4));
}

function generateNonWinningGrid() {
  do {
    generateRandomGridFromPool();
  } while (checkWinningRows().length > 0);
}

function checkWinningRows() {
  return state.grid.flatMap((row, idx) =>
    row.every((piece) => piece.id === row[0].id) ? [idx] : []
  );
}

function generateWinningGrid() {
  const pool = getActivePiecePool();
  generateRandomGridFromPool();

  const targetRow = Math.floor(Math.random() * CONFIG.gridSize);
  const winPiece = pool[Math.floor(Math.random() * pool.length)];

  for (let col = 0; col < CONFIG.gridSize; col++) {
    const existingRow = state.grid.findIndex((r) => r[col].id === winPiece.id);
    if (existingRow !== -1) {
      [state.grid[targetRow][col], state.grid[existingRow][col]] = [
        state.grid[existingRow][col],
        state.grid[targetRow][col]
      ];
    } else {
      state.grid[targetRow][col] = winPiece;
    }
  }
}

function generateRandomGridFromPool() {
  const pool = getActivePiecePool();
  state.grid = Array.from({ length: CONFIG.gridSize }, () => Array(CONFIG.gridSize));

  for (let col = 0; col < CONFIG.gridSize; col++) {
    const shuffled = shuffleArray(pool);
    for (let row = 0; row < CONFIG.gridSize; row++) {
      state.grid[row][col] = shuffled[row];
    }
  }
}

function getActivePiecePool() {
  const colors = state.selectedMultiplier.allowWhite ? ['black', 'white'] : ['black'];
  return PIECE_TYPES.flatMap((base) =>
    colors.map((color) => ({
      id: `${color}_${base.type}`,
      color,
      icon: color === 'white' ? base.whiteIcon : base.blackIcon
    }))
  );
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderGrid() {
  state.grid.forEach((row, rIdx) =>
    row.forEach((piece, cIdx) => {
      const cell = getCellElement(cIdx, rIdx);
      cell.classList.remove('win-highlight', 'spinning', 'landed');
      setCellPiece(cell, piece);
    })
  );
}

function setCellPiece(cell, piece) {
  cell.innerHTML = `<span class="piece-${piece.color}">${piece.icon}</span>`;
}

function animateSpin() {
  const pool = getActivePiecePool();

  return new Promise((resolve) => {
    for (let col = 0; col < CONFIG.gridSize; col++) {
      for (let row = 0; row < CONFIG.gridSize; row++) {
        const cell = getCellElement(col, row);
        cell.classList.remove('win-highlight', 'landed');
        cell.classList.add('spinning');
      }

      const intervalId = setInterval(() => {
        for (let row = 0; row < CONFIG.gridSize; row++) {
          setCellPiece(getCellElement(col, row), pool[Math.floor(Math.random() * pool.length)]);
        }
      }, 75);

      setTimeout(() => {
        clearInterval(intervalId);
        for (let row = 0; row < CONFIG.gridSize; row++) {
          const cell = getCellElement(col, row);
          cell.classList.replace('spinning', 'landed');
          setCellPiece(cell, state.grid[row][col]);
        }
        if (col === CONFIG.gridSize - 1) resolve();
      }, CONFIG.spinDurationCols[col]);
    }
  });
}

function handleWin(winningRows) {
  const prize = Number((state.currentBet * state.selectedMultiplier.value).toFixed(2));
  state.balance = Number((state.balance + prize).toFixed(2));
  updateBalanceUI();

  winningRows.forEach((row) => {
    for (let col = 0; col < CONFIG.gridSize; col++) {
      getCellElement(col, row).classList.add('win-highlight');
    }
  });

  toggleEndGameUI(true, `♔ Шах і мат, ${state.playerName}! +${prize.toFixed(2)}$ (${state.selectedMultiplier.label})`, 'win');
}

function handleLoss() {
  if (state.currentBet > CONFIG.initialBalance * 0.5) {
    toggleEndGameUI(true, '💀 Дитячий мат! Ви програли чиюсь річну зарплату!', 'loss');
    return;
  }
  const msgIndex = Math.floor(Math.random() * messages.length);
  toggleEndGameUI(true, messages[msgIndex], 'loss');
}

export function setPlayerName(name) {
  state.playerName = name;
  DOM.userDisplay.textContent = name;
  resetBalanceState();
  DOM.betInput.value = CONFIG.defaultBet;
  updateBalanceUI();
  resetGame();
}
