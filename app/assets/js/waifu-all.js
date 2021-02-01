const minPriceEl = document.getElementById('waifu-min-price');
const minPriceTxt = document.getElementById('waifu-min-price-txt');
const maxPriceEl = document.getElementById('waifu-max-price');
const maxPriceTxt = document.getElementById('waifu-max-price-txt');
let minPriceVal = null;

// Change Price Value


minPriceEl.addEventListener('change',function(e){
    const price = 1000 * this.value;
    const txt = `Rp.${price}`;
    minPriceTxt.textContent = txt;
    minPriceVal = price;
})

console.log(maxPriceEl);

maxPriceEl.addEventListener('change',function(e){
    const price = 1000 * this.value;
    const txt = `Rp.${price}`;
    maxPriceTxt.textContent = txt;
    maxPriceVal = price;
})