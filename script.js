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
    sectionActionButton: document.querySelector('.section_action_button'),
    prevButton: document.querySelector('.Button_1'),
    nextButton: document.querySelector('.Button_2')
};

const uiButtons = [
    dom.prevButton,
    dom.nextButton,
    dom.expandButton
].filter(Boolean);

// Mantiene los tiempos del Home en un solo lugar para ajustar el ritmo sin buscar setTimeouts sueltos.
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
        sectionHome: 'Inicio',
        introHello: '\u00a1Hola!',
        introName: 'Soy Sebastian,',
        introExpandPrompt: 'Puedes agrandar el tablero para mejor visualizacion!',
        introFinal: '! Soy Desarrollador Front End !',
        introFinalNote: '(aunque tambien estoy en camino a ser full stack)',
        introPortfolioPrompt: 'Sientete libre de explorar mi portafolio',
        sectionAbout: 'Sobre Mi',
        sectionProjects: 'Proyectos',
        sectionContact: 'Contacto',
        sectionAboutAction: 'Conoceme!',
        sectionAboutName: 'Juan Sebastian Gonzalez T.',
        sectionAboutBio: 'Desarrollador Front End Con vision a futuro de ser Full Stack, enfocado en crear interfaces limpias, responsive y agradables para las personas que las usan.',
        sectionProjectsAction: 'Ver proyectos',
        projectCard1Category: 'Frontend',
        projectCard1Title: 'Landing Page',
        projectCard1Summary: 'Interfaz responsive con animaciones suaves y estructura clara.',
        projectCard1Detail: 'Proyecto enfocado en presentar informacion de forma directa, con componentes visuales limpios y una experiencia comoda en celulares, tablets y escritorio.',
        projectCard2Category: 'UI Interactiva',
        projectCard2Title: 'Dashboard',
        projectCard2Summary: 'Panel visual para organizar datos y acciones importantes.',
        projectCard2Detail: 'Una seccion pensada para mostrar metricas, accesos rapidos y estados de usuario con una composicion facil de escanear.',
        projectCard3Category: 'Portfolio',
        projectCard3Title: 'Experiencia Web',
        projectCard3Summary: 'Exploracion visual con microinteracciones y contenido modular.',
        projectCard3Detail: 'Un ejemplo de como convertir una idea personal en una experiencia navegable, responsive y con animaciones que guian sin saturar.',
        projectCard4Category: 'Full Stack',
        projectCard4Title: 'CRUD de empleados',
        projectCard4Summary: 'Gestion de empleados con React, Node, Laravel, MySQL y Bootstrap.',
        projectCard4Detail: 'Aplicacion CRUD para registrar, editar y eliminar empleados, conectando frontend, backend y base de datos en un flujo completo.',
        projectRepoLabel: 'Ver repositorio',
        projectDetailClose: 'Cerrar proyecto',
        sectionContactAction: 'Contactame',
        contactGithubLabel: 'GitHub',
        contactLinkedinLabel: 'LinkedIn',
        contactEmailLabel: 'Email',
        contactCodeLabel: 'Codigo'
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
        sectionHome: 'Home',
        introHello: 'Hello!',
        introName: 'I am Sebastian,',
        introExpandPrompt: 'You can expand the board for better viewing!',
        introFinal: '! I am a Front End Developer !',
        introFinalNote: '(although I am also on my way to becoming full stack)',
        introPortfolioPrompt: 'Feel free to explore my portfolio',
        sectionAbout: 'About Me',
        sectionProjects: 'Projects',
        sectionContact: 'Contact',
        sectionAboutAction: 'Meet me!',
        sectionAboutName: 'Juan Sebastian Gonzalez T.',
        sectionAboutBio: 'Front End Developer with a long-term vision to become a Full Stack Developer, focused on creating clean, responsive and pleasant interfaces for the people who use them.',
        sectionProjectsAction: 'View projects',
        projectCard1Category: 'Frontend',
        projectCard1Title: 'Landing Page',
        projectCard1Summary: 'Responsive interface with smooth animations and a clear structure.',
        projectCard1Detail: 'A project focused on presenting information directly, with clean visual components and a comfortable experience across phones, tablets and desktop.',
        projectCard2Category: 'Interactive UI',
        projectCard2Title: 'Dashboard',
        projectCard2Summary: 'Visual panel for organizing important data and actions.',
        projectCard2Detail: 'A section designed to show metrics, quick actions and user states with a composition that is easy to scan.',
        projectCard3Category: 'Portfolio',
        projectCard3Title: 'Web Experience',
        projectCard3Summary: 'Visual exploration with microinteractions and modular content.',
        projectCard3Detail: 'An example of turning a personal idea into a navigable, responsive experience with animations that guide without overwhelming.',
        projectCard4Category: 'Full Stack',
        projectCard4Title: 'Employee CRUD',
        projectCard4Summary: 'Employee management with React, Node, Laravel, MySQL and Bootstrap.',
        projectCard4Detail: 'CRUD application to create, edit and delete employees, connecting frontend, backend and database in a complete flow.',
        projectRepoLabel: 'View repository',
        projectDetailClose: 'Close project',
        sectionContactAction: 'Contact me',
        contactGithubLabel: 'GitHub',
        contactLinkedinLabel: 'LinkedIn',
        contactEmailLabel: 'Email',
        contactCodeLabel: 'Code'
    }
};

