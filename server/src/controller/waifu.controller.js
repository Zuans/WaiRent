const waifuModel = require('../model/waifu.model');
const HttpException = require('../utils/HttpExeception.utils');

class WaifuController {



    async all(req,res)  {
        const allWaifu = await waifuModel.find();
        console.log(allWaifu);
        res.render('routes/waifu-all',{
            title : 'All Waifu'
        });
    }

    async detail(req,res)  {
        const id = req.params.id;
        const detailWaifu  = await waifuModel.findOne({ waifu_id : id });
        console.log(detailWaifu);
        res.render('routes/waifu-detail',{
            title : 'Waifu Detail',
            detailWaifu,
        });
    }



    async create(req,res) {
        const created = await waifuModel.create(req.body);
        if(!created) {
            throw new HttpException(500,'Something went wrong');
        }
        return res.status(200).send({
            status : 'Success',
            msg : 'waifu has been added',
        })
    }

    // MAKE DELETE AND UPDATE METHOD !!
    async delete(req,res) {
        const id = req.params.id;
        const deleted = await waifuModel.delete(id);
        if(!deleted) {
            throw new HttpException(500,'Something went wrong');
        }
        return res.status(200).send({
            status : 'success',
            msg : `success deleted user with id ${id}`
        })
    }

    async update(req,res) {
        const id = req.params.id
        const updated = await waifuModel(req.body,id);
        if(!updated) {
            throw new HttpException(500,'Something went wrong');
        }
        res.status(200).send({
            status : 'success',
            msg : `success updated user with id ${id}`
        });
    }

}




module.exports = new WaifuController;