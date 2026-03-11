// const table = document.querySelector('.table_1');

// anime ({
//     targets: '.table_1',
//     translateY: [-300, 0],
//     rotate: [
//       { value: -10, duration: 800, easing: 'easeInOutSine' },
//       { value: 10, duration: 800, easing: 'easeInOutSine' }
//     ],
//     loop: true,
//     direction: 'alternate'
    
// });

const tl = anime.timeline({});

tl.add({
   targets: '.table_1',
    translateY: [-300, 0, -30, 0],
    rotate: [0, 0, -3, 3, -1, 1, 0],
    duration: 3000,
    easing: 'easeOutElastic(1, 0.5)'
})
tl.add({
    
});