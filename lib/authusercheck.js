var TinyTaskDB = require("tinytaskdb");
var request = require("request");

var config = require("../config.js");

module.exports = function (req, res, next) {
    var tokenInfoUrl = "https://" + config.auth.domain + "/tokeninfo";

    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        process.nextTick(function () {
            var token = req.headers.authorization.split(" ")[1];
            var userId = req.user.sub;

            TinyTaskDB.User.findOne({"_id": userId}, function (err, user) {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    request({
                        url: tokenInfoUrl,
                        method: "POST",
                        json: {
                            id_token: token
                        }
                    }, function (err, res, body) {
                        if (err) {
                            return next(err);
                        } else {
                            var picture = body.picture;
                            var displayName = body.nickname;

                            // save user data
                            var newUser = new TinyTaskDB.User({
                                _id: userId,
                                displayName: displayName,
                                picture: picture,
                                address: ""
                            });

                            newUser.save(function (err) {
                                if (err) {
                                    return next(err);
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    next();
};
