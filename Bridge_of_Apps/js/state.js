import { STORAGE_KEYS } from './data.js';

export const state = {
    currentLabId: null,
    history: []
};

export function initState() {
    try {
        const savedHistory = localStorage.getItem(STORAGE_KEYS.VISIT_HISTORY);
        if (savedHistory) {
            state.history = JSON.parse(savedHistory) || [];
        }
    } catch {
        state.history = [];
    }
}

export function recordLabTransition(labItem) {
    const entry = {
        labBadge: labItem.badgeText,
        labTitle: labItem.title,
        url: labItem.url,
        timestamp: new Date().toLocaleTimeString('uk-UA', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    };

    state.history.unshift(entry);
    if (state.history.length > 15) {
        state.history.pop();
    }

    try {
        localStorage.setItem(STORAGE_KEYS.VISIT_HISTORY, JSON.stringify(state.history));
    } catch { }
}
