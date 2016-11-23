"use strict";

import express from "express";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import {json} from "body-parser";
import schema from "./schema";

const port = process.env.PORT || 8080;
const mongodb = process.env.MONGO_DB || "mongodb://localhost/tinytask";

const app = express();

app.use(json());
app.use(cors());

app.use("/graphql", function (req, res, next) {
    // Validate token here

    return next();
}, graphqlHTTP(req => ({
    schema,
    graphiql: true,
    pretty: true
})));

mongoose.Promise = global.Promise;
// TODO: Change to real address
mongoose.connect(mongodb);

const server = app.listen(port, () => {
    console.log("Listening at port", server.address().port);
});
