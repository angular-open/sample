/* global callback */
/* global __dirname */
/* global process */
var express = require('express'),
    ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port = process.env.OPENSHIFT_NODEJS_PORT || '9080',
    app = express(),
    cors = require('cors');
var bodyParser = require('body-parser');
var database = require('./database');

var priofileData = [];
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send("hello");
});

app.post('/api/getProfile', function (req, res) {
    var objData = req.body;
    database.profileDB.findOne({ searchUrl: objData.profileUrl })
        .populate('basicInfo')
        .populate('education')
        .populate('exprience')
        .populate('skill')
        .populate('knowledge')
        .exec(function (error, profile) {
            var result = JSON.stringify(profile, null, "\t")
            if (result != "null") {
                res.send(result);
            } else {
                var err = {
                    message: "url not exit please create",
                    status: "1020"
                };
                res.status(403).send(err);
            }

        })

});

app.get('/api/addProfile', function (req, res) {
    res.send(priofileData);
});

app.get('/api/editProfile', function (req, res) {
    res.send(priofileData);
});

app.get('/api/checkProfile', function (req, res) {
    res.send(priofileData);
});

console.log(__dirname);
app.listen(port, ip);

var data = {
    "searchUrl": "sample",
    "basicInfo": {
        "profileImage": "",
        "title": "Mr",
        "name": "Sample Name",
        "phoneNumber": 9715261931,
        "address": "No. 50 second cross, kargil nagar, velrampet.",
        "currentProfession": "Web & UI Developer"
    },
    "objective": "These samples of resumes and cover letters are intended purely as a guide to what is possible. Do not simply try to copy them for your own resume, because your resume should be unique (like you!).",
    "about": "These samples of resumes and cover letters are intended purely as a guide to what is possible. Do not simply try to copy them for your own resume, because your resume should be unique (like you!).",
    "knowledge": [
        {
            "title": "Knowledge you gainde",
        },
        {
            "title": "Knowledge you gainde",
        },
    ],
    "skill": [
        {
            "title": "Technologies",
            "percentage": 80
        },
        {
            "title": "Specialities",
            "percentage": 60
        }
    ],
    "exprience": [
        {
            "from": 2015,
            "to": 2016,
            "title": "Example Data (Profession)",
            "subTitle": "Company name",
            "editInfo": false,
            "addAnim": false,
            "removeAnim": false
        }
    ],
    "education": [
        {
            "from": 2015,
            "to": 2016,
            "title": "Institue Name",
            "subTitle": "Course or Class",
            "editInfo": false,
            "addAnim": false,
            "removeAnim": false
        }
    ]
};

priofileData.unshift(data);
var datas = {}
datas.searchUrl = data.searchUrl;
datas.objective = data.objective;
datas.about = data.about;
database.profileDB.findOne({ searchUrl: "sample" }, function (err, data) {
    if (!err) {
        if (!data) {
            saveBasicInfo();
        } else {
            console.log("ssss", "exit");
        }
    }
});

function saveBasicInfo() {
    var basicInfo = new database.basicInfoDB(data.basicInfo);
    basicInfo.save(function (err) {
        if (!err) {
            datas.basicInfo = basicInfo._id;
            saveKnowledge();
        }
    });
}


function saveKnowledge() {
    database.knowledgeDB.collection.insert(data.knowledge, onInsert);

    function onInsert(err, docs) {
        if (!err) {
            datas.knowledge = docs.insertedIds;
            saveSkill();
        }
    }
}

function saveSkill() {
    database.skillDB.collection.insert(data.skill, onInsert);

    function onInsert(err, docs) {
        if (!err) {
            datas.skill = docs.insertedIds;
            saveExprience();
        }
    }
}

function saveExprience() {
    database.exprienceDB.collection.insert(data.exprience, onInsert);

    function onInsert(err, docs) {
        if (!err) {
            datas.exprience = docs.insertedIds;
            saveEducation();
        }
    }
}

function saveEducation() {
    database.educationDB.collection.insert(data.education, onInsert);

    function onInsert(err, docs) {
        if (!err) {
            datas.education = docs.insertedIds;
            saveProfile();
        }
    }
}

function saveProfile() {
    var profile = new database.profileDB(datas);

    profile.save(function (error) {
        if (!error) {
            database.profileDB.find()
                .populate('basicInfo')
                .populate('education')
                .populate('exprience')
                .populate('skill')
                .populate('knowledge')
                .exec(function (error, posts) {
                    console.log(JSON.stringify(posts))
                })
        }
    });
}

