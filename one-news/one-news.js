document.addEventListener('DOMContentLoaded', function() {
    // Переключение языка в десктопной версии
    const desktopLanguageIcon = document.getElementById('desktopLanguageIcon');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageItems = document.querySelectorAll('.language-dropdown-item');

    const translations = {
        'ru': {
            'brainstorm-title': 'На ФЦЭ прошла долгожданная мозгобойня "Каждый день как праздник"',
            'brainstorm-date': '17 марта 2025',
            'brainstorm-content': `13 марта на ФЦЭ прошла долгожданная мозгобойня "Каждый день праздник"!<br>
                Ребята воспользовались возможностью проверить свои знания во многих сферах...`,
            'learn-more': 'Узнать больше',
            // Добавьте остальные тексты
        },
        'be': {
            'brainstorm-title': 'На ФЦЭ адбылася доўгачаканая "Мозгабойня"',
            'brainstorm-date': '17 сакавіка 2025',
            'brainstorm-content': `13 сакавіка на ФЦЭ адбылася доўгачаканая "Мозгабойня"...`,
            'learn-more': 'Даведацца больш',
            // Добавьте остальные тексты
        },
        'en': {
            'brainstorm-title': 'Faculty of Digital Economics hosted the long-awaited "Brain Battle"',
            'brainstorm-date': 'March 17, 2025',
            'brainstorm-content': `On March 13, the Faculty of Digital Economics hosted the long-awaited "Brain Battle"...`,
            'learn-more': 'Learn more',
            // Добавьте остальные тексты
        },
        'zh': {
            'brainstorm-title': '数字经济学院举办了期待已久的"脑力大战"',
            'brainstorm-date': '2025年3月17日',
            'brainstorm-content': `3月13日，数字经济学院举办了期待已久的"脑力大战"...`,
            'learn-more': '了解更多',
            // Добавьте остальные тексты
        }
    };
    
    if (desktopLanguageIcon) {
        desktopLanguageIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        languageItems.forEach(item => {
            item.addEventListener('click', function() {
                languageItems.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                languageDropdown.style.display = 'none';
                
                // Определяем выбранный язык
                let lang = 'ru';
                if (this.textContent.includes('Бел')) lang = 'be';
                if (this.textContent.includes('En')) lang = 'en';
                if (this.textContent.includes('Ch')) lang = 'zh';
                
                // Применяем переводы
                applyTranslations(lang);
                
                // Сохраняем выбор в localStorage
                localStorage.setItem('selectedLanguage', lang);
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-switcher')) {
                languageDropdown.style.display = 'none';
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            // Проверяем сохраненный язык
            const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
            
            // Устанавливаем активный язык в переключателе
            const langItems = {
                'ru': 0,
                'be': 1,
                'en': 2,
                'zh': 3
            };
            languageItems[langItems[savedLang]].classList.add('active');
            
            // Применяем переводы
            applyTranslations(savedLang);
            
            // Остальной код инициализации...
        });
    }

    function applyTranslations(lang) {
        const langData = translations[lang];
        
        // Находим все элементы с data-translate
        const translatableElements = document.querySelectorAll('[data-translate]');
        
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (langData[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.setAttribute('placeholder', langData[key]);
                } else {
                    el.innerHTML = langData[key];
                }
            }
        });
    }

    // Мобильные функции
    const burgerMenu = document.querySelector('.burger-menu');
    const sideMenu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
        });

        overlay.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            sideMenu.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });

        menuItems.forEach(item => {
            const title = item.querySelector('.menu-title');
            title.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                menuItems.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });

        const mobileLanguageIcon = document.getElementById('mobileLanguageIcon');
        if (mobileLanguageIcon) {
            mobileLanguageIcon.addEventListener('click', function() {
                alert('Язык изменен (мобильная версия)');
            });
        }
    }
});