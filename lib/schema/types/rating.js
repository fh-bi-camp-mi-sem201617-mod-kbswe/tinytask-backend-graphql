"use strict";

import {Rating} from "tinytaskdb";
import composeWithMongoose from "graphql-compose-mongoose";

const ratingTypeConverter = composeWithMongoose(Rating, {});

export default ratingTypeConverter;
