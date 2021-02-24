

const filterWaifuValidation = ({body}) => {
    const isDeffPrice = body['waifu-min-price'] === body['waifu-max-price'] ? true : false;
    return {
        name: body['waifu-name'] || null,
        age: {
            minAge: parseInt(body['waifu-min-age']) || 0,
            maxAge: parseInt(body['waifu-max-age']) || 999999,
        },
        "hair_type": parseInt(body['hair-type']) || null,
        "date_time": parseInt(body['date-time']) || null,
        price: {
            minPrice: isDeffPrice ? 0 : body['waifu-min-price'] * 1000,
            maxPrice: isDeffPrice ? 9999999 : body['waifu-max-price'] * 1000,
        }
    }
}



module.exports = {
    filterWaifuValidation
}