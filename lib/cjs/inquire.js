"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require('inquirer');
const theme_names_1 = __importDefault(require("./theme-names"));
module.exports = {
    askUsername: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your username to get your report:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    }
                    else {
                        return 'Please enter a username.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
    askTheme: () => {
        const questions = [
            {
                name: 'theme',
                type: 'list',
                message: 'Which theme do you want? (Use arrow keys)',
                choices: (0, theme_names_1.default)()
            }
        ];
        return inquirer.prompt(questions);
    },
    askNumberOfProfiles: () => {
        const maximumProfiles = 100;
        const questions = [
            {
                name: 'number',
                type: 'number',
                message: 'How many profiles do you want to be generated? Default:',
                default: 3,
                validate: function (value) {
                    const isNumber = !isNaN(parseInt(value));
                    const isInRange = parseInt(value) > 0 && parseInt(value) < maximumProfiles;
                    if (isNumber && isInRange) {
                        return true;
                    }
                    else {
                        return `Please enter a number between 0 and ${maximumProfiles}`;
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }
};
