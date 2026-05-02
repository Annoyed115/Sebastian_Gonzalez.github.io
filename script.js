const dom = {
    container: document.querySelector('.container'),
    table: document.querySelector('.table_1'),
    expandButton: document.querySelector('.table_expand'),
    languageButton: document.querySelector('.language_button'),
    languageText: document.querySelector('.language_text'),
    languageHint: document.querySelector('.language_hint'),
    introText: document.querySelector('.intro_text'),
    introMain: document.querySelector('.intro_main'),
    introNote: document.querySelector('.intro_note'),
    introTimer: document.querySelector('.intro_timer'),
    introTimerProgress: document.querySelector('.intro_timer_progress'),
    expandArrow: document.querySelector('.expand_arrow'),
    prevButton: document.querySelector('.Button_1'),
    nextButton: document.querySelector('.Button_2')
};

const uiButtons = [
    dom.prevButton,
    dom.nextButton,
    dom.expandButton
].filter(Boolean);

const introConfig = {
    timerCircleLength: 113.1,
    expandPromptDuration: 4600,
    portfolioPromptDelay: 3600,
    sequence: [
        { delay: 0, content: { mainKey: 'introHello' } },
        { delay: 2400, content: { mainKey: 'introName' } },
        { delay: 5200, content: { mainKey: 'introExpandPrompt' }, startTimerDelay: 720 }
    ]
};

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
        introFinalNote: '(aunque tambien estoy en camino a ser full stack)',
        introPortfolioPrompt: 'Sientete libre de explorar mi portafolio'
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
        introFinalNote: '(although I am also on my way to becoming full stack)',
        introPortfolioPrompt: 'Feel free to explore my portfolio'
    }
};

const state = {
    language: localStorage.getItem('language') || 'es',
    currentIntroContent: null,
    introTimers: [],
    introFinalVisible: false,
    pendingFinalAfterExpand: false,
    pendingNavigationStyle: null,
    expandFinalFallback: null,
    languageHintTimeout: null,
    expandArrowDismissed: false,
    expandArrowAnimationId: 0,
    portfolioPromptTimer: null,
    introContentAfterResize: null,
    currentSectionIndex: 0
};

const translateText = (translationKey, language = state.language) => {
    return translations[language]?.[translationKey] || translations.es[translationKey] || translationKey;
};

const clearTimerList = (timers) => {
    timers.forEach((timer) => clearTimeout(timer));
    timers.length = 0;
};

const getOpacity = (element, fallback = 1) => {
    if (!element) {
        return fallback;
    }

    const opacity = Number(getComputedStyle(element).opacity);
    return Number.isFinite(opacity) ? opacity : fallback;
};

const setButtonInteractivity = (buttons, enabled) => {
    buttons.forEach((button) => {
        button.style.pointerEvents = enabled ? 'auto' : 'none';
    });
};

// Language

const applyLanguage = (language) => {
    const dictionary = translations[language] || translations.es;

    document.documentElement.lang = language;

    if (dom.languageText) {
        dom.languageText.textContent = language.toUpperCase();
    }

    if (dom.languageButton) {
        dom.languageButton.setAttribute('aria-pressed', String(language !== 'es'));
        dom.languageButton.setAttribute('aria-label', translateText('languageButtonLabel', language));
    }

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const translatedText = dictionary[element.dataset.i18n];

        if (translatedText) {
            element.textContent = translatedText;
        }
    });

    if (state.currentIntroContent && dom.introMain && dom.introNote) {
        const { mainKey, noteKey } = state.currentIntroContent;

        dom.introMain.textContent = translateText(mainKey, language);
        dom.introNote.textContent = noteKey ? translateText(noteKey, language) : '';
    }

    if (dom.expandButton) {
        const labelKey = dom.table?.classList.contains('is-expanded') ? 'collapseLabel' : 'expandLabel';
        dom.expandButton.setAttribute('aria-label', translateText(labelKey, language));
    }

    window.dispatchEvent(new CustomEvent('languagechange', {
        detail: { language }
    }));
};

