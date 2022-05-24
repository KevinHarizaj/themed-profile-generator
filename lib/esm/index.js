"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const tpg = require('./random-profiles');
const chalk = require('chalk'); // string styling
const clear = require('clear'); // clearing the window
const figlet = require('figlet'); // ASCII strings
//const path = require('path') // path module
const program = require('commander'); // command-line interface prompter
const cmdPrompt = require('./inquire');
const fs = require('fs');
clear();
console.log(chalk.blue(figlet.textSync('Themed Profile Generator', {
    font: 'Big',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
})));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const theme = yield cmdPrompt.askTheme();
        console.log('Your theme: ', theme.theme);
        const numberOfProfiles = yield cmdPrompt.askNumberOfProfiles();
        console.log('Number of profiles: ', numberOfProfiles.number);
        // Generate profiles
        const profiles = tpg.generateProfiles(theme.theme, numberOfProfiles.number);
        const jsonString = JSON.stringify(profiles);
        fs.writeFile('./tpg.json', jsonString, (err) => {
            if (err) {
                console.log('There was an error writing the file', err);
            }
            else {
                console.log(`Thank you! ${numberOfProfiles.number} ${theme.theme} profiles were generated and successfully written to the file tpg.json`);
            }
        });
    });
}
// const listThemes = () => { return }
// program
//     .command('themes')
//     .description('List all available themes')
//     .action(listThemes)
// program: list themes, generate profiles -arg -arg ???
run();
