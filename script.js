// variables for the table and buttons

const container = document.querySelector('.container');
const table = document.querySelector('.table_1');
const expandButton = document.querySelector('.table_expand');
const languageButton = document.querySelector('.language_button');
const languageText = document.querySelector('.language_text');
const languageHint = document.querySelector('.language_hint');
const introText = document.querySelector('.intro_text');
const introMain = document.querySelector('.intro_main');
const introNote = document.querySelector('.intro_note');
const introTimer = document.querySelector('.intro_timer');
const introTimerProgress = document.querySelector('.intro_timer_progress');
const expandArrow = document.querySelector('.expand_arrow');
const buttons = document.querySelectorAll('.Button_1, .Button_2, .table_expand');
let pendingNavigationStyle = null;
let languageHintTimeout = null;
let introTimers = [];
let introFinalVisible = false;
let pendingFinalAfterExpand = false;
let expandFinalFallback = null;
let expandArrowDismissed = false;
let expandArrowAnimationId = 0;

// The Translation Section

const translations = {
    es: {
        languageHint: 'Haz Clic para Cambiar de Idioma',
        languageButtonLabel: 'Cambiar idioma',
        expandLabel: 'Agrandar tablero',
        collapseLabel: 'Reducir tablero',
        previousSectionLabel: 'Seccion anterior',
        nextSectionLabel: 'Siguiente seccion',
        previousButtonLabel: 'Boton anterior',
        nextButtonLabel: 'Boton siguiente',
        introHello: '\u00a1Hola!',
        introName: 'Soy Sebastian,',
        introExpandPrompt: 'Puedes agrandar el tablero para mejor visualizacion!',
        introFinal: '! Soy Desarrollador Front End !',
        introFinalNote: '(aunque tambien estoy en camino a ser full stack)'
    },
    en: {
        languageHint: 'Click to Change Language',
        languageButtonLabel: 'Change language',
        expandLabel: 'Expand board',
        collapseLabel: 'Collapse board',
        previousSectionLabel: 'Previous section',
        nextSectionLabel: 'Next section',
        previousButtonLabel: 'Previous button',
        nextButtonLabel: 'Next button',
        introHello: 'Hello!',
        introName: 'I am Sebastian,',
        introExpandPrompt: 'You can expand the board for better viewing!',
        introFinal: '! I am a Front End Developer !',
        introFinalNote: '(although I am also on my way to becoming full stack)'
    }
};

let currentLanguage = localStorage.getItem('language') || 'es';
let currentIntroContent = null;

const translateText = (translationKey, language = currentLanguage) => {
    return translations[language]?.[translationKey] || translations.es[translationKey] || translationKey;
};

const applyLanguage = (language) => {
    const dictionary = translations[language] || {};

    document.documentElement.lang = language;
    languageText.textContent = language.toUpperCase();
    languageButton.setAttribute('aria-pressed', String(language !== 'es'));
    languageButton.setAttribute('aria-label', translateText('languageButtonLabel', language));

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const translationKey = element.dataset.i18n;
        const translatedText = dictionary[translationKey];

        if (translatedText) {
            element.textContent = translatedText;
        }
    });

    if (currentIntroContent && introMain && introNote) {
        introMain.textContent = translateText(currentIntroContent.mainKey, language);
        introNote.textContent = currentIntroContent.noteKey
            ? translateText(currentIntroContent.noteKey, language)
            : '';
    }

    if (expandButton) {
        const isExpanded = table?.classList.contains('is-expanded');
        expandButton.setAttribute(
            'aria-label',
            translateText(isExpanded ? 'collapseLabel' : 'expandLabel', language)
        );
    }

    window.dispatchEvent(new CustomEvent('languagechange', {
        detail: { language }
    }));
};

const animateIntroLanguageChange = (language) => {
    if (!currentIntroContent || !introText || !introMain || !introNote) {
        applyLanguage(language);
        return;
    }

    anime.remove(introText);
    anime({
        targets: introText,
        opacity: [Number(getComputedStyle(introText).opacity) || 1, 0],
        translateY: [0, -8],
        scale: [1, 0.985],
        duration: 140,
        easing: 'easeInQuad',
        complete: () => {
            applyLanguage(language);

            anime({
                targets: introText,
                opacity: [0, 1],
                translateY: [8, 0],
                scale: [0.985, 1],
                duration: 260,
                easing: 'easeOutCubic'
            });
        }
    });
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
    languageHint.textContent = translateText('languageHint');

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
        animateIntroLanguageChange(currentLanguage);
        showLanguageHint(3200);
    });
}


