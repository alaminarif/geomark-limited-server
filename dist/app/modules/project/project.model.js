"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    client: { type: mongoose_1.Schema.Types.ObjectId, ref: "Client", required: true },
    picture: { type: String },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Project = (0, mongoose_1.model)("Project", ProjectSchema);
