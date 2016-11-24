"use strict";

import {Task} from "tinytaskdb";
import composeWithMongoose from "graphql-compose-mongoose";
import userTypeConverter from "./user";
import ratingTypeConverter from "./rating";
import applicationTypeConverter from "./application";

const taskTypeConverter = composeWithMongoose(Task, {
    fields: {
        remove: [
            "createdBy",
            "assignedTo"
        ]
    }
});

taskTypeConverter.addRelation("createdBy", () => ({
    resolver: userTypeConverter.get("$findOne"),
    args: {
        _id: (source) => source.createdBy
    },
    projection: {id: 1}
}));

taskTypeConverter.addRelation("assignedTo", () => ({
    resolver: userTypeConverter.get("$findOne"),
    args: {
        _id: (source) => source.assignedTo
    },
    projection: {id: 1}
}));

taskTypeConverter.addRelation("ratings", () => ({
    resolver: ratingTypeConverter.get("$findMany"),
    args: {
        filter: (source) => ({
            task: source.id
        })
    },
    projection: {id: 1}
}));

taskTypeConverter.addRelation("applications", () => ({
    resolver: applicationTypeConverter.get("$findMany"),
    args: {
        filter: (source) => ({
            task: source.id
        })
    },
    projection: {id: 1}
}));

export default taskTypeConverter;
