"use strict";

import {Application} from "tinytaskdb";
import composeWithMongoose from "graphql-compose-mongoose";
import userTypeConverter from "./user";
import taskTypeConverter from "./task";

const applicationTypeConverter = composeWithMongoose(Application, {
    fields: {
        remove: [
            "user",
            "task"
        ]
    }
});

applicationTypeConverter.addRelation("user", () => ({
    resolver: userTypeConverter.get("$findOne"),
    args: {
        _id:(source) => source.user
    },
}));

applicationTypeConverter.addRelation("task", () => ({
    resolver: taskTypeConverter.get("$findOne"),
    args: {
        _id:(source) => source.task
    },
}));

export default applicationTypeConverter;
