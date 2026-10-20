import { dom } from './dom.js';

function validateName(rawValue) {
  const trimmed = rawValue.trim();

  if (!trimmed) {
    return { valid: false, message: "Ім'я не може бути порожнім або складатися лише з пробілів!" };
  }
  if (trimmed.length < 2) {
    return { valid: false, message: "Ім'я має містити щонайменше 2 символи." };
  }
  if (trimmed.length > 20) {
    return { valid: false, message: "Ім'я занадто довге (максимум 20 символів)." };
  }
  const validPattern = /^[a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9_\-\s']+$/;
  if (!validPattern.test(trimmed)) {
    return { valid: false, message: "Дозволені лише літери, цифри, пробіл та дефіс." };
  }

  return { valid: true, value: trimmed };
}

export function showError(message) {
  dom.nameError.textContent = message;
  dom.nameError.classList.remove('hidden');
  dom.nameInput.classList.add('form-group_input-invalid');
}

export function clearError() {
  dom.nameError.textContent = '';
  dom.nameError.classList.add('hidden');
  dom.nameInput.classList.remove('form-group_input-invalid');
}

export function openNameModal(currentName = '') {
  clearError();
  dom.nameInput.value = currentName;
  dom.nameModal.classList.remove('hidden');
  setTimeout(() => dom.nameInput.focus(), 50);
}

export function closeNameModal() {
  dom.nameModal.classList.add('hidden');
}

export function initModal(onNameConfirmed) {
  dom.nameInput.addEventListener('input', clearError);

  dom.nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const validation = validateName(dom.nameInput.value);

    if (!validation.valid) {
      showError(validation.message);
      return;
    }

    clearError();
    closeNameModal();
    onNameConfirmed(validation.value);
  });
}