"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const catagorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "please add a title"]
    },
    description: String,
});
const Catagory = (0, mongoose_1.model)("Catagory", catagorySchema, "catagory");
exports.default = Catagory;
