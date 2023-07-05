const { Activity } = require("../models");

const activityExistById = async(aid) =>{
    const activityExist = await Activity.findById(aid);
    
    if(!activityExist){
        throw new Error(`There is no activity with the id ${aid}`);
    }
}

module.exports = {
    activityExistById
}