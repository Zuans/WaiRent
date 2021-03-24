// Model
const waifuModel = require('../model/waifu.model');
const userModel = require("../model/user.model");
const dateTimeModel = require('../model/dateTime.model');
const hairTypeModel = require('../model/hairType.model');
const hobbyModel = require('../model/hobby.model');
const tagModel = require('../model/tag.model');

// Utils
const {
    sendResponses,
    sendResponsesEmpty,
    setCamelCase
} = require('../utils/common.utils');

const  { 
    classTags,
    getClassTags
} =  require('../utils/tags.utils');

// Helper
const { filterWaifuValidation } =  require('../helpers/validations.helpers');
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



    async filter(req,res) {        
        const params = filterWaifuValidation(req);
        const filterWaifus = await waifuModel.filter(params);

        return sendResponses(res,filterWaifus,'success get filter waifus');
    }


    async getByTags(req,res) {
        const { 
            tagType,
            tagValue,
        } = req.params;

        let allWaifu = [];
        const params = {};

        const selectedTag = getClassTags(tagType);
        if(!selectedTag) throw new Error('this tags type is not available');
        const selectedClass = selectedTag.class;
        const method = selectedTag.method;
        const tagResult = await selectedClass[method](tagValue);
        const tagID = Object.values(tagResult)[0];

        // set the params for query the waifu
        params[tagType] =  tagID;

        // if tagsType have specified method query to select waifu
        if(selectedClass.hasOwnProperty('waifuMethod')) {
            allWaifu = await waifuModel[selectedTag.waifuMethod](tagID);
        } else {
            allWaifu = await waifuModel.find(params);
        }   

        return sendResponses(res,allWaifu,'success get waifus by tag');

    }

    async sortBy(req,res) {
        // set extended query for order by
        const columnOrder = waifuModel.queryOrderBy(req.query);
        let { sql,params } = waifuModel.getLastQuery();
        // Add query and params order to last query
        sql += ` ${columnOrder};`;
        
        const result = await waifuModel.findBySQL(sql,params);
        if(!result) {
            return sendResponsesEmpty(res);
        }

        return sendResponses(res,result,'success get data');

    }

    async showAll(req, res) {
        const allDateTime = await dateTimeModel.find();
        const allHairType = await hairTypeModel.find();
        const popularTags = await tagModel.getPopular();
        const user = req.cookies.token ? await userModel.findByJWT(req.cookies.token) : null;

        // Check method GET
            const allWaifu = await waifuModel.find();
            console.log(allWaifu);
            if (!allWaifu) {
                return res.render('routes/waifu/waifu-all', {
                    title: 'All Waifu',
                    allWaifu: null,
                    allDateTime,
                    allHairType,
                    popularTags,
                    user,
                })
            }

            return res.render('routes/waifu/waifu-all', {
                title: 'All Waifu',
                allWaifu,
                allDateTime,
                allHairType,
                popularTags,
                user,
                errors: null
            });
    }


    async showTags(req, res) {
        const {
            tagType,
            tagValue
        } = req.params;

        //  assignable variable
        let allWaifu = [];
        const params = {};

        const popularTags = await tagModel.getPopular();
        const allDateTime = await dateTimeModel.find();
        const allHairType = await hairTypeModel.find();
        const user = req.cookies.token ? await userModel.findByJWT(req.cookies.token) : null;



        // Selected class dynamic
        const selectedTag = getClassTags(tagType);
        if(!selectedTag) throw new Error('this tags type is not available');
        const selectedClass = selectedTag.class;
        const method = selectedTag.method;
        const tagResult = await selectedClass[method](tagValue);

        // set Tag ID
        const tagID = Object.values(tagResult)[0];
        const tagName = Object.values(tagResult)[1];
        params[tagType] = tagID;
        
        // if tagsType have specified method query to select waifu
        if(selectedTag.hasOwnProperty('waifuQuery')) {
            allWaifu = await waifuModel[selectedTag.waifuQuery](tagID);
        }else {
            allWaifu = await waifuModel.find(params);
        }
        
        // const

        return res.render('routes/waifu/waifu-all', {
            title: 'All Waifu',
            allWaifu,
            allDateTime,
            allHairType,
            popularTags,
            user,
            errors: null,
            searchMsg : `result search for tag type "${tagName}"`
        });
    }

    async showHairLen(req,res) {
        const lengthType = req.params.lengthType;
        const popularTags = await tagModel.getPopular();
        const allDateTime = await dateTimeModel.find();
        const allHairType = await hairTypeModel.find();
        const allWaifu = await waifuModel.findByHairLength(lengthType);
        const user = req.cookies.token ? await userModel.findByJWT(req.cookies.token) : null;


        return res.render('routes/waifu/waifu-all', {
            title: 'All Waifu',
            allWaifu,
            allDateTime,
            allHairType,
            popularTags,
            user,
            errors: null,
            searchMsg : `result search for hair-length "${lengthType}"`
        });
    }

    async showDetail(req, res) {
        const id = {
            waifu_id: req.params.id,
        }
        const detailWaifu = await waifuModel.findById(id);
        res.render('routes/waifu/waifu-detail', {
            title: 'Detail waifu',
            detailWaifu,
        });
    }

    async showFilter(req,res) {

        const params = filterWaifuValidation(req);
        const filterWaifu = await waifuModel.filter(params);

        const allDateTime = await dateTimeModel.find();
        const allHairType = await hairTypeModel.find();
        const popularTags = await tagModel.getPopular();
        const user = req.cookies.token ? await userModel.findByJWT(req.cookies.token) : null;

        return res.render('routes/waifu/waifu-all', {
            title: 'All Waifu',
            allWaifu : filterWaifu,
            allDateTime,
            allHairType,
            popularTags,
            user,
            errors: null,
            searchMsg : `search result from filter "form"`
        });

    }


}




module.exports = new WaifuController;