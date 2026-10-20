export const CARDS_DECK = [
  {
    id: 'jack',
    rankLabel: 'Валет',
    title: 'Спортивне програмування',
    value: 2,
    emoji: '🏆',
    image_path: "./images/jack.jpg"
  },
  {
    id: 'queen',
    rankLabel: 'Дама',
    title: 'Моральний розпад',
    value: 3,
    emoji: '🫠',
    image_path: "./images/queen.jpg"
  },
  {
    id: 'king',
    rankLabel: 'Король',
    title: 'Манга манга',
    value: 4,
    emoji: '🥭',
    image_path: "./images/king.jpg"
  },
  {
    id: 'six',
    rankLabel: '6',
    title: 'Push me',
    value: 6,
    emoji: '🪚',
    image_path: "./images/six.jpg"
  },
  {
    id: 'seven',
    rankLabel: '7',
    title: 'Javasquirt',
    value: 7,
    emoji: '💦',
    image_path: "./images/seven.jpg"
  },
  {
    id: 'eight',
    rankLabel: '8',
    title: 'Автомат з пивом',
    value: 8,
    emoji: '🍺',
    image_path: "./images/eight.jpg"
  },
  {
    id: 'nine',
    rankLabel: '9',
    title: 'ЛінЕкс',
    value: 9,
    emoji: '🐧',
    image_path: "./images/nine.jpg"
  },
  {
    id: 'ten',
    rankLabel: '10',
    title: 'Ультимативні звіти',
    value: 10,
    emoji: '📑',
    image_path: "./images/ten.png"
  },
  {
    id: 'ace',
    rankLabel: 'Туз',
    title: 'ML/Нейромережі',
    value: 11,
    emoji: '🧠',
    image_path: "./images/ace.jpg"
  }
];

export function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * CARDS_DECK.length);
  return CARDS_DECK[randomIndex];
}