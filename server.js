/* global callback */
/* global __dirname */
/* global process */
var express = require('express'),
    ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port = process.env.OPENSHIFT_NODEJS_PORT || '9080',
    app = express(),
    cors = require('cors'),
    path = require('path');
var bodyParser = require('body-parser');
var database = require('./database');
var passport = require('passport');
var session = require('express-session');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
app.use(session({
    secret: 'keyboard cat'
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

var priofileData = [];
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: "619996463687-u866fgb9nh3cgq9ckqbcfom11s843n3k.apps.googleusercontent.com",
    clientSecret: "x1mZaYu38-o-pUdsWLZAuM_Z",
    callbackURL: "http://localhost:9080/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {

        var email = "";
        var photo = "";
        if (profile && profile.emails && profile.emails.length > 0) {
            email = profile.emails[0].value;
        }

        if (profile && profile.photos && profile.photos.length > 0) {
            photo = profile.photos[0].value;
        }

        database.userDB.findOne({
            email: email
        }, function (err, user) {
            if (user) {
                database.userDB.update({ email: email }, { $set: { googleId: profile.id, googleImage: photo, googleAccessToken: accessToken } }, function (err, user) {
                    if (!err) {
                        database.userDB.findOne({ googleId: profile.id })
                            .exec(function (error, user) {
                                console.log(user)
                                return done(err, user);
                            });
                    }
                });
            } else {
                var data = {
                    email: email,
                    googleId: profile.id,
                    displayName: profile.displayName,
                    googleImage: photo,
                    googleAccessToken: accessToken
                };

                var googleSave = new database.userDB(data);

                googleSave.save(function (error) {
                    if (!error) {
                        database.userDB.findOne({ googleId: profile.id })
                            .exec(function (error, user) {
                                console.log(user)
                                return done(err, user);
                            });
                    }
                });

            }
        });
    }
));

passport.use(new LinkedInStrategy({
    consumerKey: "753z7h0lu8d625",
    consumerSecret: "Pu1gHDJ5EAp3RCkl",
    callbackURL: "http://localhost:9080/auth/linkedin/callback",
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
},
    function (token, tokenSecret, profile, done) {
        var email = "";
        if (profile && profile.emails && profile.emails.length > 0) {
            email = profile.emails[0].value;
        }
        database.userDB.findOne({
            email: email
        }, function (err, user) {
            if (user) {
                database.userDB.update({ email: email }, { $set: { linkedinId: profile.id, linkedAccessToken: token } }, function (err, user) {
                    if (!err) {
                        database.userDB.findOne({ linkedinId: profile.id })
                            .exec(function (error, user) {
                                console.log(user)
                                return done(err, user);
                            });
                    }
                });
            } else {
                var data = {
                    email: email,
                    linkedinId: profile.id,
                    displayName: profile.displayName,
                    linkHeader: profile._json.headline,
                    linkedAccessToken: token,
                };

                var linkSave = new database.userDB(data);

                linkSave.save(function (error) {
                    if (!error) {
                        database.userDB.findOne({ linkedinId: profile.id })
                            .exec(function (error, user) {
                                console.log(user)
                                return done(err, user);
                            });
                    }
                });
            }
        });

    }

));

app.get('/auth/linkedin', passport.authenticate('linkedin'), function (req, res) {
    //console.log(res);
});

app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/success/file?token=surendar');
    });

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login',
            , 'https://www.googleapis.com/auth/plus.profile.emails.read']
    }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/success/file?token=surendar');
    });

app.get('/user/linkedIn/detail', function (req, res) {
    database.userDB.find()
        .exec(function (error, posts) {
            res.send(JSON.stringify(posts));
        });
});


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
            var result = JSON.stringify(profile, null, "\t");
            if (result != "null") {
                res.send(result);
            } else {
                var err = {
                    message: "url not exit please create",
                    status: "1020"
                };
                res.status(403).send(err);
            }

        });

});

app.get('/success/file', function (req, res) {
    res.sendFile('loginSuccess.html', { root: path.join(__dirname, '/') });
});

app.get('/api/addProfile', function (req, res) {
    res.send(priofileData);
});

app.get('/api/editProfile', function (req, res) {
    res.send(priofileData);
});

app.post('/api/checkProfile', function (req, res) {
    var objData = req.body;
    database.profileDB.findOne({ searchUrl: objData.profileUrl })
        .exec(function (error, profile) {
            var result = JSON.stringify(profile, null, "\t");
            if (result != "null") {
                res.send(result);
            } else {
                var err = {
                    message: "url not exit please create",
                    status: "1020"
                };
                res.status(403).send(err);
            }
        });
});

app.post('/api/createUser', function (req, res) {
    var objData = req.body;

    var user = new database.userDB(objData);
    user.save(function (error) {
        if (!error) {
            database.userDB.find({ username: objData.username })
                .select('username', 'email', 'profile')
                .populate('Profiles', 'searchUrl')
                .exec(function (error, posts) {
                    console.log(JSON.stringify(posts))
                })
        }
    });
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

