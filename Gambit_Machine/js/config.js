export const CONFIG = {
  maxAttempts: 3,
  gridSize: 3,
  highBetThreshold: 10000,
  initialBalance: 1000,
  defaultBet: 100,
  trollChance: 0.4,
  spinDurationCols: [450, 750, 1050],
  baseBetForFullOdds: 100,
  betPenaltyFactor: 0.22,
  minPenaltyMultiplier: 0.20,
  winMode: 'samePieceAndColor'
};

export const MULTIPLIERS = [
  {
    id: 'coef-108',
    value: 1.08,
    label: 'x1.08',
    winChance: 0.60,
    allowWhite: false,
    modeText: 'Лише чорні фігури (♚)'
  },
  {
    id: 'coef-125',
    value: 1.25,
    label: 'x1.25',
    winChance: 0.45,
    allowWhite: false,
    modeText: 'Лише чорні фігури (♚)'
  },
  {
    id: 'coef-150',
    value: 1.5,
    label: 'x1.50',
    winChance: 0.30,
    allowWhite: true,
    modeText: 'Чорні та білі фігури (♚ + ♔)'
  },
  {
    id: 'coef-200',
    value: 2.0,
    label: 'x2.0',
    winChance: 0.15,
    allowWhite: true,
    modeText: 'Чорні та білі фігури (♚ + ♔)'
  }
];

export const PIECE_TYPES = [
  { type: 'king',   name: 'Король', whiteIcon: '♔', blackIcon: '♚' },
  { type: 'queen',  name: 'Ферзь',  whiteIcon: '♕', blackIcon: '♛' },
  { type: 'rook',   name: 'Тура',   whiteIcon: '♖', blackIcon: '♜' },
  { type: 'bishop', name: 'Слон',   whiteIcon: '♗', blackIcon: '♝' },
  { type: 'knight', name: 'Кінь',   whiteIcon: '♘', blackIcon: '♞' }
];