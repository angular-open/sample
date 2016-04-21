var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var mongoUrl = "mongodb://surendarr:Ss9715261931@ds011231.mlab.com:11231/profilerangular";

mongoose.connect(mongoUrl);

var profile = new Schema({
    searchUrl: {
        type: String,
        index: {
            unique: true
        }
    },
    basicInfo: {
        type: ObjectId,
        ref: 'basicInfos'
    },
    objective: String,
    about: String,
    knowledge: [
        {
            type: ObjectId,
            ref: 'knowledges'
        }
    ],
    skill: [
        {
            type: ObjectId,
            ref: 'skills'
        }
    ],
    exprience: [
        {
            type: ObjectId,
            ref: 'expriences'
        }
    ],
    education: [
        {
            type: ObjectId,
            ref: 'educations'
        }
    ],
});

var profileDB = mongoose.model("Profiles", profile);

var basicInfo = new Schema({
    profileImage: String,
    title: String,
    name: String,
    phoneNumber: Number,
    address: String,
    currentProfession: String
});

var basicInfoDB = mongoose.model("basicInfos", basicInfo);

var knowledge = new Schema({
    title: String
});

var knowledgeDB = mongoose.model("knowledges", knowledge);

var skill = new Schema({
    title: String,
    percentage: Number
});

var skillDB = mongoose.model("skills", skill);

var exprience = new Schema({
    from: Number,
    to: Number,
    title: String,
    subTitle: String,
});

var exprienceDB = mongoose.model("expriences", exprience);

var education = new Schema({
    from: Number,
    to: Number,
    title: String,
    subTitle: String,
});

var educationDB = mongoose.model("educations", education);

module.exports = {
    profileDB: profileDB,
    basicInfoDB: basicInfoDB,
    knowledgeDB: knowledgeDB,
    skillDB: skillDB,
    exprienceDB: exprienceDB,
    educationDB: educationDB
}