"use strict";

import {GQC} from "graphql-compose";
import userTypeConverter from "./types/user";
import taskTypeConverter from "./types/task";
import ratingTypeConverter from "./types/rating";
import applicationTypeConverter from "./types/application";

GQC.rootQuery().addFields({
    user: userTypeConverter.getResolver("findById"),
    users: userTypeConverter.getResolver("findMany"),
    task: taskTypeConverter.getResolver("findById"),
    tasks: taskTypeConverter.getResolver("findMany"),
    rating: ratingTypeConverter.getResolver("findById"),
    ratings: ratingTypeConverter.getResolver("findMany"),
    application: applicationTypeConverter.getResolver("findById"),
    applications: applicationTypeConverter.getResolver("findMany")
});

export default GQC.buildSchema();
