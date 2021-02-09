const dateTimeModel = require('../model/dateTime.model');
const HttpException = require('../utils/HttpExeception.utils');


class DateTimeController {

    async all(req,res) {
        const data = await dateTimeModel.find();
        return res.status(200).send({
            status : 'success',
            data : data,
            msg : 'success get all date time data',
        })
    }

    async detail(req,res) {
        const id = {
            date_time_id : req.params.id,
        }
        const data = await dateTimeModel.findOne(id);

        return res.status(200).send({
            status : 'success',
            data,
            msg : 'sucess get specified date time',
        });
    }

    async create(req,res) {
        const created = await dateTimeModel.create(req.body);
        if(!created) {
            throw new HttpException(500,'Something went wrong');
        }

        return res.status(200).send({
            status : 'success',
            data : null,
            msg : 'sucess created new date time',
        });
    }

    async update(req,res) {
        const id = {
            date_time_id : req.params.id,
        }
        const updated = await dateTimeModel.updateById(req.body,id);
        console.log(updated);
        if(!updated) {
            throw new HttpException(500,'Something went wrong');
        }

        return res.status(200).send({
            status :  'success',
            data :  null,
            msg : `data time with id ${req.params.id} has been updated!`,
        });
    }


    async delete(req,res) {
        const id = {
            date_time_id : req.params.id,
        }
        const deleted = await dateTimeModel.deleteById(id);
        if(!deleted) {
            throw new HttpException(500,'Something went wrong');
        }

        return res.status(200).send({
            status : 'success',
            data : null,
            msg : `date time with id ${req.params.id} has been deleted`,
        });
    }


}

module.exports = new DateTimeController;