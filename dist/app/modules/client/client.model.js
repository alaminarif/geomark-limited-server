"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    picture: { type: String },
    joinDate: { type: Date },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Client = (0, mongoose_1.model)("Client", clientSchema);
