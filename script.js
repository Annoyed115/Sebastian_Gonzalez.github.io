// variables for the table and buttons

const table = document.querySelector('.table_1');
const buttons = document.querySelectorAll('.Button_1, .Button_2');


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


// Code in charge of the tables


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
