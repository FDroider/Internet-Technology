import { DOM } from './dom.js';
import { initTheme } from './theme.js';
import { initModals, openNameModal } from './modals.js';
import { initGame, setPlayerName, resetGame } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initGame();

  initModals((name) => {
    setPlayerName(name);
  });

  DOM.changeNameBtn.addEventListener('click', () => {
    resetGame();
    openNameModal();
  });
});