const animateIntroLanguageChange = (language) => {
    if (!state.currentIntroContent || !dom.introText || !dom.introMain || !dom.introNote) {
        applyLanguage(language);
        return;
    }

    anime.remove(dom.introText);
    anime({
        targets: dom.introText,
        opacity: [getOpacity(dom.introText), 0],
        translateY: [0, -8],
        scale: [1, 0.985],
        duration: 140,
        easing: 'easeInQuad',
        complete: () => {
            applyLanguage(language);

            anime({
                targets: dom.introText,
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
    if (!dom.languageHint) {
        return;
    }

    anime.remove(dom.languageHint);
    anime({
        targets: dom.languageHint,
        opacity: [getOpacity(dom.languageHint), 0],
        translateX: [0, -8],
        duration: 260,
        easing: 'easeInQuad'
    });
};

const showLanguageHint = (duration = 4200) => {
    if (!dom.languageHint) {
        return;
    }

    clearTimeout(state.languageHintTimeout);
    dom.languageHint.textContent = translateText('languageHint');

    anime.remove(dom.languageHint);
    anime({
        targets: dom.languageHint,
        opacity: [0, 1],
        translateX: [-8, 0],
        duration: 320,
        easing: 'easeOutCubic',
        complete: () => {
            state.languageHintTimeout = setTimeout(hideLanguageHint, duration);
        }
    });
};

const showLanguageButton = () => {
    if (!dom.languageButton) {
        return;
    }

    anime({
        targets: dom.languageButton,
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.96, 1],
        duration: 620,
        easing: 'easeOutBack(1.4)',
        begin: () => {
            dom.languageButton.style.pointerEvents = 'auto';
        },
        complete: () => showLanguageHint()
    });
};

const setupLanguageControls = () => {
    if (!dom.languageButton || !dom.languageText) {
        return;
    }

    applyLanguage(state.language);
    showLanguageButton();

    dom.languageButton.addEventListener('click', () => {
        state.language = state.language === 'es' ? 'en' : 'es';
        localStorage.setItem('language', state.language);
        animateIntroLanguageChange(state.language);
        showLanguageHint(3200);
    });
};

// Intro content and expand prompt arrow

const hideIntroTimer = () => {
    if (!dom.introTimer || !dom.introTimerProgress) {
        return;
    }

    anime.remove([dom.introTimer, dom.introTimerProgress]);
    anime({
        targets: dom.introTimer,
        opacity: [getOpacity(dom.introTimer, 0), 0],
        scale: [1, 0.88],
        duration: 180,
        easing: 'easeInQuad'
    });
};

const resetIntroTimer = () => {
    if (dom.introTimer) {
        dom.introTimer.style.opacity = '0';
        dom.introTimer.style.transform = 'scale(0.88)';
    }

    if (dom.introTimerProgress) {
        dom.introTimerProgress.style.strokeDashoffset = introConfig.timerCircleLength;
    }
};

const hideExpandArrow = (duration = 220) => {
    if (!dom.expandArrow) {
        return;
    }

    state.expandArrowAnimationId += 1;
    anime.remove(dom.expandArrow);

    if (duration === 0) {
        dom.expandArrow.style.opacity = '0';
        dom.expandArrow.classList.remove('is-visible');
        dom.expandArrow.style.visibility = 'hidden';
        dom.expandArrow.style.transform = 'translate(-0.8rem, 0.8rem) scale(0.94)';
        return;
    }

    anime({
        targets: dom.expandArrow,
        opacity: [getOpacity(dom.expandArrow), 0],
        translateX: [0, -8],
        translateY: [0, 8],
        scale: [1, 0.94],
        duration,
        easing: 'easeInQuad',
        complete: () => {
            dom.expandArrow.classList.remove('is-visible');
            dom.expandArrow.style.visibility = 'hidden';
        }
    });
};

const showExpandArrow = () => {
    if (
        !dom.expandArrow ||
        state.introFinalVisible ||
        state.expandArrowDismissed ||
        dom.table?.classList.contains('is-expanded')
    ) {
        return;
    }

    const animationId = state.expandArrowAnimationId + 1;
    state.expandArrowAnimationId = animationId;

    anime.remove(dom.expandArrow);
    dom.expandArrow.classList.add('is-visible');
    dom.expandArrow.style.visibility = 'visible';

    anime({
        targets: dom.expandArrow,
        opacity: [0, 1],
        translateX: [-10, 0],
        translateY: [10, 0],
        scale: [0.94, 1],
        duration: 520,
        easing: 'easeOutBack(1.35)',
        complete: () => {
            if (animationId !== state.expandArrowAnimationId || state.expandArrowDismissed) {
                return;
            }

            anime({
                targets: dom.expandArrow,
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

const setIntroContent = ({ mainKey, noteKey = '', main = '', note = '', isFinal = false }) => {
    state.currentIntroContent = mainKey ? { mainKey, noteKey, isFinal } : null;

    dom.introMain.textContent = mainKey ? translateText(mainKey) : main;
    dom.introNote.textContent = noteKey ? translateText(noteKey) : note;
    dom.introText.classList.toggle('is-final', isFinal);
};

const cloneIntroContent = (content) => {
    if (!content) {
        return null;
    }

    return {
        mainKey: content.mainKey,
        noteKey: content.noteKey,
        isFinal: content.isFinal
    };
};

const animateIntroText = (content) => {
    if (!dom.introText || !dom.introMain || !dom.introNote) {
        return;
    }

    const hasVisibleText = dom.introMain.textContent.trim() || dom.introNote.textContent.trim();
    const shouldShowExpandArrow = content.mainKey === 'introExpandPrompt';

    const showNextText = () => {
        setIntroContent(content);

        anime({
            targets: dom.introText,
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

    anime.remove(dom.introText);

    if (!hasVisibleText) {
        showNextText();
        return;
    }

    anime({
        targets: dom.introText,
        opacity: [getOpacity(dom.introText), 0],
        translateY: [0, -12],
        scale: [1, 0.98],
        duration: 240,
        easing: 'easeInQuad',
        complete: showNextText
    });
};

const hideIntroForResize = () => {
    anime.remove([dom.introText, dom.introTimer, dom.introTimerProgress]);

    if (dom.introText) {
        dom.introText.style.opacity = '0';
        dom.introText.style.transform = 'translateY(-0.8rem) scale(0.98)';
        dom.introText.classList.remove('is-final');
    }

    if (dom.introMain && dom.introNote) {
        dom.introMain.textContent = '';
        dom.introNote.textContent = '';
        state.currentIntroContent = null;
    }

    resetIntroTimer();
};

const showFinalIntroText = () => {
    if (state.introFinalVisible) {
        return;
    }

    state.introFinalVisible = true;
    clearTimeout(state.portfolioPromptTimer);
    clearTimerList(state.introTimers);
    hideExpandArrow();
    hideIntroTimer();
    animateIntroText({
        mainKey: 'introFinal',
        noteKey: 'introFinalNote',
        isFinal: true
    });

    state.portfolioPromptTimer = setTimeout(() => {
        animateIntroText({
            mainKey: 'introPortfolioPrompt',
            isFinal: true
        });
    }, introConfig.portfolioPromptDelay);
};

const startIntroTimer = () => {
    if (!dom.introTimer || !dom.introTimerProgress || state.introFinalVisible) {
        return;
    }

    anime.remove([dom.introTimer, dom.introTimerProgress]);
    dom.introTimerProgress.style.strokeDasharray = introConfig.timerCircleLength;
    dom.introTimerProgress.style.strokeDashoffset = 0;

    anime({
        targets: dom.introTimer,
        opacity: [0, 1],
        scale: [0.88, 1],
        duration: 280,
        easing: 'easeOutBack(1.35)'
    });

    anime({
        targets: dom.introTimerProgress,
        strokeDashoffset: [0, introConfig.timerCircleLength],
        duration: introConfig.expandPromptDuration,
        easing: 'linear',
        complete: showFinalIntroText
    });
};

const startIntroSequenceWithTimer = () => {
    clearTimerList(state.introTimers);
    clearTimeout(state.portfolioPromptTimer);
    state.expandArrowDismissed = false;
    state.introFinalVisible = false;

    hideExpandArrow(0);
    hideIntroTimer();

    introConfig.sequence.forEach(({ delay, content, startTimerDelay }) => {
        state.introTimers.push(setTimeout(() => {
            animateIntroText(content);

            if (startTimerDelay) {
                state.introTimers.push(setTimeout(startIntroTimer, startTimerDelay));
            }
        }, delay));
    });
};

const showFinalAfterExpand = () => {
    clearTimeout(state.expandFinalFallback);
    state.pendingFinalAfterExpand = false;

    if (state.introContentAfterResize?.mainKey === 'introPortfolioPrompt') {
        state.introFinalVisible = true;
        animateIntroText(state.introContentAfterResize);
        state.introContentAfterResize = null;
        return;
    }

    state.introContentAfterResize = null;
    showFinalIntroText();
};

// Buttons and table

const showButtons = () => {
    anime({
        targets: uiButtons,
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.96, 1],
        delay: anime.stagger(120),
        duration: 700,
        easing: 'easeOutBack(1.4)',
        begin: () => setButtonInteractivity(uiButtons, true)
    });
};

const runTableIntroAnimation = () => {
    if (!dom.table) {
        return;
    }

    anime({
        targets: dom.table,
        translateY: [-400, 0],
        duration: 3400,
        easing: 'easeOutElastic(1, 0.5)',
        complete: () => {
            showButtons();
            startIntroSequenceWithTimer();
        }
    });
};

const setNavigationButtons = (useArrows) => {
    if (!dom.prevButton || !dom.nextButton) {
        return;
    }

    dom.prevButton.textContent = useArrows ? '\u2190' : 'button';
    dom.nextButton.textContent = useArrows ? '\u2192' : 'button';

    dom.prevButton.classList.toggle('is-arrow', useArrows);
    dom.nextButton.classList.toggle('is-arrow', useArrows);

    dom.prevButton.setAttribute('aria-label', translateText(useArrows ? 'previousSectionLabel' : 'previousButtonLabel'));
    dom.nextButton.setAttribute('aria-label', translateText(useArrows ? 'nextSectionLabel' : 'nextButtonLabel'));
};

const animateNavigationButtons = (useArrows) => {
    const navigationButtons = [dom.prevButton, dom.nextButton].filter(Boolean);

    anime.remove(navigationButtons);
    anime({
        targets: navigationButtons,
        opacity: [getOpacity(navigationButtons[0]), 0],
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

const syncExpandButtonLabel = (isExpanded) => {
    if (!dom.expandButton) {
        return;
    }

    dom.expandButton.setAttribute('aria-pressed', String(isExpanded));
    dom.expandButton.setAttribute('aria-label', translateText(isExpanded ? 'collapseLabel' : 'expandLabel'));
};

const handleExpandClick = () => {
    if (!dom.table) {
        return;
    }

    const isExpanded = !dom.table.classList.contains('is-expanded');
    const shouldAdaptFinalText = isExpanded || state.introFinalVisible;

    state.expandArrowDismissed = true;
    hideExpandArrow();

    if (shouldAdaptFinalText) {
        state.introContentAfterResize = cloneIntroContent(state.currentIntroContent);
        clearTimerList(state.introTimers);
        clearTimeout(state.portfolioPromptTimer);
        hideIntroForResize();
        state.introFinalVisible = false;
        state.pendingFinalAfterExpand = true;
        clearTimeout(state.expandFinalFallback);
        state.expandFinalFallback = setTimeout(showFinalAfterExpand, 750);
    }

    dom.table.classList.toggle('is-expanded', isExpanded);
    dom.container?.classList.toggle('is-table-expanded', isExpanded);

    state.pendingNavigationStyle = isExpanded ? 'arrows' : 'labels';
    syncExpandButtonLabel(isExpanded);
};

const handleTableTransitionEnd = (event) => {
    if (event.propertyName !== 'height' || state.pendingNavigationStyle === null) {
        return;
    }

    animateNavigationButtons(state.pendingNavigationStyle === 'arrows');
    state.pendingNavigationStyle = null;

    if (state.pendingFinalAfterExpand) {
        showFinalAfterExpand();
    }
};

const setupExpandControls = () => {
    if (!dom.table || !dom.expandButton) {
        return;
    }

    dom.expandButton.addEventListener('click', handleExpandClick);
    dom.table.addEventListener('transitionend', handleTableTransitionEnd);
};

// Sections

const sections = [

    { id: 'home', title: 'home'},
    { id: 'sobre_mi', title: 'Sobre Mi' },
    { id: 'proyectos', title: 'Proyectos' },
    { id: 'contacto', title: 'Contacto' }
]   


;

const showSection = (nextIndex) => {
    if (!sections.length) {
        return;
    }

   state.currentSectionIndex = (nextIndex + sections.length) % sections.length;
   const section = sections[state.currentSectionIndex];
   document.querySelector('.table_content').innerHTML = `<h1>${section.title}</h1>`;
};

const setupSectionNavigation = () => {
    if (!sections.length || !dom.prevButton || !dom.nextButton) {
        return;
    }

    dom.nextButton.addEventListener('click', () => {
        showSection(state.currentSectionIndex + 1);
    });

    dom.prevButton.addEventListener('click', () => {
        showSection(state.currentSectionIndex - 1);
    });
};

setupLanguageControls();
setupExpandControls();
setupSectionNavigation();
runTableIntroAnimation();
