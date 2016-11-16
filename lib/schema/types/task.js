"use strict";

import {Task} from "tinytaskdb";
import composeWithMongoose from "graphql-compose-mongoose";

const taskTypeConverter = composeWithMongoose(Task, {});

export default taskTypeConverter;
