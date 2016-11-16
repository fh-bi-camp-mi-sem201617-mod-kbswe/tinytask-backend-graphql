"use strict";

import {GQC} from "graphql-compose";
import userTypeConverter from "./types/user";
import taskTypeConverter from "./types/task";

GQC.rootQuery().addFields({
    user: userTypeConverter.getResolver("findById"),
    users: userTypeConverter.getResolver("findMany"),
    task: taskTypeConverter.getResolver("findById"),
    tasks: taskTypeConverter.getResolver("findMany")
});

export default GQC.buildSchema();
