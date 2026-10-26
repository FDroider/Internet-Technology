export const DOM = {
  html: document.documentElement,
  mainContainer: document.querySelector('.casino-container'),

  themeToggle: document.getElementById('theme-toggle'),

  userDisplay: document.getElementById('user-display'),
  balanceDisplay: document.getElementById('balance-display'),
  attemptsDisplay: document.getElementById('attempts-display'),
  gamblingBtn: document.getElementById('gambling-btn'),
  restartBtn: document.getElementById('restart-btn'),
  changeNameBtn: document.getElementById('change-name-btn'),
  gameStatus: document.getElementById('game-status'),

  betInput: document.getElementById('bet-input'),
  betFeedback: document.getElementById('bet-feedback'),
  multiplierGroup: document.getElementById('multiplier-group'),
  oddsDisplay: document.getElementById('odds-display'),
  payoutDisplay: document.getElementById('payout-display'),

  modalAge: document.getElementById('modal-age'),
  btnAge1: document.getElementById('age-yes-btn-1'),
  btnAge2: document.getElementById('age-yes-btn-2'),

  modalName: document.getElementById('modal-name'),
  formName: document.getElementById('name-form'),
  inputName: document.getElementById('player-name-input'),
  nameError: document.getElementById('name-error'),

  modalTroll: document.getElementById('modal-troll'),
  btnTrollClose: document.getElementById('troll-close-btn'),
};

export function getCellElement(col, row) {
  return document.querySelector(`.reel-column[data-col="${col}"] .slot-cell[data-row="${row}"]`);
}

export function getMultiplierButtons() {
  if (!DOM.multiplierGroup) return [];
  return DOM.multiplierGroup.querySelectorAll('.btn-multiplier');
}