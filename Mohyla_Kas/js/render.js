import { dom } from './dom.js';
import { getWinnerMessage } from './gameState.js';

export function renderGame(state) {
  dom.userNameDisplay.textContent = state.userName;
  dom.userScore.textContent = state.userScore;
  dom.computerScore.textContent = state.computerScore;
  dom.roundIndicator.textContent = `Спроба ${state.currentRound} з ${state.maxRounds}`;

  if (state.userLastCard) {
    dom.userCardSlot.innerHTML = createCardHTML(state.userLastCard);
  } else {
    dom.userCardSlot.innerHTML = createPlaceholderHTML('🃏', 'Очікування депу...');
  }

  if (state.computerLastCard) {
    dom.computerCardSlot.innerHTML = createCardHTML(state.computerLastCard);
  } else {
    dom.computerCardSlot.innerHTML = createPlaceholderHTML('🤖', 'Очікування депу...');
  }

  dom.gambleBtn.disabled = state.isGameOver;

  if (state.isGameOver) {
    dom.resultBanner.textContent = getWinnerMessage();
    dom.resultBanner.classList.remove('hidden');
  } else {
    dom.resultBanner.textContent = '';
    dom.resultBanner.classList.add('hidden');
  }
}

function createCardHTML(card) { 
  const backgroundMediaHTML = card.image_path ? `
        <img src="${card.image_path}" class="card_bg-img"
        onerror="this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden');">
        <span class="card_emoji hidden" aria-hidden="true">${card.emoji}</span>
        ` : `<span class="card_emoji" aria-hidden="true">${card.emoji}</span>`
  return `
    <article class="card">
      <div class="card_bg">
        ${backgroundMediaHTML}
      </div>

      <div class="card_corner">
        <span class="card_rank">(${card.rankLabel})</span>
        <span class="card_points">+${card.value} очок</span>
      </div>

      <div class="card_body">
        <h3 class="card_title">${card.title}</h3>
      </div>

      <div class="card_corner card_corner-bottom">
        <span class="card_rank">(${card.rankLabel})</span>
        <span class="card_points">+${card.value} очок</span>
      </div>
    </article>
  `;
}

function createPlaceholderHTML(icon, text) {
  return `
    <div class="card card-placeholder">
      <span class="card_placeholder-icon">${icon}</span>
      <p class="card_placeholder-text">${text}</p>
    </div>
  `;
}