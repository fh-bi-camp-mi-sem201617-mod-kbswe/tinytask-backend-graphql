"use strict";

import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import {json} from "body-parser";
import schema from "./schema";

const app = express();

app.use(json());
app.use("/graphql", graphqlHTTP(req => ({
    schema,
    graphiql: true,
    pretty: true
})));

mongoose.Promise = global.Promise;
// TODO: Change to real address
mongoose.connect("mongodb://localhost/tinytask");

const server = app.listen(8080, () => {
    console.log("Listening at port", server.address().port);
});
