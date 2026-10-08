const style = document.createElement('style');
style.textContent = `
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

body {
    min-height: 100vh;
    background: #080711;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    overflow-x: hidden;
}

.app-frame {
    width: 100%;
    max-width: 520px;
    aspect-ratio: 1 / 1.08;
    background: #0b0c16;
    border-radius: 12px;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-shadow: 0 0 25px rgba(50, 205, 50, 0.25), 0 0 15px rgba(30, 144, 255, 0.3);
    border: 3px solid transparent;
    background-clip: padding-box;
}

.app-frame::before {
    content: '';
    position: absolute;
    top: -3px; right: -3px; bottom: -3px; left: -3px;
    background: linear-gradient(135deg, #1d4ed8, #22c55e, #a855f7);
    border-radius: 14px;
    z-index: -1;
}

.input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.question-input {
    width: 90%;
    max-width: 440px;
    padding: 12px 24px;
    border-radius: 9999px;
    border: 2px solid transparent;
    background: #eeddff;
    color: #1a1a2e;
    font-size: clamp(14px, 3.5vw, 17px);
    text-align: center;
    outline: none;
    transition: all 0.25s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.question-input:focus {
    background: #ffffff;
    border-color: #c084fc;
    box-shadow: 0 0 12px rgba(192, 132, 252, 0.6);
}

.error-hint {
    color: #ff6b81;
    font-size: 13px;
    margin-top: 6px;
    min-height: 18px;
    font-weight: 500;
    text-align: center;
    transition: opacity 0.2s ease;
}

.ball-container {
    position: relative;
    width: min(78vw, 360px);
    height: min(78vw, 360px);
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    transition: transform 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ball-container:hover {
    transform: scale(1.02);
}

.ball-glow {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.45) 50%, rgba(34, 197, 94, 0.25) 75%, transparent 100%);
    filter: blur(10px);
    z-index: 1;
}

.ball-sphere {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 50%, #4a2162 0%, #170d28 65%, #05040a 100%);
    border: 4px solid rgba(255, 255, 255, 0.15);
    overflow: hidden;
    z-index: 2;
    box-shadow: inset 0 0 35px rgba(0, 0, 0, 0.9), 0 15px 35px rgba(0, 0, 0, 0.8);
}

.nebula {
    position: absolute;
    inset: 0;
    background: 
    radial-gradient(ellipse at 45% 45%, rgba(236, 72, 153, 0.55), transparent 60%),
    radial-gradient(ellipse at 60% 60%, rgba(59, 130, 246, 0.5), transparent 60%),
    radial-gradient(ellipse at 35% 65%, rgba(245, 158, 11, 0.4), transparent 50%),
    radial-gradient(ellipse at 50% 30%, rgba(168, 85, 247, 0.6), transparent 60%);
    filter: blur(14px);
    opacity: 0.95;
    transition: transform 1.2s ease, opacity 0.5s ease;
}

.ball-sphere::after {
    content: '';
    position: absolute;
    top: 6%;
    left: 14%;
    width: 45%;
    height: 30%;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 75%);
    transform: rotate(-30deg);
    pointer-events: none;
}

.ball-sphere::before {
    content: '';
    position: absolute;
    bottom: 8%;
    right: 12%;
    width: 35%;
    height: 20%;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 75%);
    transform: rotate(30deg);
    pointer-events: none;
    z-index: 4;
}

.ball-answer {
    position: relative;
    z-index: 5;
    font-size: clamp(20px, 5.5vw, 32px);
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 0 10px #ffffff, 0 0 20px #c084fc, 0 0 35px #a855f7;
    text-align: center;
    padding: 0 20px;
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.ball-answer.hidden {
    opacity: 0;
    transform: scale(0.6);
}

.hint-text {
    color: #94a3b8;
    font-size: 13px;
    letter-spacing: 0.5px;
    margin-top: 10px;
    text-align: center;
}

@keyframes shake {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    15% { transform: translate(-8px, -6px) rotate(-3deg); }
    30% { transform: translate(7px, 6px) rotate(3deg); }
    45% { transform: translate(-6px, 5px) rotate(-2deg); }
    60% { transform: translate(6px, -4px) rotate(2deg); }
    75% { transform: translate(-4px, -2px) rotate(-1deg); }
    90% { transform: translate(3px, 3px) rotate(1deg); }
}

.shaking {
    animation: shake 0.6s ease-in-out infinite;
}

@keyframes shake-input {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
}

.input-error {
    animation: shake-input 0.35s ease;
    border-color: #ef4444 !important;
}
`;  
document.head.appendChild(style);