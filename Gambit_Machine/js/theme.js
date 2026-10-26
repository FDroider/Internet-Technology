import { DOM } from './dom.js';

const THEME_STORAGE_KEY = 'slot_theme';

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';

  applyTheme(savedTheme)

  DOM.themeToggle.addEventListener('click', () => {
    const currentTheme = DOM.html.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  });
}

function applyTheme(theme) {
    DOM.html.setAttribute('data-theme', theme);
    DOM.themeToggle.textContent = theme === 'dark' ? '♔' : '♚';
}