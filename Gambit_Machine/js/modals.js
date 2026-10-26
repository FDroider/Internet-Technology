import { DOM } from './dom.js';
import { state } from './gameState.js';

export function initModals(onNameSubmitted) {
  syncInertState();

  function confirmAge () {
    toggleModal(DOM.modalAge, false);
    openNameModal();
  };

  DOM.btnAge1.addEventListener('click', confirmAge);
  DOM.btnAge2.addEventListener('click', confirmAge);
  DOM.btnTrollClose.addEventListener('click', () => toggleModal(DOM.modalTroll, false));
  DOM.inputName.addEventListener('input', () => (DOM.nameError.textContent = ''));

  DOM.formName.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = DOM.inputName.value.trim();

    if (name.length < 2) {
      DOM.nameError.textContent = name ? 'Ім’я має містити щонайменше 2 символи!' : 'Будь ласка, введіть ім’я!';
      return;
    }

    toggleModal(DOM.modalName, false);
    onNameSubmitted(name);
    DOM.gamblingBtn.focus();
  });
}

function syncInertState() {
  const isBlocked = DOM.modalAge.classList.contains('active') || DOM.modalName.classList.contains('active');
  DOM.mainContainer.inert = isBlocked;
  DOM.mainContainer.setAttribute('aria-hidden', String(isBlocked));
}

export function toggleModal(modal, isOpen) {
  modal?.classList.toggle('active', isOpen);
  syncInertState();
}

export function openNameModal() {
  DOM.nameError.textContent = '';
  toggleModal(DOM.modalName, true);
  setTimeout(() => DOM.inputName.focus(), 50);
}

export function triggerRandomTrollPopup() {
  if (state.trollShown) return;
  state.trollShown = true;
  setTimeout(() => toggleModal(DOM.modalTroll, true), 350);
}