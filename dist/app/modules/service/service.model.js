"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Service = (0, mongoose_1.model)("Service", ServiceSchema);
