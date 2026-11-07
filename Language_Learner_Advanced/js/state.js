import { ARABIC_DICTIONARY, WORDS_PER_SESSION } from './data.js';
import { getWordsByDifficulty } from './utils.js';

export const state = {
    difficulty: 'beginner',
    words: [],
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    isLocked: false,
    history: []
};

export function setDifficulty(level) {
    state.difficulty = level;
}

export function resetState(difficulty = state.difficulty) {
    state.difficulty = difficulty;
    state.words = getWordsByDifficulty(ARABIC_DICTIONARY, state.difficulty, WORDS_PER_SESSION);
    state.currentIndex = 0;
    state.correctCount = 0;
    state.wrongCount = 0;
    state.isLocked = false;
    state.history = [];
}

export function getCurrentWord() {
    return state.words[state.currentIndex];
}

export function recordAnswer(userTranslation) {
    const currentWord = getCurrentWord();
    const isCorrect = currentWord.translations.includes(userTranslation);

    if (isCorrect) {
        state.correctCount += 1;
    } else {
        state.wrongCount += 1;
    }

    state.history.push({
        arabic: currentWord.arabic,
        transcription: currentWord.transcription,
        userAnswer: userTranslation,
        expectedAnswer: currentWord.translations.join(', '),
        isCorrect
    });

    return {
        isCorrect,
        expectedAnswer: currentWord.translations[0]
    };
}
