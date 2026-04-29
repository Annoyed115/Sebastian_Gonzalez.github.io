// variables for the table and buttons

const container = document.querySelector('.container');
const table = document.querySelector('.table_1');
const expandButton = document.querySelector('.table_expand');
const languageButton = document.querySelector('.language_button');
const languageText = document.querySelector('.language_text');
const languageHint = document.querySelector('.language_hint');
const buttons = document.querySelectorAll('.Button_1, .Button_2, .table_expand');
let pendingNavigationStyle = null;
let languageHintTimeout = null;

// The Translation Section

const translations = {
    es: {},
    en: {}
};

const languageHintTexts = {
    es: 'Haz Clic para Cambiar de Idioma',
    en: 'Click to Change Language'
};

const languageButtonLabels = {
    es: 'Cambiar idioma',
    en: 'Change language'
};

let currentLanguage = localStorage.getItem('language') || 'es';

const applyLanguage = (language) => {
    const dictionary = translations[language] || {};

    document.documentElement.lang = language;
    languageText.textContent = language.toUpperCase();
    languageButton.setAttribute('aria-pressed', String(language !== 'es'));
    languageButton.setAttribute('aria-label', languageButtonLabels[language] || languageButtonLabels.es);

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const translationKey = element.dataset.i18n;
        const translatedText = dictionary[translationKey];

        if (translatedText) {
            element.textContent = translatedText;
        }
    });

    window.dispatchEvent(new CustomEvent('languagechange', {
        detail: { language }
    }));
};

const hideLanguageHint = () => {
    if (!languageHint) {
        return;
    }

    anime.remove(languageHint);
    anime({
        targets: languageHint,
        opacity: [1, 0],
        translateX: [0, -8],
        duration: 260,
        easing: 'easeInQuad'
    });
};

const showLanguageHint = (duration = 4200) => {
    if (!languageHint) {
        return;
    }

    clearTimeout(languageHintTimeout);
    languageHint.textContent = languageHintTexts[currentLanguage] || languageHintTexts.es;

    anime.remove(languageHint);
    anime({
        targets: languageHint,
        opacity: [0, 1],
        translateX: [-8, 0],
        duration: 320,
        easing: 'easeOutCubic',
        complete: () => {
            languageHintTimeout = setTimeout(hideLanguageHint, duration);
        }
    });
};

const showLanguageButton = () => {
    if (!languageButton) {
        return;
    }

    anime({
        targets: languageButton,
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.96, 1],
        duration: 620,
        easing: 'easeOutBack(1.4)',
        begin: () => {
            languageButton.style.pointerEvents = 'auto';
        },
        complete: () => {
            showLanguageHint();
        }
    });
};

if (languageButton && languageText) {
    applyLanguage(currentLanguage);
    showLanguageButton();

    languageButton.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLanguage);
        applyLanguage(currentLanguage);
        showLanguageHint(3200);
    });
}


// Animations for the buttons
const showButtons = () => {
    anime({
        targets: buttons,
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.96, 1],
        delay: anime.stagger(120),
        duration: 700,
        easing: 'easeOutBack(1.4)',
        begin: () => {
            buttons.forEach((button) => {
                button.style.pointerEvents = 'auto';
            });
        }
    });
};

// animation for the table

anime ({
    targets: '.table_1',
    translateY: [-400, 0],
    duration: 3400,
    easing: 'easeOutElastic(1, 0.5)',
    complete: showButtons

});

// Nav and expand buttons

if (table && expandButton) {
    const setNavigationButtons = (useArrows) => {
        prevButton.textContent = useArrows ? '\u2190' : 'button';
        nextButton.textContent = useArrows ? '\u2192' : 'button';
        prevButton.classList.toggle('is-arrow', useArrows);
        nextButton.classList.toggle('is-arrow', useArrows);
        prevButton.setAttribute('aria-label', useArrows ? 'Seccion anterior' : 'Boton anterior');
        nextButton.setAttribute('aria-label', useArrows ? 'Siguiente seccion' : 'Boton siguiente');
    };

    const animateNavigationButtons = (useArrows) => {
        const navigationButtons = [prevButton, nextButton];

        anime.remove(navigationButtons);
        anime({
            targets: navigationButtons,
            opacity: [1, 0],
            translateY: [0, -8],
            scale: [1, 0.88],
            duration: 90,
            easing: 'easeInQuad',
            complete: () => {
                setNavigationButtons(useArrows);

                anime({
                    targets: navigationButtons,
                    opacity: [0, 1],
                    translateY: [8, 0],
                    scale: [0.9, 1],
                    delay: anime.stagger(35),
                    duration: 220,
                    easing: 'easeOutBack(1.45)'
                });
            }
        });
    };

    expandButton.addEventListener('click', () => {
        const isExpanded = table.classList.toggle('is-expanded');

        pendingNavigationStyle = isExpanded ? 'arrows' : 'labels';
        container?.classList.toggle('is-table-expanded', isExpanded);
        expandButton.setAttribute('aria-pressed', String(isExpanded));
        expandButton.setAttribute(
            'aria-label',
            isExpanded ? 'Reducir tablero' : 'Agrandar tablero'
        );
    });

    table.addEventListener('transitionend', (event) => {
        if (event.propertyName !== 'height' || pendingNavigationStyle === null) {
            return;
        }

        animateNavigationButtons(pendingNavigationStyle === 'arrows');
        pendingNavigationStyle = null;
    });
}


// Code in charge of the sections


const sections = ['Home', 'Sobre_mi', 'Servicios', 'Projectos', 'Contacto']
    .map((sectionId) => document.getElementById(sectionId))
    .filter(Boolean);

let currentSectionIndex = 0;

const nextButton = document.querySelector('.Button_2');
const prevButton = document.querySelector('.Button_1');

if (sections.length > 0) {
    nextButton.addEventListener('click', () => {
        sections[currentSectionIndex].style.display = 'none';
        currentSectionIndex = (currentSectionIndex + 1) % sections.length;
        sections[currentSectionIndex].style.display = 'block';
    });

    prevButton.addEventListener('click', () => {
        sections[currentSectionIndex].style.display = 'none';
        currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
        sections[currentSectionIndex].style.display = 'block';
    });
}
