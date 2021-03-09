const { classTags } = require('../utils/tags.utils');
const query = require('../db/conn')

class TagModel {

    constructor() {
        this.tableName = 'waifus';
        this.allTag = [];
    }


    async getAllTag() {
        const tags = Object.keys(classTags); 
        const allTag = await Promise.all( tags.map(async (tag) => {
            // desctruc selected tags and get info table
            const { tableName : relatedtable,
                    columnID,
                    columnVal
                } = classTags[tag];
            const foreignKey = `${this.tableName}.${tag}`;
            const sql = `SELECT ${tag} AS tag_id, 
                                "${tag}" AS tag_type,
                                ${relatedtable}.${columnVal} AS tag_name,
                                COUNT(${tag}) AS count_type
                         FROM ${this.tableName}
                         LEFT JOIN ${relatedtable} ON ${relatedtable}.${columnID} = ${foreignKey}
                         GROUP BY ${tag}`;
            const result = await query(sql);
            return result;
            })
        ).then(data => {
            const parsedRow = [];

            // Parse each row to object js
            data.forEach( d => {
                const parseRow = JSON.parse(JSON.stringify(d));
                parsedRow.push(...parseRow);
            });
            // Mapping for join hobby and hobby_2 
            const result = parsedRow.map( row => {
                const tagType = row["tag_type"];
                const tagID = row["tag_id"];
                const tagName = row["tag_name"];
                let tagCount = row["count_type"];
                if(tagType !== "hobby") return row;

                const hobby2 = parsedRow.find( row2 => {
                    if(row2["tag_type"] === "hobby_2" && row2["tag_id"] === tagID ) return row2
                });
                tagCount += hobby2["count_type"];
                return {
                    tag_id : tagID,
                    tag_type : tagType,
                    count_type : tagCount,
                    tag_name : tagName
                }
            })
            // chain with filter to delete hobby_2 data
            .filter( row => row["tag_type"] !== "hobby_2");
            return result;
        });
        this.allTag = allTag;
        return allTag;
    }


    async findTags(tags) {
        const allTag = await Promise.all( tags.filter( tag => tag !==  null ))
            .then( tags => {
                tags.map( async(tag) => {
                    console.log(tagType);
                    console.log(tagID);
                    const tagType = tag.toString().split("-")[0];
                    const tagID = tag.toString().split("-")[1];
                    const {
                        class : model,
                        method : methodName,
                        columnVal
                    } = classTags[tagType];
                    const row =  await model[methodName](tagID);
                    const result = {
                        type : tagType,
                        name : row[columnVal],
                    }
                    return result;
                })
            });
        return allTag;
    }

    sortPopular(limit = 5 ) {
        const result = this.allTag.sort(( a,b ) => {
            const countA = a["count_type"];
            const countB = b["count_type"];
            if( countA < countB ) {
                return 1;
            } else if( countA > countB ) {
                return -1;
            } else {
                return 0;
            }
        }).slice(0,limit);
        return result
    }


    async getPopular() {
        await this.getAllTag();
        const popularTag = this.sortPopular(3);
        return popularTag;
    }

}


module.exports = new TagModel;