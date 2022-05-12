"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomName = void 0;
const randomName = () => {
    const names = [
        'Dwight Schrute',
        'Michael Scott',
        'Pam Beesly',
        'Jim Halpert'
    ];
    return names[Math.floor(Math.random() * names.length)];
};
exports.randomName = randomName;
