import { ARABIC_DICTIONARY, DIFFICULTY_LEVELS } from './data.js';
import { calculateProficiency } from './utils.js';

const LEVEL_CLASSES = 'level-beginner level-intermediate level-advanced';

export function updateDifficultyUI(difficulty) {
    const levelConfig = DIFFICULTY_LEVELS[difficulty] || DIFFICULTY_LEVELS.beginner;
    const levelClass = `level-${levelConfig.id}`;

    $('.difficulty-option').removeClass('active');
    const $activeOption = $(`.difficulty-option[data-level="${levelConfig.id}"]`);
    $activeOption.addClass('active');
    $activeOption.find('input[type="radio"]').prop('checked', true);

    $('#difficulty-desc').text(levelConfig.description);

    $('#card-level-tag')
        .removeClass(LEVEL_CLASSES)
        .addClass(levelClass)
        .text(levelConfig.badgeText);

    $('#progress-bar')
        .removeClass(LEVEL_CLASSES)
        .addClass(levelClass);
}

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
    const diffConfig = DIFFICULTY_LEVELS[state.difficulty] || DIFFICULTY_LEVELS.beginner;

    $('#modal-difficulty-pill')
        .removeClass(LEVEL_CLASSES)
        .addClass(`level-${diffConfig.id}`)
        .text(`Рівень складності: ${diffConfig.label}`);

    $('#level-badge').text(levelInfo.code);
    $('#level-title').text(levelInfo.title);
    $('#level-desc').text(levelInfo.description);

    $('#modal-correct').text(state.correctCount);
    $('#modal-wrong').text(state.wrongCount);
    $('#modal-accuracy').text(`${levelInfo.accuracyPercent}%`);

    const $tbody = $('#history-body').empty();

    if (state.history.length === 0) {
        const $emptyRow = $('<tr>').append(
            $('<td>')
                .attr('colspan', 3)
                .addClass('history-empty')
                .text('Жодної відповіді ще не надано (тест завершено достроково).')
        );
        $tbody.append($emptyRow);
    } else {
        $.each(state.history, (_, item) => {
            const statusClass = item.isCorrect ? 'text-ok' : 'text-fail';
            const $row = $('<tr>').append(
                $('<td>').text(`${item.arabic} [${item.transcription}]`),
                $('<td>').addClass(statusClass).text(item.userAnswer),
                $('<td>').text(item.expectedAnswer)
            );
            $tbody.append($row);
        });
    }

    $('#result-modal').fadeIn(250);
}

export function populateDictionaryModal(filterLevel = 'all') {
    $('.dict-filter-btn').removeClass('active');
    $(`.dict-filter-btn[data-filter="${filterLevel}"]`).addClass('active');

    const filteredWords = filterLevel === 'all'
        ? ARABIC_DICTIONARY
        : ARABIC_DICTIONARY.filter(word => word.difficulty === filterLevel);

    const $tbody = $('#dict-body').empty();

    $.each(filteredWords, (_, word) => {
        const diffConfig = DIFFICULTY_LEVELS[word.difficulty] || DIFFICULTY_LEVELS.beginner;
        const $badge = $('<span>')
            .addClass(`dict-level-badge level-${diffConfig.id}`)
            .text(diffConfig.label);

        const $row = $('<tr>').append(
            $('<td>').attr('dir', 'rtl').addClass('dict-arabic-cell').text(word.arabic),
            $('<td>').text(`[${word.transcription}]`),
            $('<td>').text(word.translations.join(', ')),
            $('<td>').append($badge)
        );
        $tbody.append($row);
    });
}
