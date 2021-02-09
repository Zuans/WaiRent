const hairTypeModel = require('../model/hairType.model');
const { sendResponsesEmpty,sendResponses } = require('../utils/common.utils');
const HttpExeception = require('../utils/HttpExeception.utils');


class HairTypeController {

    async all(req,res) {
        const data = await hairTypeModel.find();
        if(!data) {
            return sendResponsesEmpty(res);
        }

        return sendResponses(res,data,'success get all hair type');
    }

    async detail(req,res) {
        const id = req.params.id;
        const data = await hairTypeModel.findById({
            hair_type_id : id,
        });
        if(!data) {
            return sendResponsesEmpty(res);
        }

        return sendResponses(res,data,`success get hair type with id ${id}`)
    }

    async create(req,res) {
        const created = await hairTypeModel.create(req.body);
        if(!created) {
            throw new HttpExeception(500,'Something went wrong');
        }

        return sendResponses(res,null,'new hair type has created');
    }

    async update(req,res) {      
        const id = {
            hair_type_id : req.params.id,
        };
        const updated = await hairTypeModel.updateById(req.body,id);
        if(!updated) {
            throw new HttpExeception(500,'Something went wrong');
        }
        
        return sendResponses(res,null,`hair type with id ${req.params.id} has updated !`);
    }

    async delete(req,res) {
        const id = req.params.id;
        const deleted = await hairTypeModel.deleteById({
            hair_type_id : id,
        });
        if(!deleted) {
            throw new HttpExeception(500,'Something went wrong');
        }

        return sendResponses(res,null,`hair type with id ${id} has deleted!`);
    }
}

module.exports = new HairTypeController;