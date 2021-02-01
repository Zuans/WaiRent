

// Debounce Function 

// function debounce( callback, delay ) {
//     let timeout;
//     return function() {
//         clearTimeout( timeout );
//         timeout = setTimeout( callback, delay );
//     }
// }


// const setScrollTop = () => {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     translateVertical(scrollTop);
//     translateHorizontal(scrollTop);
// }
// const getScroll = debounce(setScrollTop,250);


// document.addEventListener('scroll',getScroll);


// Translate Animation function

const translateVertical = (scrollTop) => {
    const allEl = document.querySelectorAll('.translate-y');
    [...allEl].forEach(el => {
        const animaSpeed = el.dataset.speed;
        const translate = scrollTop * animaSpeed * 5;
        el.style.transform = `translateY(${translate}px)`;
    });
}

const translateHorizontal = (scrollTop) => {
    const allEl = document.querySelectorAll('.translate-x');
    [...allEl].forEach(el => {
        const animaSpeed = el.dataset.speed;
        const translate = scrollTop * animaSpeed * 5;
        el.style.transform = `translateX(${translate}px)`;
    })
}

document.addEventListener('scroll',function(){
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    translateVertical(scrollTop);
    translateHorizontal(scrollTop);
});