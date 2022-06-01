"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_data_json_1 = __importDefault(require("./profile-data.json"));
const getRandomInt = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min) + min);
};
const getRandomProfile = (theme) => {
    const sex = profile_data_json_1.default['sex'][getRandomInt(profile_data_json_1.default['sex'].length)];
    const firstName = sex === 'male'
        ? profile_data_json_1.default['firstNamesMale'][getRandomInt(profile_data_json_1.default['firstNamesMale'].length)]
        : profile_data_json_1.default['firstNamesFemale'][getRandomInt(profile_data_json_1.default['firstNamesFemale'].length)];
    const lastName = profile_data_json_1.default['themes'][theme]['lastNames'][getRandomInt(profile_data_json_1.default['themes'][theme]['lastNames'].length)];
    const age = getRandomInt(profile_data_json_1.default['themes'][theme]['maxAge'] + 1, profile_data_json_1.default['themes'][theme]['minAge']);
    const job = profile_data_json_1.default['themes'][theme]['jobs'][getRandomInt(profile_data_json_1.default['themes'][theme]['jobs'].length)];
    return { firstName, lastName, sex, age, job };
};
exports.default = getRandomProfile;
