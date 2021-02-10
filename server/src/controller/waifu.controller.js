const waifuModel = require('../model/waifu.model');
const { sendResponses, sendResponsesEmpty } = require('../utils/common.utils');
const HttpExeception = require('../utils/HttpExeception.utils');

class WaifuController {



    async all(req,res)  {
        const allWaifu = await waifuModel.find();
        return sendResponses(res,allWaifu,'Success get all waifu');
    }

    async detail(req,res)  {
        const id = req.params.id;
        const detailWaifu  = await waifuModel.findById({ 
            waifu_id : id 
        });
        return sendResponses(res,detailWaifu,`Success get waifu with id ${id}`);
    }



    async create(req,res) {
        const created = await waifuModel.create(req.body);
        if(!created) {
            throw new HttpExeception(500,'Something went wrong');
        }
        return res.status(200).send({
            status : 'Success',
            msg : 'waifu has been added',
        })
    }

    // MAKE DELETE AND UPDATE METHOD !!
    async delete(req,res) {
        const id = {
            waifu_id : req.params.id,
        };
        const deleted = await waifuModel.deleteById(id);
        if(!deleted) {
            throw new HttpExeception(500,'Something went wrong');
        }
        return res.status(200).send({
            status : 'success',
            msg : `success deleted user with id ${req.params.id}`
        })
    }

    async update(req,res) {
        const id = {
            waifu_id : req.params.id,
        };
        const updated = await waifuModel.updateById(req.body,id);
        if(!updated) {
            throw new HttpExeception(500,'Something went wrong');
        }
        res.status(200).send({
            status : 'success',
            msg : `success updated user with id ${req.params.id}`
        });
    }

    // Method For Pages

    async showAll(req,res) {
        const allWaifu = await waifuModel.find();
        if(!allWaifu) {
            return sendResponsesEmpty();
        }
        res.render('routes/waifu-all',{
            title : 'All Waifu',
            allWaifu,
        });
    }

    async showDetail(req,res) {
        const id = {
            waifu_id : req.params.id,
        }
        const detailWaifu = await waifuModel.find(id);
        if(!detailWaifu) {
            return sendResponsesEmpty();
        }
        res.render('routes/waifu-all',{
            title : 'All Waifu',
            detailWaifu,
        });
    }

    async setRating(req,res) {
        const id = req.params.id;
        const increased = await waifuModel.incRating(req.body,id);
        if(!increased) {
            throw new HttpExeception(500,'Something went wrong');
        };

        return sendResponses(res,null,'Waifu Rating has increased!');
    }

}




module.exports = new WaifuController;