import { MULTIPLIERS, CONFIG } from './config.js';

export const state = {
  playerName: 'Гросмейстер',
  balance: CONFIG.initialBalance,
  currentBet: CONFIG.defaultBet,
  currentAttempt: 0,
  isGameOver: false,
  isSpinning: false,
  trollShown: false,
  selectedMultiplier: MULTIPLIERS[0],
  grid: []
};

export function resetGameState() {
  state.currentAttempt = 0;
  state.isGameOver = false;
  state.isSpinning = false;
}

export function resetBalanceState() {
  state.balance = CONFIG.initialBalance;
  state.currentBet = CONFIG.defaultBet;
  state.trollShown = false;
}