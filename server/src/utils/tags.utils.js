const hairTypeModel = require('../model/hairType.model');
const dateTimeModel = require('../model/dateTime.model');
const hobbyModel = require('../model/hobby.model');

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
        waifuQuery : "findByHobby"
    }
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