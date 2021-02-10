const hobbyModel = require('../model/hobby.model');
const { sendResponses, sendResponsesEmpty} = require('../utils/common.utils');
const HttpExeception = require('../utils/HttpExeception.utils');

class HobbyController {

    async all(req,res) {
        const data = await hobbyModel.find(req.body);
        if(!data) {
            return sendResponsesEmpty(res);
        }

        return sendResponses(res,data,'succes get all hobby!');
    }

    async detail(req,res) {
        const id = {
            hobby_id : req.params.id,
        };
        const data = await hobbyModel.findById(id);
        if(!data) {
            return sendResponsesEmpty(res);
        }

        return sendResponses(res,data,`success get hobby with id ${req.params.id}`);
    }

    async create(req,res) {
        const created = await hobbyModel.create(req.body);
        if(!created) {
            throw new HttpExeception(500,'Something went wrong');
        }
        
        return sendResponses(res,null,'Success create new hobby !');
    }

    async update(req,res) {
        const id = {
            hobby_id : req.params.id,
        };
        const updated = await hobbyModel.updateById(req.body,id);
        if(!updated) {
            throw new HtteExeception(500,'Something went wrong');
        }

        return sendResponses(res,null,`hobby with id ${req.params.id} has updated !`)

    }
    
    async delete(req,res) {
        const id = {
            hobby_id : req.params.id,
        }
        const deleted = await hobbyModel.deleteById(id);
        if(!deleted) {
            throw new HttpExeception(500,'something went wrong');
        };
        return sendResponses(res,null,`hobby with id ${req.params.id} has deleted !`);
    }
}


module.exports = new HobbyController;