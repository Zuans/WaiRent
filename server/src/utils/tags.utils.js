const hairTypeModel = require('../model/hairType.model');
const dateTimeModel = require('../model/dateTime.model');
const hobbyModel = require('../model/hobby.model');

const classTags = {
    "hair_type"  : {
        class : hairTypeModel,
        tableName : "hair_types",
        columnID : "hair_type_id",
        columnVal : "name_type",
        method : 'findByNameOrID'
    },
    "date_time" : {
        class : dateTimeModel,
        tableName : "date_times",
        columnID : "date_time_id",
        columnVal : "time",
        method : 'findByTimeOrID',
    },
    "hobby" : {
        class : hobbyModel,
        tableName : "hobby",
        columnID : "hobby_id",
        method : "findByNameOrID",
        columnVal : "name",
        waifuQuery : "findByHobby"
    },
    "hobby_2" : {
        class : hobbyModel,
        tableName : "hobby",
        columnID : "hobby_id",
        columnVal : "name",
        method : "findByNameOrID",
        waifuQuery : "findByHobby"
    },
}

const getClassTags = (classType) => {
    const selectedTags = classTags[classType] ? classTags[classType] : null;
    if(!selectedTags) throw new Error('unavailable tag type');
    return selectedTags;
}


module.exports = {
    classTags,
    getClassTags
}