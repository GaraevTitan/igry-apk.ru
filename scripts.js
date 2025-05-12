// Добавьте сюда ваши скрипты
console.log("Сайт загружен!");

document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseover', () => {
        dropdown.querySelector('.dropdown-content').style.display = 'block';
    });
    dropdown.addEventListener('mouseout', () => {
        dropdown.querySelector('.dropdown-content').style.display = 'none';
    });
});

document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            if (button.textContent.includes('+')) {
                button.textContent = button.textContent.replace('+', '-');
            }
        } else {
            content.style.display = 'none';
            if (button.textContent.includes('-')) {
                button.textContent = button.textContent.replace('-', '+');
            }
        }
    });
});

document.querySelectorAll('.dropdown-title').forEach(title => {
    title.addEventListener('click', () => {
        const dropdown = title.parentElement;
        dropdown.classList.toggle('open'); // Переключаем класс "open"
    });
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
    const dropdown = document.querySelector('.mobile-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Обработчик для мобильного меню
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const menu = this.closest('.hamburger-menu');
    menu.classList.toggle('active');
    menu.querySelector('.mobile-nav').style.display = 
        menu.classList.contains('active') ? 'block' : 'none';
});

document.querySelector('.mobile-dropdown-title').addEventListener('click', function() {
    const dropdownItem = this.parentElement;
    dropdownItem.classList.toggle('active');
});

// База данных игр (можно расширить)
const gamesDatabase = [
    {
        id: 1,
        title: "Dream Road: Online",
        description: "Взлом Dream Road: Multiplayer для Android – Гонки с Мод Меню",
        image: "photo/unnamed.jpg",
        downloadUrl: "download1.html"
    },
    {
        id: 2,
        title: "Schoolboy RunaWay",
        description: "Чит на Schoolboy RunaWay с модом",
        image: "photo/Schoolboy.jpg",
        downloadUrl: "download2.html"
    }
    // Добавьте больше игр по необходимости
];

// Функция поиска
function searchGames(query) {
    const searchResults = document.querySelector('.games-grid');
    query = query.toLowerCase().trim();
    
    // Очищаем предыдущие результаты
    searchResults.innerHTML = '';

    if (query.length < 2) return; // Игнорируем короткие запросы

    // Фильтруем игры
    const results = gamesDatabase.filter(game => 
        game.title.toLowerCase().includes(query) || 
        game.description.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        searchResults.innerHTML = '<p class="no-results">Игры не найдены</p>';
        return;
    }

    // Показываем результаты
    results.forEach(game => {
        const gameCard = createGameCard(game);
        searchResults.appendChild(gameCard);
    });

    // Добавляем запрос в историю поиска
    if (!searchHistory.includes(query)) {
        searchHistory.push(query);
    }
}

function createGameCard(game) {
    const article = document.createElement('article');
    article.className = 'game-card';
    article.innerHTML = `
        <img src="${game.image}" alt="${game.title}" class="game-card__image">
        <div class="game-card__content">
            <h3 class="game-card__title">${game.title}</h3>
            <p class="game-card__desc">${game.description}</p>
            <a href="${game.downloadUrl}" class="download-btn">Скачать</a>
        </div>
    `;
    return article;
}

// Создаем список последних поисковых запросов
let searchHistory = [];

// Функция для создания и отображения подсказок
function showSearchSuggestions(query) {
    const searchInput = document.querySelector('.search-bar input');
    let suggestions = document.querySelector('.search-suggestions');
    
    // Создаем контейнер для подсказок, если его нет
    if (!suggestions) {
        suggestions = document.createElement('div');
        suggestions.className = 'search-suggestions';
        searchInput.parentNode.appendChild(suggestions);
    }
    
    // Фильтруем игры и историю поиска
    const gameResults = gamesDatabase.filter(game => 
        game.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3);
    
    const historyResults = searchHistory.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 2);
    
    // Формируем HTML подсказок
    suggestions.innerHTML = '';
    
    // Добавляем результаты из игр
    gameResults.forEach(game => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <img src="${game.image}" alt="${game.title}" class="suggestion-image">
            <div class="suggestion-content">
                <div class="suggestion-title">${game.title}</div>
                <div class="suggestion-category">Игра</div>
            </div>
        `;
        div.addEventListener('click', () => {
            searchInput.value = game.title;
            searchGames(game.title);
            suggestions.style.display = 'none';
        });
        suggestions.appendChild(div);
    });

    // Добавляем результаты из истории
    historyResults.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggestion-item history';
        div.innerHTML = `
            <i class="history-icon">🕒</i>
            <div class="suggestion-content">
                <div class="suggestion-title">${item}</div>
                <div class="suggestion-category">История поиска</div>
            </div>
        `;
        div.addEventListener('click', () => {
            searchInput.value = item;
            searchGames(item);
            suggestions.style.display = 'none';
        });
        suggestions.appendChild(div);
    });

    // Показываем или скрываем подсказки
    suggestions.style.display = 
        query.length >= 2 && (gameResults.length > 0 || historyResults.length > 0) 
            ? 'block' 
            : 'none';
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-btn');

    // Поиск при нажатии на кнопку
    searchButton.addEventListener('click', () => {
        searchGames(searchInput.value);
    });

    // Поиск при вводе текста (с небольшой задержкой)
    let timeout = null;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            searchGames(e.target.value);
        }, 500); // Задержка 500мс

        const query = e.target.value.trim();
        showSearchSuggestions(query);
    });

    // Поиск при нажатии Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchGames(e.target.value);
        }
    });

    // Скрываем подсказки при клике вне поиска
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
            const suggestions = document.querySelector('.search-suggestions');
            if (suggestions) {
                suggestions.style.display = 'none';
            }
        }
    });
});

// Обработчик для мобильного меню новостей
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Открытие/закрытие меню при клике
    menuToggle?.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!mobileMenu?.contains(e.target)) {
            mobileMenu?.classList.remove('active');
        }
    });
});

document.getElementById('loadMoreBtn').addEventListener('click', function() {
    document.querySelector('.hidden-games').classList.add('visible');
    this.style.display = 'none'; // скрываем кнопку после нажатия
});