// Este estado evita usar el DOM como fuente de verdad cuando varias animaciones pueden estar activas.
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
    isSectionAnimating: false,
    isSectionActionAnimating: false,
    sectionActionAnimationId: 0,
    projectDetailOpen: false,
    currentSectionIndex: 0,
    sectionDetails: {}
};

const translateText = (translationKey, language = state.language) => {
    return translations[language]?.[translationKey] || translations.es[translationKey] || translationKey;
};

const resetSectionTextStyles = () => {
    [dom.introMain, dom.introNote, dom.sectionActionButton].filter(Boolean).forEach((element) => {
        anime.remove(element);
        element.style.opacity = '';
        element.style.transform = '';
        element.style.translate = '';
        element.style.scale = '';
        element.style.width = '';
        element.style.height = '';
    });
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

    // Actualiza el texto visible sin reiniciar la seccion ni perder la animacion actual.
    if (state.currentIntroContent && dom.introMain && dom.introNote) {
        const { mainKey, noteKey, main, note, actionKey, actionMode, view } = state.currentIntroContent;

        if (view === 'projectsGrid') {
            updateProjectCardTranslations();
        } else if (view === 'contactSocial') {
            updateContactTranslations();
        } else {
            dom.introMain.textContent = mainKey ? translateText(mainKey, language) : main;
            dom.introNote.textContent = noteKey ? translateText(noteKey, language) : note || '';
            updateSectionActionButton(actionKey, language, actionMode);
        }
    }

    if (dom.expandButton) {
        const labelKey = dom.table?.classList.contains('is-expanded') ? 'collapseLabel' : 'expandLabel';
        dom.expandButton.setAttribute('aria-label', translateText(labelKey, language));
    }

    updateNavigationButtons(language, { animate: true });

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

    // Invalida animaciones pendientes para que la flecha no reaparezca despues del clic.
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

    // Cada aparicion recibe un id; si otra accion ocurre antes de terminar, se cancela.
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

const updateSectionActionButton = (actionKey, language = state.language, actionMode = '') => {
    if (!dom.sectionActionButton) {
        return;
    }

    if (!actionKey) {
        dom.sectionActionButton.hidden = true;
        dom.sectionActionButton.textContent = '';
        dom.sectionActionButton.removeAttribute('aria-label');
        dom.sectionActionButton.removeAttribute('aria-disabled');
        dom.sectionActionButton.disabled = false;
        dom.sectionActionButton.classList.remove('is-detail');
        dom.sectionActionButton.classList.remove('is-busy');
        dom.sectionActionButton.style.pointerEvents = '';
        return;
    }

    const buttonText = translateText(actionKey, language);
    const isDetailMode = actionMode === 'detail';

    dom.sectionActionButton.hidden = false;
    dom.sectionActionButton.textContent = buttonText;
    dom.sectionActionButton.setAttribute('aria-label', buttonText);
    dom.sectionActionButton.classList.toggle('is-detail', isDetailMode);
    dom.sectionActionButton.setAttribute('aria-disabled', String(isDetailMode));
    dom.sectionActionButton.disabled = isDetailMode;
    dom.sectionActionButton.style.pointerEvents = isDetailMode ? 'none' : 'auto';
};

const setIntroContent = ({ mainKey, noteKey = '', main = '', note = '', actionKey = '', actionMode = '', view = '', isFinal = false }) => {
    if (view !== 'projectsGrid') {
        clearProjectCards();
        resetSectionTextStyles();
    }

    if (view !== 'contactSocial') {
        clearContactPanel();
    }

    state.currentIntroContent = {
        mainKey,
        noteKey,
        main,
        note,
        actionKey,
        actionMode,
        view,
        isFinal
    };

    dom.introMain.textContent = mainKey ? translateText(mainKey) : main;
    dom.introNote.textContent = noteKey ? translateText(noteKey) : note;
    updateSectionActionButton(actionKey, state.language, actionMode);
    dom.introText.classList.toggle('is-final', isFinal);
};

const cloneIntroContent = (content) => {
    if (!content) {
        return null;
    }

    // Se guarda antes de agrandar/achicar para restaurar secciones sin volver al inicio del Home.
    return {
        mainKey: content.mainKey,
        noteKey: content.noteKey,
        main: content.main,
        note: content.note,
        actionKey: content.actionKey,
        actionMode: content.actionMode,
        view: content.view,
        isFinal: content.isFinal
    };
};

const shouldRestoreIntroAfterResize = (content) => {
    if (!content?.isFinal) {
        return false;
    }

    // El texto de desarrollador debe seguir su flujo normal hacia el cierre del Home.
    return content.mainKey !== 'introFinal';
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
        updateSectionActionButton('');
        clearProjectCards();
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

    // Si estaba en una seccion o en el cierre del Home, el resize respeta ese punto.
    if (shouldRestoreIntroAfterResize(state.introContentAfterResize)) {
        if (state.introContentAfterResize.view === 'projectsGrid') {
            renderProjectGridContent({ animate: true });
            state.introContentAfterResize = null;
            return;
        }

        if (state.introContentAfterResize.view === 'contactSocial') {
            renderContactPanel({ animate: true });
            state.introContentAfterResize = null;
            return;
        }

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

const getSectionIndex = (index) => {
    return (index + sections.length) % sections.length;
};

const shouldUseCompactNavigation = () => window.matchMedia('(max-width: 700px)').matches;

const getSectionNavLabel = (index, language = state.language) => {
    return translateText(sections[getSectionIndex(index)].navKey, language);
};

const createNavigationLabel = (button, label) => {
    const labelElement = document.createElement('span');
    labelElement.className = 'nav_button_text';

 // La animacion trabaja por caracter para lograr un cambio con mas personalidad.
    [...label].forEach((character) => {
        const characterElement = document.createElement('span');
        characterElement.className = 'nav_button_char';
        characterElement.textContent = character === ' ' ? '\u00a0' : character;
        labelElement.appendChild(characterElement);
    });

    button.dataset.navLabel = label;
    button.replaceChildren(labelElement);

    return [...labelElement.querySelectorAll('.nav_button_char')];
};

const animateNavigationLabel = (button, label, direction = 1) => {
    if (!button || button.dataset.navLabel === label) {
        return;
    }

    const currentChars = [...button.querySelectorAll('.nav_button_char')];

    if (!currentChars.length || getOpacity(button, 0) === 0) {
        createNavigationLabel(button, label);
        return;
    }

    anime.remove(currentChars);
    anime({
        targets: currentChars,
        opacity: [1, 0],
        translateX: (_, index, total) => {
            const side = index < total / 2 ? -1 : 1;
            return side * direction * 12;
        },
        translateY: [0, -5],
        scale: [1, 0.72],
        duration: 120,
        delay: anime.stagger(10, { from: 'center' }),
        easing: 'easeInQuad',
        complete: () => {
            const nextChars = createNavigationLabel(button, label);

            anime.set(nextChars, {
                opacity: 0,
                translateX: (_, index, total) => {
                    const side = index < total / 2 ? -1 : 1;
                    return side * direction * -14;
                },
                translateY: 7,
                scale: 0.7
            });

            anime({
                targets: nextChars,
                opacity: [0, 1],
                translateX: 0,
                translateY: [7, 0],
                scale: [0.7, 1],
                duration: 310,
                delay: anime.stagger(16, { from: 'center' }),
                easing: 'easeOutBack(1.9)'
            });
        }
    });
};

const setNavigationButtonLabel = (button, label, { animate = false, direction = 1 } = {}) => {
    if (animate) {
        animateNavigationLabel(button, label, direction);
        return;
    }

    if (button?.dataset.navLabel !== label) {
        createNavigationLabel(button, label);
    }
};

const setNavigationButtons = (useArrows = false, language = state.language, options = {}) => {
    if (!dom.prevButton || !dom.nextButton) {
        return;
    }

// En Telefonos Moviles se prioriza espacio; en pantallas grandes se muestra el destino de cada boton.
    const useCompactLabels = shouldUseCompactNavigation();
    const previousLabel = getSectionNavLabel(state.currentSectionIndex - 1, language);
    const nextLabel = getSectionNavLabel(state.currentSectionIndex + 1, language);

    setNavigationButtonLabel(dom.prevButton, useCompactLabels ? '\u2190' : previousLabel, {
        animate: options.animate,
        direction: -1
    });
    setNavigationButtonLabel(dom.nextButton, useCompactLabels ? '\u2192' : nextLabel, {
        animate: options.animate,
        direction: 1
    });

    dom.prevButton.classList.toggle('is-arrow', useCompactLabels);
    dom.nextButton.classList.toggle('is-arrow', useCompactLabels);

    dom.prevButton.setAttribute('aria-label', `${translateText('previousSectionLabel', language)}: ${previousLabel}`);
    dom.nextButton.setAttribute('aria-label', `${translateText('nextSectionLabel', language)}: ${nextLabel}`);
};

const updateNavigationButtons = (language = state.language, options = {}) => {
    setNavigationButtons(state.pendingNavigationStyle === 'arrows', language, options);
};

const animateNavigationButtons = (useArrows) => {
    const navigationButtons = [dom.prevButton, dom.nextButton].filter(Boolean);

    anime.remove(navigationButtons);
    setNavigationButtons(useArrows, state.language, { animate: true });

    anime({
        targets: navigationButtons,
        scale: [0.96, 1],
        duration: 240,
        delay: anime.stagger(35),
        easing: 'easeOutBack(1.6)'
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
    { id: 'home', mainKey: 'introPortfolioPrompt', navKey: 'sectionHome' },
    {
        id: 'sobre_mi',
        mainKey: 'sectionAbout',
        navKey: 'sectionAbout',
        actionKey: 'sectionAboutAction',
        detailMainKey: 'sectionAboutName',
        detailActionKey: 'sectionAboutBio'
    },
    { id: 'proyectos', mainKey: 'sectionProjects', navKey: 'sectionProjects', actionKey: 'sectionProjectsAction' },
    { id: 'contacto', mainKey: 'sectionContact', navKey: 'sectionContact', actionKey: 'sectionContactAction' }
];

const projectCards = [
    {
        id: 'landing',
        categoryKey: 'projectCard1Category',
        titleKey: 'projectCard1Title',
        summaryKey: 'projectCard1Summary',
        detailKey: 'projectCard1Detail',
        image: 'assets/projects/landing-page.png',
        repoUrl: 'https://github.com/Annoyed115',
        tone: 'blue'
    },
    {
        id: 'dashboard',
        categoryKey: 'projectCard2Category',
        titleKey: 'projectCard2Title',
        summaryKey: 'projectCard2Summary',
        detailKey: 'projectCard2Detail',
        image: 'assets/projects/dashboard.png',
        repoUrl: 'https://github.com/Annoyed115',
        tone: 'green'
    },
    {
        id: 'experience',
        categoryKey: 'projectCard3Category',
        titleKey: 'projectCard3Title',
        summaryKey: 'projectCard3Summary',
        detailKey: 'projectCard3Detail',
        image: 'assets/projects/web-experience.png',
        repoUrl: 'https://github.com/Annoyed115',
        tone: 'violet'
    },
    {
        id: 'crud',
        categoryKey: 'projectCard4Category',
        titleKey: 'projectCard4Title',
        summaryKey: 'projectCard4Summary',
        detailKey: 'projectCard4Detail',
        image: 'assets/projects/crud-management.png',
        repoUrl: 'https://github.com/Annoyed115/CRUD-mysql-react-node-laravel-bootstrap',
        tone: 'gray'
    }
];

const contactLinks = [
    {
        id: 'github',
        labelKey: 'contactGithubLabel',
        label: 'GH',
        href: 'https://github.com/Annoyed115'
    },
    {
        id: 'linkedin',
        labelKey: 'contactLinkedinLabel',
        label: 'in',
        href: 'https://linkedin.com/in/sebastian-gonzalez115/'
    },
    {
        id: 'email',
        labelKey: 'contactEmailLabel',
        label: '@',
        href: 'mailto:'
    },
    {
        id: 'code',
        labelKey: 'contactCodeLabel',
        label: '</>',
        href: 'https://github.com/Annoyed115?tab=repositories'
    }
];

const getSectionContent = (section) => {
    if (state.sectionDetails[section.id] && section.detailMainKey && section.detailActionKey) {
        return {
            mainKey: section.detailMainKey,
            actionKey: section.detailActionKey,
            actionMode: 'detail',
            isFinal: true
        };
    }

    return {
        mainKey: section.mainKey,
        actionKey: section.actionKey,
        isFinal: true
    };
};

const getProjectGrid = () => dom.introText?.querySelector('.project_grid');

const closeProjectDetail = ({ instant = false } = {}) => {
    const detail = dom.table?.querySelector('.project_detail');

    state.projectDetailOpen = false;

    if (!detail) {
        return;
    }

    anime.remove(detail);

    if (instant) {
        detail.remove();
        return;
    }

    anime({
        targets: detail,
        opacity: [getOpacity(detail), 0],
        scale: [1, 0.96],
        duration: 220,
        easing: 'easeInQuad',
        complete: () => detail.remove()
    });
};

const clearProjectCards = () => {
    closeProjectDetail({ instant: true });
    getProjectGrid()?.remove();
    dom.introText?.classList.remove('has-projects');
};

const getContactPanel = () => dom.introText?.querySelector('.contact_panel');

const clearContactPanel = () => {
    getContactPanel()?.remove();
    dom.introText?.classList.remove('has-contact');
};

const updateContactTranslations = () => {
    getContactPanel()?.querySelectorAll('.contact_link').forEach((linkElement) => {
        const contactLink = contactLinks.find((item) => item.id === linkElement.dataset.contactId);

        if (!contactLink) {
            return;
        }

        linkElement.setAttribute('aria-label', translateText(contactLink.labelKey));
        linkElement.querySelector('.contact_link_text').textContent = translateText(contactLink.labelKey);
    });
};

const buildContactPanel = () => {
    const panel = document.createElement('div');
    panel.className = 'contact_panel';

    const imageWrap = document.createElement('div');
    imageWrap.className = 'contact_photo_wrap';

    const image = document.createElement('img');
    image.className = 'contact_photo';
    image.src = 'assets/contact/sebastian-profile.jpeg';
    image.alt = 'Juan Sebastian Gonzalez T.';

    const links = document.createElement('div');
    links.className = 'contact_links';

    contactLinks.forEach((contactLink) => {
        const linkElement = document.createElement('a');
        linkElement.className = `contact_link contact_link--${contactLink.id}`;
        linkElement.href = contactLink.href;
        linkElement.dataset.contactId = contactLink.id;
        linkElement.setAttribute('aria-label', translateText(contactLink.labelKey));

        if (contactLink.href !== '#') {
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
        } else {
            linkElement.addEventListener('click', (event) => event.preventDefault());
        }

        const icon = document.createElement('span');
        icon.className = 'contact_link_icon';
        icon.textContent = contactLink.label;

        const text = document.createElement('span');
        text.className = 'contact_link_text';
        text.textContent = translateText(contactLink.labelKey);

        linkElement.append(icon, text);
        links.appendChild(linkElement);
    });

    imageWrap.appendChild(image);
    panel.append(imageWrap, links);

    return panel;
};

const renderContactPanel = ({ animate = false } = {}) => {
    if (!dom.introText || !dom.introMain || !dom.introNote) {
        return;
    }

    clearContactPanel();
    clearProjectCards();
    dom.introText.classList.add('has-contact');
    dom.introText.classList.toggle('is-final', true);
    dom.introMain.textContent = '';
    dom.introNote.textContent = '';
    updateSectionActionButton('');

    const panel = buildContactPanel();
    dom.introText.appendChild(panel);
    state.currentIntroContent = {
        mainKey: 'sectionContact',
        view: 'contactSocial',
        isFinal: true
    };

    if (!animate) {
        return;
    }

    const photo = panel.querySelector('.contact_photo_wrap');
    const links = [...panel.querySelectorAll('.contact_link')];

    anime.set(dom.introText, {
        opacity: 1,
        translateX: 0,
        translateY: 0,
        scale: 1
    });

    anime.set(photo, {
        opacity: 0,
        scale: 0.72,
        translateY: 24
    });

    anime.set(links, {
        opacity: 0,
        scale: 0.34,
        translateY: -82
    });

    anime({
        targets: photo,
        opacity: [0, 1],
        scale: [0.72, 1],
        translateY: [24, 0],
        duration: 620,
        easing: 'easeOutBack(1.25)',
        complete: () => {
            anime({
                targets: links,
                opacity: [0, 1],
                scale: [0.34, 1],
                translateY: [-82, 0],
                delay: anime.stagger(95),
                duration: 520,
                easing: 'easeOutBack(1.8)'
            });
        }
    });
};

const showContactPanel = () => {
    if (!dom.introText || state.isSectionActionAnimating) {
        return;
    }

    const animationId = state.sectionActionAnimationId + 1;
    state.sectionActionAnimationId = animationId;
    state.isSectionAnimating = true;
    state.isSectionActionAnimating = true;
    state.sectionDetails.contacto = true;
    dom.sectionActionButton.disabled = true;
    dom.sectionActionButton.classList.add('is-busy');
    setButtonInteractivity([dom.prevButton, dom.nextButton].filter(Boolean), false);

    const exitingElements = [dom.introMain, dom.sectionActionButton].filter(Boolean);

    anime.remove(exitingElements);
    anime({
        targets: exitingElements,
        opacity: [1, 0],
        translateY: [0, -18],
        scale: [1, 0.94],
        delay: anime.stagger(70),
        duration: 260,
        easing: 'easeInQuad',
        complete: () => {
            if (animationId !== state.sectionActionAnimationId) {
                return;
            }

            renderContactPanel({ animate: true });
            state.isSectionAnimating = false;
            state.isSectionActionAnimating = false;
            setButtonInteractivity([dom.prevButton, dom.nextButton].filter(Boolean), true);
        }
    });
};

const createProjectCard = (project) => {
    const card = document.createElement('button');
    card.className = `project_card project_card--${project.tone}`;
    card.type = 'button';
    card.dataset.projectId = project.id;
    card.setAttribute('aria-label', translateText(project.titleKey));

    const visual = document.createElement('span');
    visual.className = 'project_card_visual';
    visual.setAttribute('aria-hidden', 'true');

    const image = document.createElement('img');
    image.className = 'project_card_image';
    image.src = project.image;
    image.alt = '';
    image.loading = 'lazy';
    image.addEventListener('error', () => {
        image.hidden = true;
        visual.classList.add('has-missing-image');
    });

    const content = document.createElement('span');
    content.className = 'project_card_content';

    const category = document.createElement('span');
    category.className = 'project_card_category';
    category.textContent = translateText(project.categoryKey);

    const title = document.createElement('span');
    title.className = 'project_card_title';
    title.textContent = translateText(project.titleKey);

    const summary = document.createElement('span');
    summary.className = 'project_card_summary';
    summary.textContent = translateText(project.summaryKey);

    content.append(category, title, summary);
    visual.appendChild(image);
    card.append(visual, content);
    card.addEventListener('click', () => openProjectDetail(project, card));

    return card;
};

const updateProjectCardTranslations = () => {
    getProjectGrid()?.querySelectorAll('.project_card').forEach((card) => {
        const project = projectCards.find((item) => item.id === card.dataset.projectId);

        if (!project) {
            return;
        }

        card.setAttribute('aria-label', translateText(project.titleKey));
        card.querySelector('.project_card_category').textContent = translateText(project.categoryKey);
        card.querySelector('.project_card_title').textContent = translateText(project.titleKey);
        card.querySelector('.project_card_summary').textContent = translateText(project.summaryKey);
    });

    const detail = dom.table?.querySelector('.project_detail');
    const openProject = projectCards.find((item) => item.id === detail?.dataset.projectId);

    if (detail && openProject) {
        detail.querySelector('.project_detail_category').textContent = translateText(openProject.categoryKey);
        detail.querySelector('.project_detail_title').textContent = translateText(openProject.titleKey);
        detail.querySelector('.project_detail_text').textContent = translateText(openProject.detailKey);
        detail.querySelector('.project_repo_link').textContent = translateText('projectRepoLabel');
        detail.querySelector('.project_detail_close').setAttribute('aria-label', translateText('projectDetailClose'));
    }
};

const buildProjectGrid = () => {
    const grid = document.createElement('div');
    grid.className = 'project_grid';
    grid.setAttribute('aria-label', translateText('sectionProjects'));

    projectCards.forEach((project) => {
        grid.appendChild(createProjectCard(project));
    });

    return grid;
};

const renderProjectGridContent = ({ animate = false } = {}) => {
    if (!dom.introText || !dom.introMain || !dom.introNote) {
        return;
    }

    clearProjectCards();
    dom.introText.classList.add('has-projects');
    dom.introText.classList.toggle('is-final', true);
    dom.introMain.textContent = '';
    dom.introNote.textContent = '';
    updateSectionActionButton('');

    const grid = buildProjectGrid();
    dom.introText.appendChild(grid);
    state.currentIntroContent = {
        mainKey: 'sectionProjects',
        view: 'projectsGrid',
        isFinal: true
    };

    const cards = [...grid.querySelectorAll('.project_card')];

    if (!animate) {
        return;
    }

    anime.set(dom.introText, {
        opacity: 1,
        translateX: 0,
        translateY: 0,
        scale: 1
    });

    anime.set(cards, {
        opacity: 0,
        translateY: 28,
        scale: 0.94
    });

    anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [28, 0],
        scale: [0.94, 1],
        delay: anime.stagger(120),
        duration: 560,
        easing: 'easeOutBack(1.4)'
    });
};

const openProjectDetail = (project, sourceCard) => {
    if (!dom.table || state.projectDetailOpen) {
        return;
    }

    state.projectDetailOpen = true;

    const tableRect = dom.table.getBoundingClientRect();
    const cardRect = sourceCard.getBoundingClientRect();
    const detail = document.createElement('article');
    const targetRect = {
        left: tableRect.width * 0.06,
        top: tableRect.height * 0.08,
        width: tableRect.width * 0.88,
        height: tableRect.height * 0.84
    };

    detail.className = `project_detail project_detail--${project.tone} is-opening`;
    detail.dataset.projectId = project.id;
    detail.style.left = `${cardRect.left - tableRect.left}px`;
    detail.style.top = `${cardRect.top - tableRect.top}px`;
    detail.style.width = `${cardRect.width}px`;
    detail.style.height = `${cardRect.height}px`;

    detail.innerHTML = `
        <button class="project_detail_close" type="button" aria-label="${translateText('projectDetailClose')}">&times;</button>
        <div class="project_detail_visual" aria-hidden="true">
            <img class="project_detail_image" src="${project.image}" alt="">
        </div>
        <div class="project_detail_content">
            <p class="project_detail_category">${translateText(project.categoryKey)}</p>
            <h3 class="project_detail_title">${translateText(project.titleKey)}</h3>
            <p class="project_detail_text">${translateText(project.detailKey)}</p>
            <a class="project_repo_link" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">${translateText('projectRepoLabel')}</a>
        </div>
    `;

    dom.table.appendChild(detail);
    detail.addEventListener('click', (event) => {
        if (event.target.closest('.project_detail_close')) {
            event.preventDefault();
            event.stopPropagation();
            closeProjectDetail();
        }
    });
    detail.querySelector('.project_detail_image').addEventListener('error', (event) => {
        event.currentTarget.hidden = true;
    });

    const detailContent = detail.querySelector('.project_detail_content');
    const detailClose = detail.querySelector('.project_detail_close');
    const detailVisual = detail.querySelector('.project_detail_visual');

    anime.remove([detail, detailContent, detailClose, detailVisual]);
    anime.set([detailContent, detailClose], {
        opacity: 0,
        translateY: 14
    });

    anime({
        targets: detail,
        left: [cardRect.left - tableRect.left, targetRect.left],
        top: [cardRect.top - tableRect.top, targetRect.top],
        width: [cardRect.width, targetRect.width],
        height: [cardRect.height, targetRect.height],
        borderRadius: ['0.8rem', '1rem'],
        duration: 560,
        easing: 'easeInOutQuart',
        complete: () => {
            detail.classList.remove('is-opening');
            detail.style.left = `${targetRect.left}px`;
            detail.style.top = `${targetRect.top}px`;
            detail.style.width = `${targetRect.width}px`;
            detail.style.height = `${targetRect.height}px`;

            anime({
                targets: detailVisual,
                scale: [1.04, 1],
                duration: 420,
                easing: 'easeOutCubic'
            });

            anime({
                targets: [detailContent, detailClose],
                opacity: [0, 1],
                translateY: [14, 0],
                delay: anime.stagger(70),
                duration: 360,
                easing: 'easeOutCubic'
            });
        }
    });
};

const showProjectCards = () => {
    if (!dom.introText || state.isSectionActionAnimating) {
        return;
    }

    const animationId = state.sectionActionAnimationId + 1;
    state.sectionActionAnimationId = animationId;
    state.isSectionAnimating = true;
    state.isSectionActionAnimating = true;
    state.sectionDetails.proyectos = true;
    dom.sectionActionButton.disabled = true;
    dom.sectionActionButton.classList.add('is-busy');
    setButtonInteractivity([dom.prevButton, dom.nextButton].filter(Boolean), false);

    const exitingElements = [dom.introMain, dom.sectionActionButton].filter(Boolean);

    anime.remove(exitingElements);
    anime({
        targets: exitingElements,
        opacity: [1, 0],
        translateY: [0, -18],
        scale: [1, 0.94],
        delay: anime.stagger(70),
        duration: 260,
        easing: 'easeInQuad',
        complete: () => {
            if (animationId !== state.sectionActionAnimationId) {
                return;
            }

            dom.introMain.textContent = '';
            updateSectionActionButton('');
            renderProjectGridContent();

            const cards = [...getProjectGrid().querySelectorAll('.project_card')];
            anime.set(cards, { opacity: 0, translateY: 28, scale: 0.94 });
            anime({
                targets: cards,
                opacity: [0, 1],
                translateY: [28, 0],
                scale: [0.94, 1],
                delay: anime.stagger(120),
                duration: 560,
                easing: 'easeOutBack(1.4)',
                complete: () => {
                    state.isSectionAnimating = false;
                    state.isSectionActionAnimating = false;
                    setButtonInteractivity([dom.prevButton, dom.nextButton].filter(Boolean), true);
                }
            });
        }
    });
};

const animateMainTextChange = (nextKey) => {
    if (!dom.introMain) {
        return Promise.resolve();
    }

    dom.introMain.classList.remove('is-long-text');
    const currentCharacters = [...dom.introMain.textContent].map((character) => {
        const characterElement = document.createElement('span');
        characterElement.className = 'intro_letter';
        characterElement.textContent = character;
        return characterElement;
    });

    dom.introMain.replaceChildren(...currentCharacters);
    anime.remove(currentCharacters);

    return new Promise((resolve) => {
        anime({
            targets: currentCharacters,
            opacity: [1, 0],
            translateY: [0, -12],
            scale: [1, 0.78],
            duration: 180,
            delay: anime.stagger(18, { from: 'center' }),
            easing: 'easeInQuad',
            complete: () => {
                const nextText = translateText(nextKey);
                dom.introMain.classList.toggle('is-long-text', nextText.length > 22);
                const nextCharacters = [...nextText].map((character) => {
                    const characterElement = document.createElement('span');
                    characterElement.className = 'intro_letter';
                    characterElement.textContent = character;
                    return characterElement;
                });

                dom.introMain.replaceChildren(...nextCharacters);
                anime.set(nextCharacters, {
                    opacity: 0,
                    translateY: 16,
                    scale: 0.82
                });

                anime({
                    targets: nextCharacters,
                    opacity: [0, 1],
                    translateY: [16, 0],
                    scale: [0.82, 1],
                    duration: 460,
                    delay: anime.stagger(22, { from: 'center' }),
                    easing: 'easeOutBack(1.7)',
                    complete: resolve
                });
            }
        });
    });
};

const animateActionButtonToDetail = (detailKey) => {
    if (!dom.sectionActionButton) {
        return Promise.resolve();
    }

    const startWidth = dom.sectionActionButton.offsetWidth;
    const startHeight = dom.sectionActionButton.offsetHeight;
    const detailText = translateText(detailKey);
    const measuringElement = dom.sectionActionButton.cloneNode(false);
    const maxDetailWidth = Math.max(startWidth, Math.min(dom.introText.clientWidth, 620));

    anime.remove(dom.sectionActionButton);

    return new Promise((resolve) => {
        anime({
            targets: dom.sectionActionButton,
            opacity: [1, 0],
            translateY: [0, 8],
            scale: [1, 0.96],
            duration: 160,
            easing: 'easeInQuad',
            complete: () => {
                measuringElement.className = `${dom.sectionActionButton.className} is-detail`;
                measuringElement.textContent = detailText;
                measuringElement.style.position = 'absolute';
                measuringElement.style.visibility = 'hidden';
                measuringElement.style.pointerEvents = 'none';
                measuringElement.style.width = `${maxDetailWidth}px`;
                measuringElement.style.maxWidth = '100%';
                measuringElement.style.height = 'auto';
                dom.introText.appendChild(measuringElement);

                const endWidth = maxDetailWidth;
                const endHeight = Math.max(startHeight, measuringElement.scrollHeight + 8);
                measuringElement.remove();

                dom.sectionActionButton.style.width = `${startWidth}px`;
                dom.sectionActionButton.style.height = `${startHeight}px`;
                updateSectionActionButton(detailKey, state.language, 'detail');
                dom.sectionActionButton.textContent = '';
                dom.sectionActionButton.classList.add('is-busy');
                dom.sectionActionButton.style.opacity = '1';
                dom.sectionActionButton.style.transform = 'translateY(0) scale(0.98)';

                anime({
                    targets: dom.sectionActionButton,
                    width: [startWidth, endWidth],
                    height: [startHeight, endHeight],
                    opacity: [0.72, 1],
                    translateY: [4, 0],
                    scale: [0.98, 1],
                    duration: 420,
                    easing: 'easeInOutCubic',
                    complete: () => {
                        const detailTextElement = document.createElement('span');
                        detailTextElement.className = 'section_action_text';
                        detailTextElement.textContent = detailText;
                        dom.sectionActionButton.replaceChildren(detailTextElement);

                        anime.set(detailTextElement, {
                            opacity: 0,
                            translateY: 8
                        });

                        anime({
                            targets: detailTextElement,
                            opacity: [0, 1],
                            translateY: [8, 0],
                            duration: 280,
                            easing: 'easeOutCubic',
                            complete: () => {
                                const currentWidth = dom.sectionActionButton.offsetWidth;
                                const currentHeight = dom.sectionActionButton.offsetHeight;

                                dom.sectionActionButton.style.width = '';
                                dom.sectionActionButton.style.height = '';
                                const naturalWidth = dom.sectionActionButton.offsetWidth;
                                const naturalHeight = dom.sectionActionButton.offsetHeight;

                                dom.sectionActionButton.style.width = `${currentWidth}px`;
                                dom.sectionActionButton.style.height = `${currentHeight}px`;

                                anime({
                                    targets: dom.sectionActionButton,
                                    width: [currentWidth, naturalWidth],
                                    height: [currentHeight, naturalHeight],
                                    duration: 260,
                                    easing: 'easeOutCubic',
                                    complete: () => {
                                        dom.sectionActionButton.style.width = '';
                                        dom.sectionActionButton.style.height = '';
                                        dom.sectionActionButton.classList.remove('is-busy');
                                        resolve();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
};

const showSectionDetail = (section) => {
    if (
        !section.detailMainKey ||
        !section.detailActionKey ||
        state.sectionDetails[section.id] ||
        state.isSectionActionAnimating
    ) {
        return;
    }

    const animationId = state.sectionActionAnimationId + 1;
    state.sectionActionAnimationId = animationId;
    state.sectionDetails[section.id] = true;
    state.isSectionAnimating = true;
    state.isSectionActionAnimating = true;
    dom.sectionActionButton.disabled = true;
    dom.sectionActionButton.classList.add('is-busy');
    setButtonInteractivity([dom.sectionActionButton].filter(Boolean), false);
    setButtonInteractivity([dom.prevButton, dom.nextButton].filter(Boolean), false);

    Promise.all([
        animateMainTextChange(section.detailMainKey),
        animateActionButtonToDetail(section.detailActionKey)
    ]).then(() => {
        if (animationId !== state.sectionActionAnimationId) {
            return;
        }

        setIntroContent(getSectionContent(section));
        state.isSectionAnimating = false;
        state.isSectionActionAnimating = false;
        setButtonInteractivity([dom.prevButton, dom.nextButton].filter(Boolean), true);
    });
};

const showSection = (nextIndex, direction = 1) => {
    if (!sections.length || !dom.introText || !dom.introMain || !dom.introNote || state.isSectionAnimating) {
        return;
    }

    const normalizedIndex = (nextIndex + sections.length) % sections.length;

    if (normalizedIndex === state.currentSectionIndex) {
        return;
    }

    // Evita estados mezclados si el usuario presiona varias veces durante la transicion.
    state.isSectionAnimating = true;
    clearTimerList(state.introTimers);
    clearTimeout(state.portfolioPromptTimer);
    hideExpandArrow();
    hideIntroTimer();
    setButtonInteractivity([dom.prevButton, dom.nextButton].filter(Boolean), false);

    anime.remove(dom.introText);
    state.sectionActionAnimationId += 1;
    state.isSectionActionAnimating = false;
    const exitY = direction > 0 ? 18 : -18;
    const enterY = direction > 0 ? -16 : 16;

    anime({
        targets: dom.introText,
        opacity: [getOpacity(dom.introText), 0],
        translateX: 0,
        translateY: [0, exitY],
        scale: [1, 0.965],
        filter: ['blur(0rem)', 'blur(0.45rem)'],
        duration: 260,
        easing: 'easeInOutQuad',
        complete: () => {
            state.currentSectionIndex = normalizedIndex;
            updateNavigationButtons(state.language, { animate: true });
            setIntroContent(getSectionContent(sections[state.currentSectionIndex]));

            anime({
                targets: dom.introText,
                opacity: [0, 1],
                translateX: 0,
                translateY: [enterY, 0],
                scale: [0.985, 1],
                filter: ['blur(0.35rem)', 'blur(0rem)'],
                duration: 520,
                easing: 'easeOutExpo',
                complete: () => {
                    dom.introText.style.filter = '';
                    state.isSectionAnimating = false;
                    setButtonInteractivity([dom.prevButton, dom.nextButton].filter(Boolean), true);
                }
            });
        }
    });
};

const setupSectionNavigation = () => {
    if (!sections.length || !dom.prevButton || !dom.nextButton) {
        return;
    }

    updateNavigationButtons();

    dom.nextButton.addEventListener('click', () => {
        showSection(state.currentSectionIndex + 1, 1);
    });

    dom.prevButton.addEventListener('click', () => {
        showSection(state.currentSectionIndex - 1, -1);
    });

    window.addEventListener('resize', () => {
        updateNavigationButtons();
    });
};

const setupSectionActions = () => {
    if (!dom.sectionActionButton) {
        return;
    }

    dom.sectionActionButton.addEventListener('click', () => {
        if (state.isSectionAnimating) {
            return;
        }

        const currentSection = sections[state.currentSectionIndex];

        if (currentSection.id === 'proyectos') {
            showProjectCards();
            return;
        }

        if (currentSection.id === 'contacto') {
            showContactPanel();
            return;
        }

        showSectionDetail(currentSection);
    });
};

setupLanguageControls();
setupExpandControls();
setupSectionNavigation();
setupSectionActions();
runTableIntroAnimation();
