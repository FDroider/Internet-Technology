export const state = {
  playerName: 'User',
  currentAttempt: 0,
  isGameOver: false,
  trollShown: false,
  grid: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
};

export function resetGameState() {
  state.currentAttempt = 0;
  state.isGameOver = false;
  state.grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
}