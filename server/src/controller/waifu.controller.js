// Model
const waifuModel = require('../model/waifu.model');
const dateTimeModel = require('../model/dateTime.model');
const hairTypeModel = require('../model/hairType.model');
const hobbyModel = require('../model/hobby.model');
// Utils
const {
    sendResponses,
    sendResponsesEmpty,
    setCamelCase
} = require('../utils/common.utils');
const HttpExeception = require('../utils/HttpExeception.utils');

class WaifuController {

    constructor() {}

    async all(req, res) {
        const allWaifu = await waifuModel.find();
        return sendResponses(res, allWaifu, 'Success get all waifu');
    }

    async detail(req, res) {
        const id = req.params.id;
        const detailWaifu = await waifuModel.findById({
            waifu_id: id
        });
        return sendResponses(res, detailWaifu, `Success get waifu with id ${id}`);
    }



    async create(req, res) {
        const created = await waifuModel.create(req.body);
        if (!created) {
            throw new HttpExeception(500, 'Something went wrong');
        }
        return res.status(200).send({
            status: 'Success',
            msg: 'waifu has been added',
        })
    }

    // MAKE DELETE AND UPDATE METHOD !!
    async delete(req, res) {
        const id = {
            waifu_id: req.params.id,
        };
        const deleted = await waifuModel.deleteById(id);
        if (!deleted) {
            throw new HttpExeception(500, 'Something went wrong');
        }
        return res.status(200).send({
            status: 'success',
            msg: `success deleted user with id ${req.params.id}`
        })
    }

    async update(req, res) {
        const id = {
            waifu_id: req.params.id,
        };
        const updated = await waifuModel.updateById(req.body, id);
        if (!updated) {
            throw new HttpExeception(500, 'Something went wrong');
        }
        res.status(200).send({
            status: 'success',
            msg: `success updated user with id ${req.params.id}`
        });
    }


    async setRating(req, res) {
        const id = req.params.id;
        const increased = await waifuModel.incRating(req.body, id);
        if (!increased) {
            throw new HttpExeception(500, 'Something went wrong');
        };

        return sendResponses(res, null, 'Waifu Rating has increased!');
    }

    async topRating(req, res) {
        const topRating = await waifuModel.findTopRating();
        return sendResponses(res, topRating, 'success get all top rating');
    }
    // Method For Pages

    async showAll(req, res) {
        const allDateTime = await dateTimeModel.find();
        const allHairType = await hairTypeModel.find();
        const popularTags = await waifuModel.popularTags();
        // Check method GET
        if (req.method == "GET") {
            const allWaifu = await waifuModel.find();
            if (!allWaifu) {
                return res.render('routes/waifu-all', {
                    title: 'All Waifu',
                    allWaifu: null,
                    allDateTime,
                    allHairType,
                    popularTags,
                })
            }

            return res.render('routes/waifu-all', {
                title: 'All Waifu',
                allWaifu,
                allDateTime,
                allHairType,
                popularTags,
                errors: null
            });
        }

        // If method POST
        const {
            body
        } = req;
        const isDeffPrice = body['waifu-min-price'] === body['waifu-max-price'] ? true : false;
        const params = {
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
        const filterWaifus = await waifuModel.filter(params);
        return res.render('routes/waifu-all', {
            title: 'All Waifu',
            allWaifu: filterWaifus,
            allDateTime,
            allHairType,
            popularTags,
            errors: null
        });
    }

    async showTags(req, res) {
        const {
            tagType,
            tagValue
        } = req.params;


        const popularTags = await waifuModel.popularTags();
        const allDateTime = await dateTimeModel.find();
        const allHairType = await hairTypeModel.find();

        const classTags = {
            "hair_type"  : {
                class : hairTypeModel,
                method : 'findByNameOrID'
            },
            "date_time" : {
                class : dateTimeModel,
                method : 'findByTimeOrID',
            },
            "hobby" : {
                class : hobbyModel,
                method : "findByNameOrID",
            }
        }

        // Selected class dynamic
        const classSelected = classTags[tagType].class;
        const method = classTags[tagType].method;
        const tagRow = await classSelected[method](tagValue);
        if(!tagRow) throw new Error('this tag not avaible');
        

        // get Tag ID
        const tagsID = Object.values(tagRow)[0];
        const params = {};
        params[tagType] = tagsID;
        const allWaifu = await waifuModel.find(params);


        return res.render('routes/waifu-all', {
            title: 'All Waifu',
            allWaifu,
            allDateTime,
            allHairType,
            popularTags,
            errors: null
        });
    }

    async showDetail(req, res) {
        const id = {
            waifu_id: req.params.id,
        }
        const detailWaifu = await waifuModel.findById(id);
        if (!detailWaifu) {
            return res.render('routes/waifu-detail', {
                title: 'Detail waifu',
                detailWaifu: null,
            });
        }
        res.render('routes/waifu-detail', {
            title: 'Detail waifu',
            detailWaifu,
        });
    }

}




module.exports = new WaifuController;