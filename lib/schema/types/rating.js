"use strict";

import {Rating} from "tinytaskdb";
import composeWithMongoose from "graphql-compose-mongoose";
import userTypeConverter from "./user";
import taskTypeConverter from "./task";

const ratingTypeConverter = composeWithMongoose(Rating, {
    fields: {
        remove: [
            "assignedTo",
            "task"
        ]
    }
});

ratingTypeConverter.addRelation("assignedTo", () => ({
    resolver: userTypeConverter.get("$findOne"),
    args: {
        _id: (source) => source.id
    },
    projection: {id: 1}
}));

ratingTypeConverter.addRelation("task", () => ({
    resolver: taskTypeConverter.get("$findOne"),
    args: {
        _id: (source) => source.id
    },
    projection: {id: 1}
}));

export default ratingTypeConverter;
