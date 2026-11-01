import { ARABIC_DICTIONARY } from './data.js';
import { calculateProficiency } from './utils.js';

export function renderCard(state) {
    const wordObj = state.words[state.currentIndex];
    const total = state.words.length;
    const stepNumber = state.currentIndex + 1;
    const progressPercent = (stepNumber / total) * 100;

    $('#current-step').text(stepNumber);
    $('#total-steps').text(total);
    $('#correct-count').text(state.correctCount);
    $('#wrong-count').text(state.wrongCount);
    $('#progress-bar').css('width', `${progressPercent}%`);

    $('#flashcard').removeClass('card-correct card-wrong');
    $('#card-feedback').text('').css('color', '');

    $('#arabic-word').hide().text(wordObj.arabic).fadeIn(220);
    $('#word-transcription').text(`[${wordObj.transcription}]`);

    $('#translation-input').val('').prop('disabled', false).removeClass('input-error').trigger('focus');

    hideValidationError();
}

export function showValidationError(message) {
    $('#translation-input').addClass('input-error');
    $('#validation-error').text(message).stop(true, true).fadeIn(180);
}

export function hideValidationError() {
    $('#translation-input').removeClass('input-error');
    $('#validation-error').stop(true, true).fadeOut(150);
}

export function showCardFeedback(isCorrect, expectedAnswer) {
    const $card = $('#flashcard');
    const $feedback = $('#card-feedback');

    $('#translation-input').prop('disabled', true);

    if (isCorrect) {
        $card.addClass('card-correct');
        $feedback.text('Вірно!').css('color', 'var(--color-success)');
    } else {
        $card.addClass('card-wrong');
        $feedback
            .text(`Невірно! Правильна відповідь: ${expectedAnswer}`)
            .css('color', 'var(--color-error)');
    }
}

export function showResultModal(state) {
    const total = state.words.length;
    const levelInfo = calculateProficiency(state.correctCount, total);

    $('#level-badge').text(levelInfo.code);
    $('#level-title').text(levelInfo.title);
    $('#level-desc').text(levelInfo.description);

    $('#modal-correct').text(state.correctCount);
    $('#modal-wrong').text(state.wrongCount);
    $('#modal-accuracy').text(`${levelInfo.accuracyPercent}%`);

    const $tbody = $('#history-body').empty();

    $.each(state.history, (_, item) => {
        const statusClass = item.isCorrect ? 'text-ok' : 'text-fail';
        const $row = $('<tr>').append(
            $('<td>').text(`${item.arabic} [${item.transcription}]`),
            $('<td>').addClass(statusClass).text(item.userAnswer),
            $('<td>').text(item.expectedAnswer)
        );
        $tbody.append($row);
    });

    $('#result-modal').fadeIn(250);
}

export function populateDictionaryModal() {
    const $tbody = $('#dict-body').empty();

    $.each(ARABIC_DICTIONARY, (_, word) => {
        const $row = $('<tr>').append(
            $('<td>').attr('dir', 'rtl').text(word.arabic),
            $('<td>').text(`[${word.transcription}]`),
            $('<td>').text(word.translations.join(', '))
        );
        $tbody.append($row);
    });
}