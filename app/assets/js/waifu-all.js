const minPriceEl = document.getElementById('waifu-min-price');
const minPriceTxt = document.getElementById('waifu-min-price-txt');
const maxPriceEl = document.getElementById('waifu-max-price');
const maxPriceTxt = document.getElementById('waifu-max-price-txt');
let minPriceVal = null;
let maxPriceVal = null;

// Switch Filter 
const waifuWrapper = document.getElementById('waifus-wrapper');
const filterSwitch = document.getElementById('filter-switch');
const waifuFilterEl = document.getElementsByClassName('waifu-filter')[0];

// Submit form
const filterForm = document.getElementById('filter-form');
filterForm.addEventListener('submit',function(e) {
    e.preventDefault();
    const waifuName = document.getElementById('waifu-name').value;
    const waifuAgeMin = document.getElementById('waifu-min-age').value;
    const waifuAgeMax = document.getElementById('waifu-max-age').value;
    const hairType = document.getElementById('hair-type').value;
    const dateTime = document.getElementById('date-time').value;
    const test = {
        waifuName,
        waifuAgeMin,
        waifuAgeMax,
        hairType,
        dateTime,
        minPriceVal,
        maxPriceVal
    }
    console.log(test);
})

// Change Price Value
minPriceEl.addEventListener('change',function(e){
    const price = 1000 * this.value;
    const txt = `Rp.${price}`;
    minPriceTxt.textContent = txt;
    minPriceVal = price;
})

maxPriceEl.addEventListener('change',function(e){
    const price = 1000 * this.value;
    const txt = `Rp.${price}`;
    maxPriceTxt.textContent = txt;
    maxPriceVal = price;
})



filterSwitch.addEventListener('click',function() {
    if(waifuFilterEl.classList.contains('waifu-filter-active')) {
        waifuWrapper.style.display = "flex";
        waifuFilterEl.classList.remove('waifu-filter-active');
        return;
    }
    waifuFilterEl.classList.add('waifu-filter-active');
    waifuWrapper.style.display = 'block';
})