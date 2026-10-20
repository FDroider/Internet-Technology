import { getRandomCard } from './cardsData.js';

const MAX_ROUNDS = 3;

const state = {
  userName: 'Студент',
  userScore: 0,
  computerScore: 0,
  currentRound: 0,
  maxRounds: MAX_ROUNDS,
  userLastCard: null,
  computerLastCard: null,
  isGameOver: false
};

export function getState() {
  return { ...state };
}

export function setUserName(name) {
  state.userName = name;
}

export function resetGame() {
  state.userScore = 0;
  state.computerScore = 0;
  state.currentRound = 0;
  state.userLastCard = null;
  state.computerLastCard = null;
  state.isGameOver = false;
}

export function playRound() {
  if (state.isGameOver) {
    return getState();
  }

  const userCard = getRandomCard();
  const computerCard = getRandomCard();

  state.currentRound += 1;
  state.userLastCard = userCard;
  state.computerLastCard = computerCard;
  state.userScore += userCard.value;
  state.computerScore += computerCard.value;

  if (state.currentRound >= state.maxRounds) {
    state.isGameOver = true;
  }

  return getState();
}

export function getWinnerMessage() {
  if (!state.isGameOver) return '';

  if (state.userScore > state.computerScore) {
    return `🎉 Перемога! ${state.userName} додепнув лабу з рахунком ${state.userScore}:${state.computerScore}!`;
  }
  if (state.userScore < state.computerScore) {
    return `💀 Поразка! Викладач переміг з рахунком ${state.computerScore}:${state.userScore}. Перездача близько!`;
  }
  return `🤝 Нічия ${state.userScore}:${state.computerScore}! Доведеться йти на перездачу (ще один додеп).`;
}