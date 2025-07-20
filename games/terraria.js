function initDownload(type) {
    // Показываем секцию загрузки
    const downloadSection = document.getElementById('download-section');
    downloadSection.style.display = 'block';
    downloadSection.scrollIntoView({ behavior: 'smooth' });

    // Устанавливаем тип загрузки
    const downloadTypeText = document.getElementById('download-type-text');
    downloadTypeText.textContent = type === 'mod' ? 'МОД APK 1.4.4.9' : 'Оригинал APK 1.4.4.9';

    // Запускаем таймер
    let timeLeft = 8;
    const timerCount = document.querySelector('.timer-count');
    const timerCircle = document.querySelector('.timer-foreground');
    const downloadBtn = document.querySelector('.download-button-container');
    const circumference = 2 * Math.PI * 45;
    
    timerCircle.style.strokeDasharray = circumference;
    timerCircle.style.strokeDashoffset = 0;

    const timer = setInterval(() => {
        timeLeft--;
        timerCount.textContent = timeLeft;
        
        // Обновляем прогресс круга
        const offset = circumference * timeLeft / 8;
        timerCircle.style.strokeDashoffset = offset;

        if (timeLeft <= 0) {
            clearInterval(timer);
            downloadBtn.style.display = 'block';
            timerCount.parentElement.style.display = 'none';
        }
    }, 1000);
}

// Добавляем анимацию для сообщений о проверке
window.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.download-message p');
    messages.forEach((msg, index) => {
        setTimeout(() => {
            msg.style.opacity = '1';
        }, index * 2000);
    });
});