// Intro 

const timerCircleLength = 113.1;
const expandPromptDuration = 4600;

const clearIntroTimers = () => {
    introTimers.forEach((timer) => clearTimeout(timer));
    introTimers = [];
};

const hideIntroTimer = () => {
    if (!introTimer || !introTimerProgress) {
        return;
    }

    anime.remove([introTimer, introTimerProgress]);
    const currentTimerOpacity = Number(getComputedStyle(introTimer).opacity) || 0;

    anime({
        targets: introTimer,
        opacity: [currentTimerOpacity, 0],
        scale: [1, 0.88],
        duration: 180,
        easing: 'easeInQuad'
    });
};

const hideExpandArrow = (duration = 220) => {
    if (!expandArrow) {
        return;
    }

    expandArrowAnimationId += 1;
    anime.remove(expandArrow);

    if (duration === 0) {
        expandArrow.style.opacity = '0';
        expandArrow.classList.remove('is-visible');
        expandArrow.style.visibility = 'hidden';
        expandArrow.style.transform = 'translate(-0.8rem, 0.8rem) scale(0.94)';
        return;
    }

    const currentArrowOpacity = Number(getComputedStyle(expandArrow).opacity);

    anime({
        targets: expandArrow,
        opacity: [Number.isFinite(currentArrowOpacity) ? currentArrowOpacity : 1, 0],
        translateX: [0, -8],
        translateY: [0, 8],
        scale: [1, 0.94],
        duration,
        easing: 'easeInQuad',
        complete: () => {
            expandArrow.classList.remove('is-visible');
            expandArrow.style.visibility = 'hidden';
        }
    });
};

const showExpandArrow = () => {
    if (!expandArrow || introFinalVisible || expandArrowDismissed || table?.classList.contains('is-expanded')) {
        return;
    }

    const animationId = expandArrowAnimationId + 1;
    expandArrowAnimationId = animationId;
    anime.remove(expandArrow);
    expandArrow.classList.add('is-visible');
    expandArrow.style.visibility = 'visible';

    anime({
        targets: expandArrow,
        opacity: [0, 1],
        translateX: [-10, 0],
        translateY: [10, 0],
        scale: [0.94, 1],
        duration: 520,
        easing: 'easeOutBack(1.35)',
        complete: () => {
            if (animationId !== expandArrowAnimationId || expandArrowDismissed) {
                return;
            }

            anime({
                targets: expandArrow,
                translateX: [0, 4],
                translateY: [0, -4],
                duration: 860,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine'
            });
        }
    });
};

const hideIntroForResize = () => {
    anime.remove([introText, introTimer, introTimerProgress]);

    if (introText) {
        introText.style.opacity = '0';
        introText.style.transform = 'translateY(-0.8rem) scale(0.98)';
    }

    if (introMain && introNote) {
        introMain.textContent = '';
        introNote.textContent = '';
        introText?.classList.remove('is-final');
        currentIntroContent = null;
    }

    if (introTimer) {
        introTimer.style.opacity = '0';
        introTimer.style.transform = 'scale(0.88)';
    }

    if (introTimerProgress) {
        introTimerProgress.style.strokeDashoffset = timerCircleLength;
    }
};

const startIntroTimer = () => {
    if (!introTimer || !introTimerProgress || introFinalVisible) {
        return;
    }

    anime.remove([introTimer, introTimerProgress]);
    introTimerProgress.style.strokeDasharray = timerCircleLength;
    introTimerProgress.style.strokeDashoffset = 0;

    anime({
        targets: introTimer,
        opacity: [0, 1],
        scale: [0.88, 1],
        duration: 280,
        easing: 'easeOutBack(1.35)'
    });

    anime({
        targets: introTimerProgress,
        strokeDashoffset: [0, timerCircleLength],
        duration: expandPromptDuration,
        easing: 'linear',
        complete: showFinalIntroText
    });
};

