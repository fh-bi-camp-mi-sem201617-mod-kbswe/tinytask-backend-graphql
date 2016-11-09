"use strict";

import {User} from "tinytaskdb";
import composeWithMongoose from "graphql-compose-mongoose";

const userTypeConverter = composeWithMongoose(User, {});

export default userTypeConverter;
