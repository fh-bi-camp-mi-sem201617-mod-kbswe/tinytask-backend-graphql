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

GQC.rootMutation().addFields({
    createUser: userTypeConverter.getResolver("createOne"),
    updateUser: userTypeConverter.getResolver("updateById"),
    removeUser: userTypeConverter.getResolver("removeById"),
    createTask: taskTypeConverter.getResolver("createOne"),
    updateTask: taskTypeConverter.getResolver("updateById"),
    removeTask: taskTypeConverter.getResolver("removeById"),
    createRating: ratingTypeConverter.getResolver("createOne"),
    updateRating: ratingTypeConverter.getResolver("updateById"),
    removeRating: ratingTypeConverter.getResolver("removeById"),
    createApplication: applicationTypeConverter.getResolver("createOne"),
    updateApplication: applicationTypeConverter.getResolver("updateById"),
    removeApplication: applicationTypeConverter.getResolver("removeById")
});

export default GQC.buildSchema();