const animateIntroText = ({ mainKey, noteKey = '', main, note = '', isFinal = false }) => {
    if (!introText || !introMain || !introNote) {
        return;
    }

    const hasVisibleText = introMain.textContent.trim() || introNote.textContent.trim();
    const shouldShowExpandArrow = mainKey === 'introExpandPrompt';

    const showNextText = () => {
        currentIntroContent = mainKey
            ? { mainKey, noteKey, isFinal }
            : null;
        introMain.textContent = mainKey ? translateText(mainKey) : main;
        introNote.textContent = noteKey ? translateText(noteKey) : note;
        introText.classList.toggle('is-final', isFinal);

        anime({
            targets: introText,
            opacity: [0, 1],
            translateY: [14, 0],
            scale: [0.98, 1],
            duration: 560,
            easing: 'easeOutCubic',
            complete: () => {
                if (shouldShowExpandArrow) {
                    showExpandArrow();
                }
            }
        });
    };

    anime.remove(introText);

    if (!hasVisibleText) {
        showNextText();
        return;
    }

    anime({
        targets: introText,
        opacity: [1, 0],
        translateY: [0, -12],
        scale: [1, 0.98],
        duration: 240,
        easing: 'easeInQuad',
        complete: showNextText
    });
};

const showFinalIntroText = () => {
    if (introFinalVisible) {
        return;
    }

    introFinalVisible = true;
    clearIntroTimers();
    hideExpandArrow();
    hideIntroTimer();
    animateIntroText({
        mainKey: 'introFinal',
        noteKey: 'introFinalNote',
        isFinal: true
    });
};

const startIntroSequenceWithTimer = () => {
    clearIntroTimers();
    expandArrowDismissed = false;
    hideExpandArrow(0);
    hideIntroTimer();
    introFinalVisible = false;

    animateIntroText({ mainKey: 'introHello' });

    introTimers.push(setTimeout(() => {
        animateIntroText({ mainKey: 'introName' });
    }, 2400));

    introTimers.push(setTimeout(() => {
        animateIntroText({ mainKey: 'introExpandPrompt' });
        introTimers.push(setTimeout(startIntroTimer, 720));
    }, 5200));
};

const showFinalAfterExpand = () => {
    clearTimeout(expandFinalFallback);
    pendingFinalAfterExpand = false;
    showFinalIntroText();
};


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
    complete: () => {
        showButtons();
        startIntroSequenceWithTimer();
    }

});

// Nav and expand buttons

const nextButton = document.querySelector('.Button_2');
const prevButton = document.querySelector('.Button_1');

if (table && expandButton) {
    const setNavigationButtons = (useArrows) => {
        prevButton.textContent = useArrows ? '\u2190' : 'button';
        nextButton.textContent = useArrows ? '\u2192' : 'button';
        prevButton.classList.toggle('is-arrow', useArrows);
        nextButton.classList.toggle('is-arrow', useArrows);
        prevButton.setAttribute('aria-label', translateText(useArrows ? 'previousSectionLabel' : 'previousButtonLabel'));
        nextButton.setAttribute('aria-label', translateText(useArrows ? 'nextSectionLabel' : 'nextButtonLabel'));
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
        const isExpanded = !table.classList.contains('is-expanded');
        const shouldAdaptFinalText = isExpanded || introFinalVisible;

        expandArrowDismissed = true;
        hideExpandArrow();

        if (shouldAdaptFinalText) {
            clearIntroTimers();
            hideIntroForResize();
            introFinalVisible = false;
            pendingFinalAfterExpand = true;
            clearTimeout(expandFinalFallback);
            expandFinalFallback = setTimeout(showFinalAfterExpand, 750);
        }

        table.classList.toggle('is-expanded', isExpanded);

        pendingNavigationStyle = isExpanded ? 'arrows' : 'labels';
        container?.classList.toggle('is-table-expanded', isExpanded);
        expandButton.setAttribute('aria-pressed', String(isExpanded));
        expandButton.setAttribute(
            'aria-label',
            translateText(isExpanded ? 'collapseLabel' : 'expandLabel')
        );
    });

    table.addEventListener('transitionend', (event) => {
        if (event.propertyName !== 'height' || pendingNavigationStyle === null) {
            return;
        }

        animateNavigationButtons(pendingNavigationStyle === 'arrows');
        pendingNavigationStyle = null;

        if (pendingFinalAfterExpand) {
            showFinalAfterExpand();
        }
    });
}


// Code in charge of the sections


const sections = ['Home', 'Sobre_mi', 'Servicios', 'Projectos', 'Contacto']
    .map((sectionId) => document.getElementById(sectionId))
    .filter(Boolean);

let currentSectionIndex = 0;

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
