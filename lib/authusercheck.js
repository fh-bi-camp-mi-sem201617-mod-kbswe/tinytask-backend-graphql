import {User} from "tinytaskdb";
import request from "request";
import config from "../config.js";

export default (req, res, next) => {
    const tokenInfoUrl = "https://" + config.auth.domain + "/tokeninfo";

    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        process.nextTick(() => {
            const token = req.headers.authorization.split(" ")[1];
            const userId = req.user.sub;

            User.findOne({"_id": userId}, (err, user) => {
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
                    }, (err, res, body) => {
                        if (err) {
                            return next(err);
                        } else {
                            new User({
                                _id: userId,
                                displayName: body.nickname,
                                picture: body.picture,
                                address: ""
                            }).save(err => {
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
