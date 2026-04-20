// Animations for the table

const table = document.querySelector('.table_1');

anime ({
    targets: '.table_1',
    translateY: [-400, 0],
    duration: 3400,
    easing: 'easeOutElastic(1, 0.5)'
    
});


// Code in charge of the tables


const sections = [Home, Sobre_mi, Servicios, Projectos, Contacto];

let currentSectionIndex = 0;

const nextButton = document.querySelector('.Button_2');
const prevButton = document.querySelector('.Button_1');

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