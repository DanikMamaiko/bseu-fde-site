document.addEventListener('DOMContentLoaded', async function() {
    // Элементы переключателя языка
    const desktopLanguageIcon = document.getElementById('desktopLanguageIcon');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageItems = document.querySelectorAll('.language-dropdown-item');
    const mobileLanguageIcon = document.getElementById('mobileLanguageIcon');
    
    // Загружаем переводы
    let translations = {};
    
    try {
        const response = await fetch('translations.json');
        if (!response.ok) throw new Error('Failed to load translations');
        translations = await response.json();
        console.log('Translations loaded:', translations);
    } catch (error) {
        console.error('Translation load error:', error);
        // Fallback-переводы
        translations = {
            'ru': {
                'brainstorm-title': 'На ФЦЭ прошла долгожданная мозгобойня',
                'brainstorm-date': '17 марта 2025',
                'brainstorm-content': '13 марта на ФЦЭ прошла долгожданная мозгобойня...',
                'learn-more': 'Узнать больше',
                'menu-item-1': 'Главная',
                'menu-item-2': 'Новости',
                'menu-item-3': 'Об факультете'
            },
            'en': {
                'brainstorm-title': 'Brain Battle at Faculty',
                'brainstorm-date': 'March 17, 2025',
                'brainstorm-content': 'On March 13, the Faculty hosted the Brain Battle...',
                'learn-more': 'Learn more',
                'menu-item-1': 'Home',
                'menu-item-2': 'News',
                'menu-item-3': 'About'
            },
            'be': {
                'brainstorm-title': 'На ФЦЭ адбылася доўгачаканая "Мозгабойня"',
                'brainstorm-date': '17 сакавіка 2025',
                'brainstorm-content': '13 сакавіка на ФЦЭ адбылася доўгачаканая "Мозгабойня"...',
                'learn-more': 'Даведацца больш',
                'menu-item-1': 'Галоўная',
                'menu-item-2': 'Навіны',
                'menu-item-3': 'Пра факультэт'
            },
            'zh': {
                'brainstorm-title': '数字经济学院举办了期待已久的"脑力大战"',
                'brainstorm-date': '2025年3月17日',
                'brainstorm-content': '3月13日，数字经济学院举办了期待已久的"脑力大战"...',
                'learn-more': '了解更多',
                'menu-item-1': '首页',
                'menu-item-2': '新闻',
                'menu-item-3': '关于'
            }
        };
    }

    // Функция применения переводов
    function applyTranslations(lang) {
        console.log('Applying language:', lang);
        const langData = translations[lang] || translations['ru'];
        
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (langData[key]) {
                console.log(`Translating ${key} to:`, langData[key]);
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = langData[key];
                } else {
                    el.innerHTML = langData[key];
                }
            } else {
                console.warn('Missing translation for key:', key);
            }
        });
    }

    // Инициализация переключателя языка (десктоп)
    if (desktopLanguageIcon && languageDropdown) {
        desktopLanguageIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.style.display = 
                languageDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        languageItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang') || 'ru';
                
                languageItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                languageDropdown.style.display = 'none';
                
                applyTranslations(lang);
                localStorage.setItem('selectedLanguage', lang);
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-switcher')) {
                languageDropdown.style.display = 'none';
            }
        });
    }

    // Инициализация переключателя языка (мобильная версия)
    if (mobileLanguageIcon) {
        mobileLanguageIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            const mobileLangDropdown = this.nextElementSibling;
            mobileLangDropdown.style.display = 
                mobileLangDropdown.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.mobile-language-switcher')) {
                const mobileLangDropdown = document.querySelector('.mobile-language-dropdown');
                if (mobileLangDropdown) {
                    mobileLangDropdown.style.display = 'none';
                }
            }
        });

        document.querySelectorAll('.mobile-language-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang') || 'ru';
                
                document.querySelectorAll('.mobile-language-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                applyTranslations(lang);
                localStorage.setItem('selectedLanguage', lang);
                
                const mobileLangDropdown = document.querySelector('.mobile-language-dropdown');
                if (mobileLangDropdown) {
                    mobileLangDropdown.style.display = 'none';
                }
            });
        });
    }

    // Восстановление выбранного языка
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    
    // Активируем выбранный язык в десктопной версии
    const desktopActiveItem = document.querySelector(`.language-dropdown-item[data-lang="${savedLang}"]`);
    if (desktopActiveItem) {
        desktopActiveItem.classList.add('active');
    }
    
    // Активируем выбранный язык в мобильной версии
    const mobileActiveItem = document.querySelector(`.mobile-language-item[data-lang="${savedLang}"]`);
    if (mobileActiveItem) {
        mobileActiveItem.classList.add('active');
    }
    
    // Применяем переводы
    applyTranslations(savedLang);

    // Мобильное меню
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
            if (title) {
                title.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    menuItems.forEach(i => i.classList.remove('active'));
                    if (!isActive) item.classList.add('active');
                });
            }
        });
    }
});