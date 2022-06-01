"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const random_profile_1 = __importDefault(require("./random-profile"));
const generateProfiles = (theme, numberOfProfiles = 3) => {
    const profiles = [];
    for (let i = 0; i < numberOfProfiles; i++) {
        profiles.push((0, random_profile_1.default)(theme));
    }
    return profiles;
};
exports.default = generateProfiles;
