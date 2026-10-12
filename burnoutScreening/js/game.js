export function initGame() {
    let userName = "";
    let userWins = 0;
    let compWins = 0;
    const TARGET_WINS = 3;

    const nameModal = document.getElementById("nameModal");
    const nameInput = document.getElementById("nameInput");
    const nameError = document.getElementById("nameError");
    const startBtn = document.getElementById("startBtn");

    const userNameLabel = document.getElementById("userNameLabel");
    const userNumber = document.getElementById("userNumber");
    const compNumber = document.getElementById("compNumber");
    const userScore = document.getElementById("userScore");
    const compScore = document.getElementById("compScore");
    const statusMessage = document.getElementById("statusMessage");

    const userCard = document.getElementById("userCard");
    const compCard = document.getElementById("compCard");
    const generateBtn = document.getElementById("generateBtn");
    const restartBtn = document.getElementById("restartBtn");
    const resetBtn = document.getElementById("resetBtn");

    function validateName() {
        const rawName = nameInput.value.trim();
        if (!rawName) {
            nameError.textContent = "Будь ласка, введіть ім'я!";
            return false;
        }
        if (rawName.length < 2) {
            nameError.textContent = "Ім'я має містити щонайменше 2 символи.";
            return false;
        }
        const pattern = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s_-]+$/;
        if (!pattern.test(rawName)) {
            nameError.textContent = "Ім'я містить неприпустимі спецсимволи.";
            return false;
        }
        return rawName;
    }

    startBtn.addEventListener("click", () => {
        const validName = validateName();
        if (validName) {
            userName = validName;
            userNameLabel.textContent = userName;
            nameModal.style.display = "none";
            statusMessage.textContent = `Резюме кандидата ${userName} завантажено. Тисніть кнопку нижче!`;
        }
    });

    nameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") startBtn.click();
    });

    generateBtn.addEventListener("click", () => {
        const uNum = Math.floor(Math.random() * 100) + 1;
        const cNum = Math.floor(Math.random() * 100) + 1;

        userNumber.textContent = uNum;
        compNumber.textContent = cNum;

        userCard.classList.remove("active-winner");
        compCard.classList.remove("active-winner");

        if (uNum > cNum) {
            userWins++;
            userScore.textContent = userWins;
            userCard.classList.add("active-winner");
            statusMessage.textContent = `Скринінг пройдено! Ваші компетенції перевершили вимоги бота (${uNum} > ${cNum}).`;
        } else if (cNum > uNum) {
            compWins++;
            compScore.textContent = compWins;
            compCard.classList.add("active-winner");
            statusMessage.textContent = `ШІ-Рекрутер знайшов невідповідність за ключовими словами (${cNum} > ${uNum}).`;
        } else {
            statusMessage.textContent = `Статус "На розгляді": бали рівні (${uNum} = ${cNum}). Етап не зараховано.`;
        }

        if (userWins === TARGET_WINS || compWins === TARGET_WINS) {
            generateBtn.style.display = "none";
            restartBtn.style.display = "block";

            if (userWins === TARGET_WINS) {
                statusMessage.textContent = `🎉 ОФЕР ВАШ! Вітаємо, ${userName}! Усі 3 етапи скринінгу подолано! (${userWins}:${compWins}).`;
                statusMessage.style.color = "#059669";
            } else {
                statusMessage.textContent = `🤖 "На жаль, ми обрали іншого кандидата". ШІ-Рекрутер завершив відбір (${compWins}:${userWins}).`;
                statusMessage.style.color = "#dc2626";
            }
        }
    });

    function resetScoreAndBoard() {
        userWins = 0;
        compWins = 0;
        userScore.textContent = "0";
        compScore.textContent = "0";
        userNumber.textContent = "?";
        compNumber.textContent = "?";

        userCard.classList.remove("active-winner");
        compCard.classList.remove("active-winner");

        restartBtn.style.display = "none";
        generateBtn.style.display = "block";
    }

    restartBtn.addEventListener("click", resetScoreAndBoard);

    resetBtn.addEventListener("click", () => {
        resetScoreAndBoard();
        generateBtn.disabled = false;

        nameError.textContent = "";
        nameInput.value = "";

        nameModal.style.display = "flex";
        nameInput.focus();
    });
}