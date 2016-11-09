"use strict";

import {GQC} from "graphql-compose";
import userTypeConverter from "./types/user";

GQC.rootQuery().addFields({
    user: userTypeConverter.getResolver("findById"),
    users: userTypeConverter.getResolver("findMany")
});
