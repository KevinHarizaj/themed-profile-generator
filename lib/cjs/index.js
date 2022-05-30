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
const randomProfile = require('./random-profile');
const chalk = require('chalk'); // string styling
const clear = require('clear'); // clearing the window
const figlet = require('figlet'); // ASCII strings
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
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const theme = yield cmdPrompt.askTheme();
    console.log('Your theme: ', theme.theme);
    const numberOfProfiles = yield cmdPrompt.askNumberOfProfiles();
    console.log('Number of profiles: ', numberOfProfiles.number);
    // Generate profiles
    const profiles = generateProfiles(theme.theme, numberOfProfiles.number);
    console.log('Generating random profiles...');
    const jsonString = JSON.stringify(profiles);
    fs.writeFile('./tpg.json', jsonString, (err) => {
        if (err) {
            console.log('There was an error writing the file', err);
        }
        else {
            console.log(`Successfully generated ${numberOfProfiles.number} '${theme.theme}' profile(s) and written to tpg.json`);
        }
    });
});
const generate = (themeIdx, numberOfProfiles) => {
    const maximumProfiles = 100;
    const isValidTheme = !isNaN(parseInt(themeIdx)) &&
        parseInt(themeIdx) > -1 &&
        parseInt(themeIdx) < randomProfile.getThemeNames().length;
    const isValidNumberOfProfiles = !isNaN(parseInt(numberOfProfiles)) &&
        parseInt(numberOfProfiles) > 0 &&
        parseInt(numberOfProfiles) > maximumProfiles;
    if (isValidTheme && isValidNumberOfProfiles) {
        const theme = randomProfile.getThemeNames()[themeIdx];
        // Generate profiles
        const profiles = generateProfiles(theme, parseInt(numberOfProfiles));
        console.log('Generating random profiles...');
        const jsonString = JSON.stringify(profiles);
        fs.writeFile('./tpg.json', jsonString, (err) => {
            if (err) {
                console.log('There was an error writing the file', err);
            }
            else {
                console.log(`Successfully generated ${numberOfProfiles} '${theme}' profile(s) and written to tpg.json`);
            }
        });
    }
};
const listThemes = () => {
    const names = randomProfile.getThemeNames();
    console.log('Themes:');
    names.forEach((name, idx) => console.log(`${idx} - ${name}`));
};
const generateProfiles = (theme, numberOfProfiles) => {
    const profiles = [];
    for (let i = 0; i < numberOfProfiles; i++) {
        profiles.push(randomProfile.getRandomProfile(theme));
    }
    return profiles;
};
program
    .command('run')
    .description('CLI to generate a number of random profiles of a certain theme')
    .action(run);
program
    .command('generate')
    .description('Generate a number of random profiles of a certain theme')
    .argument('<number>', 'Theme number')
    .argument('<number>', 'Number of profiles')
    .action(generate);
program
    .command('themes')
    .description('List all available themes')
    .action(listThemes);
// program.parse()
//generate('0', '1')
//listThemes()
run();
module.exports = { generateProfiles };
