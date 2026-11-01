import { PROFICIENCY_LEVELS } from './data.js';

export function shuffleWords(array, count) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
}

export function validateInput(rawText) {
    const trimmed = rawText.trim();

    if (!trimmed) {
        return {
            isValid: false,
            message: 'Поле не може бути порожнім. Введіть переклад слова!'
        };
    }

    const textPattern = /^[а-щьюяіїєґА-ЩЬЮЯІЇЄҐ'’-]+(\s+[а-щьюяіїєґА-ЩЬЮЯІЇЄҐ'’-]+)*$/;
    if (!textPattern.test(trimmed)) {
        return {
            isValid: false,
            message: 'Дозволено вводити лише літери української абетки!'
        };
    }

    return {
        isValid: true,
        cleanedValue: trimmed.toLowerCase()
    };
}

export function calculateProficiency(correctCount, totalCount) {
    const rate = totalCount > 0 ? correctCount / totalCount : 0;
    const matchedLevel = PROFICIENCY_LEVELS.find(level => rate >= level.minRate) || PROFICIENCY_LEVELS[PROFICIENCY_LEVELS.length - 1];

    return {
        ...matchedLevel,
        accuracyPercent: Math.round(rate * 100)
    };
}