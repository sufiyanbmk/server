"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "please add a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please add a password"]
    },
});
const Admin = (0, mongoose_1.model)("Admin", adminSchema, "admin");
exports.default = Admin;
