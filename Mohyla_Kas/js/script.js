import { dom } from './dom.js';
import { initTheme } from './theme.js';
import { initModal, openNameModal } from './modal.js';
import { renderGame } from './render.js';
import { getState, setUserName, resetGame, playRound } from './gameState.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    initModal((validatedName) => {
        setUserName(validatedName);
        resetGame();
        renderGame(getState());
    });

    dom.gambleBtn.addEventListener('click', () => {
        const updatedState = playRound();
        renderGame(updatedState);
    });

    dom.playAgainBtn.addEventListener('click', () => {
        resetGame();
        renderGame(getState());
    });

    dom.changeNameBtn.addEventListener('click', () => {
        const currentName = getState().userName;
        resetGame();
        renderGame(getState());
        openNameModal(currentName);
    });

    renderGame(getState());
    openNameModal('');
});