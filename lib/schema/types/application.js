"use strict";

import {Application} from "tinytaskdb";
import composeWithMongoose from "graphql-compose-mongoose";

const applicationTypeConverter = composeWithMongoose(Application, {});

export default applicationTypeConverter;
