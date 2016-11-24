"use strict";

import {User} from "tinytaskdb";
import composeWithMongoose from "graphql-compose-mongoose";
import taskTypeConverter from "./task";
import ratingTypeConverter from "./rating";
import applicationTypeConverter from "./application";

const userTypeConverter = composeWithMongoose(User, {});

userTypeConverter.addRelation("createdTasks", () => ({
    resolver: taskTypeConverter.get("$findMany"),
    args: {
        filter: (source) => ({
            createdBy: source.id
        })
    },
    projection: {id: 1}
}));

userTypeConverter.addRelation("assignedTasks", () => ({
    resolver: taskTypeConverter.get("$findMany"),
    args: {
        filter: (source) => ({
            assignedTo: source.id
        })
    },
    projection: {id: 1}
}));

userTypeConverter.addRelation("ratings", () => ({
    resolver: ratingTypeConverter.get("$findMany"),
    args: {
        filter: (source) => ({
            assignedTo: source.id
        })
    },
    projection: {id: 1}
}));

userTypeConverter.addRelation("applications", () => ({
    resolver: applicationTypeConverter.get("$findMany"),
    args: {
        filter: (source) => ({
            user: source.id
        })
    },
    projection: {id: 1}
}));

export default userTypeConverter;
