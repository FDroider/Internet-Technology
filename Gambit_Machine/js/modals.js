import { DOM } from './dom.js';
import { state } from './gameState.js';

export function openModal(modalElement) {
  if (modalElement) modalElement.classList.add('active');
}

export function closeModal(modalElement) {
  if (modalElement) modalElement.classList.remove('active');
}

export function openNameModal() {
  openModal(DOM.modalName);
  setTimeout(() => DOM.inputName.focus(), 50);
}

export function triggerRandomTrollPopup() {
  if (state.trollShown) return;

  state.trollShown = true;
  setTimeout(() => {
    openModal(DOM.modalTroll);
  }, 350);
}

export function initModals(onNameSubmitted) {
  const handleAgeConfirm = () => {
    closeModal(DOM.modalAge);
    openNameModal();
  };

  DOM.btnAge1.addEventListener('click', handleAgeConfirm);
  DOM.btnAge2.addEventListener('click', handleAgeConfirm);

  DOM.formName.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = DOM.inputName.value.trim();

    if (!name) {
      DOM.nameError.textContent = "Будь ласка, введіть ім’я!";
      return;
    }

    if (name.length < 2) {
      DOM.nameError.textContent = "Ім’я має містити щонайменше 2 символи!";
      return;
    }

    DOM.nameError.textContent = "";
    closeModal(DOM.modalName);

    if (typeof onNameSubmitted === 'function') {
      onNameSubmitted(name);
    }
  });

  DOM.btnTrollClose.addEventListener('click', () => {
    closeModal(DOM.modalTroll);
  });
}