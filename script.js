document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const cards = document.querySelectorAll('.card');
    const cardsPerLoad = 3;
    let currentIndex = cardsPerLoad;
    let isExpanded = false;

    // Скрываем все карточки кроме первых cardsPerLoad
    cards.forEach((card, index) => {
        if (index >= cardsPerLoad) {
            card.style.display = 'none';
            card.classList.add('hidden');
        }
    });

    loadMoreBtn.addEventListener('click', function() {
        if (!isExpanded) {
            // Показываем все оставшиеся карточки
            for (let i = currentIndex; i < cards.length; i++) {
                cards[i].style.display = 'block';
                cards[i].classList.remove('hidden');
                cards[i].classList.add('show');
            }
            loadMoreBtn.textContent = 'Скрыть';
            isExpanded = true;
        } else {
            // Скрываем все карточки кроме первых cardsPerLoad
            for (let i = cardsPerLoad; i < cards.length; i++) {
                cards[i].classList.remove('show');
                cards[i].classList.add('hidden');
                setTimeout(() => {
                    cards[i].style.display = 'none';
                }, 500); // Задержка для анимации
            }
            loadMoreBtn.textContent = 'Показать еще';
            isExpanded = false;
            currentIndex = cardsPerLoad;
        }
    });
});