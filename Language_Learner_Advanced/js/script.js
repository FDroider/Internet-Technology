import { state, resetState, recordAnswer } from './state.js';
import { validateInput } from './utils.js';
import {
    updateDifficultyUI,
    renderCard,
    showValidationError,
    hideValidationError,
    showCardFeedback,
    showResultModal,
    populateDictionaryModal
} from './ui.js';

$(function () {
    let feedbackTimer = null;

    function startSession(selectedDifficulty = state.difficulty) {
        if (feedbackTimer) {
            clearTimeout(feedbackTimer);
            feedbackTimer = null;
        }
        resetState(selectedDifficulty);
        updateDifficultyUI(state.difficulty);
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

        feedbackTimer = setTimeout(() => {
            feedbackTimer = null;
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

    $('input[name="difficulty"]').on('change', function () {
        const newDifficulty = $(this).val();
        startSession(newDifficulty);
    });

    $('#flashcard').on('click', handleCheckTranslation);

    $('#translation-input').on('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            $('#flashcard').trigger('click');
        }
    });

    $('#translation-input').on('input', hideValidationError);

    $('#restart-btn').on('click', () => {
        startSession(state.difficulty);
    });

    $('#show-result-btn').on('click', () => {
        if (feedbackTimer) {
            clearTimeout(feedbackTimer);
            feedbackTimer = null;
        }
        state.isLocked = false;
        hideValidationError();
        $('#correct-count').text(state.correctCount);
        $('#wrong-count').text(state.wrongCount);
        showResultModal(state);
    });

    $('#open-dict-btn').on('click', () => {
        populateDictionaryModal(state.difficulty);
        $('#dict-modal').fadeIn(200);
    });

    $('.dict-filter-btn').on('click', function () {
        const filterLevel = $(this).attr('data-filter');
        populateDictionaryModal(filterLevel);
    });

    $('#close-dict-btn').on('click', () => {
        $('#dict-modal').fadeOut(200);
    });

    $('.modal-overlay').on('click', (event) => {
        if ($(event.target).is('#dict-modal')) {
            $('#dict-modal').fadeOut(200);
        }
    });

    populateDictionaryModal('all');
    startSession('beginner');
});
