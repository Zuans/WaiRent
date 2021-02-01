const burgerBtn = document.getElementById('act-nav');
const navEl = document.getElementsByTagName('nav')[0];


burgerBtn.addEventListener('click',function(){
    if(navEl.classList.contains('nav-active')) {
        navEl.classList.remove('nav-active');
        return;
    }

    navEl.classList.add('nav-active');
})