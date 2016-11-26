"use strict";

import express from "express";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import {json, urlencoded} from "body-parser";
import jwt from "express-jwt";

import config from "../config";
import authusercheck from "./authusercheck";

import schema from "./schema";

const port = process.env.PORT || 8080;
const mongodb = process.env.MONGO_DB || "mongodb://localhost/tinytask";

const app = express();

app.use(json());
app.use(cors());
app.use(urlencoded({extended: true}));

app.use(jwt({
    audience: config.auth.clientID,
    issuer: "https://" + config.auth.domain + "/",
    secret: new Buffer(config.auth.clientSecret, "base64")
}));

app.use("/", authusercheck, graphqlHTTP(req => ({
    schema,
    graphiql: true,
    pretty: true
})));

mongoose.Promise = global.Promise;
mongoose.connect(mongodb);

const server = app.listen(port, () => {
    console.log("Listening at port", server.address().port);
});
