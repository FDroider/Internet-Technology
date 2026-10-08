document.addEventListener("DOMContentLoaded", () => {
    const appFrame = document.createElement('div');
    appFrame.className = 'app-frame';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';

    const input = document.createElement('input');
    input.className = 'question-input';
    input.type = 'text';
    input.placeholder = 'Поставте своє запитання...';
    input.value = 'Чи буде завтра сонячно?'; // Приклад із зображення

    const errorHint = document.createElement('div');
    errorHint.className = 'error-hint';

    inputWrapper.append(input, errorHint);

    const ballContainer = document.createElement('div');
    ballContainer.className = 'ball-container';

    const ballGlow = document.createElement('div');
    ballGlow.className = 'ball-glow';

    const ballSphere = document.createElement('div');
    ballSphere.className = 'ball-sphere';

    const nebula = document.createElement('div');
    nebula.className = 'nebula';

    const answer = document.createElement('div');
    answer.className = 'ball-answer';

    ballSphere.appendChild(nebula);
    ballContainer.append(ballGlow, ballSphere, answer);

    const hintText = document.createElement('p');
    hintText.className = 'hint-text';
    hintText.textContent = 'Натисніть Enter або клацніть на кулю, щоб дізнатися долю';

    appFrame.append(inputWrapper, ballContainer, hintText);
    document.body.appendChild(appFrame);

    const answers = [
        'Так', 'Ні', 'Безумовно', 'Запитайте пізніше', 
        'Наразі не можу передбачити', 'Найімовірніше', 'Сумнівно', 'Дуже сумнівно', 
        'Перспективи хороші', 'Ознаки вказують на "так"', 'Без сумніву'
    ];

    let isPredicting = false;

    function askMagicBall() {
        if (isPredicting) return;

        const validation = validateInput(input.value);
        if (!validation.isValid) {
            errorHint.textContent = validation.message;
            input.classList.add('input-error');
            setTimeout(() => input.classList.remove('input-error'), 400);
            return;
        }
        errorHint.textContent = '';
        isPredicting = true;    

        answer.classList.add('hidden');
        ballContainer.classList.add('shaking');

        nebula.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg) scale(1.15)`;

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * answers.length);
            answer.textContent = answers[randomIndex];

            ballContainer.classList.remove('shaking');
            answer.classList.remove('hidden');
            isPredicting = false;
        }, 1000);
    }

    input.addEventListener('input', () => {
        if (errorHint.textContent) errorHint.textContent = '';
    });

    ballContainer.addEventListener('click', askMagicBall);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') askMagicBall();
    });
    askMagicBall();
})

function validateInput(text) {
    const trimmedText = text.trim();
    if (!trimmedText) {
        return { isValid: false, message: 'Будь ласка, введіть запитання!' };
    }
    if (trimmedText.length < 3) {
        return { isValid: false, message: 'Запитання занадто коротке (мін. 3 символи).' };
    }
    if (!trimmedText.endsWith('?')) {
        return { isValid: false, message: 'Запитання має закінчуватися знаком "?"' };
    }
    return { isValid: true, message: '' };
}
