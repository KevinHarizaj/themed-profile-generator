"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_data_json_1 = __importDefault(require("./profile-data.json"));
const getThemeNames = () => {
    return Object.keys(profile_data_json_1.default['themes']);
};
exports.default = getThemeNames;
