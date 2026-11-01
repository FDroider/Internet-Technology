import { state, resetState, recordAnswer } from './state.js';
import { validateInput } from './utils.js';
import {
    renderCard,
    showValidationError,
    hideValidationError,
    showCardFeedback,
    showResultModal,
    populateDictionaryModal
} from './ui.js';

$(function () {
    function startSession() {
        resetState();
        $('#result-modal').fadeOut(180);
        renderCard(state);
    }

    function handleCheckTranslation() {
        if (state.isLocked) return;

        const rawInput = $('#translation-input').val();
        const validation = validateInput(rawInput);

        if (!validation.isValid) {
            showValidationError(validation.message);
            return;
        }

        hideValidationError();
        state.isLocked = true;

        const result = recordAnswer(validation.cleanedValue);
        showCardFeedback(result.isCorrect, result.expectedAnswer);

        setTimeout(() => {
            state.currentIndex += 1;

            if (state.currentIndex < state.words.length) {
                state.isLocked = false;
                renderCard(state);
            } else {
                $('#correct-count').text(state.correctCount);
                $('#wrong-count').text(state.wrongCount);
                showResultModal(state);
            }
        }, 950);
    }

    $('#flashcard').on('click', handleCheckTranslation);

    $('#translation-input').on('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            $('#flashcard').trigger('click');
        }
    });

    $('#translation-input').on('input', hideValidationError);

    $('#restart-btn').on('click', startSession);

    $('#open-dict-btn').on('click', () => {
        $('#dict-modal').fadeIn(200);
    });

    $('#close-dict-btn').on('click', () => {
        $('#dict-modal').fadeOut(200);
    });

    $('.modal-overlay').on('click', (event) => {
        if ($(event.target).is('#dict-modal')) {
            $('#dict-modal').fadeOut(200);
        }
    });

    populateDictionaryModal();
    startSession();
});