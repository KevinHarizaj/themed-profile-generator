var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import themeNames from './theme-names';
import generateProfiles from './index';
import chalk from 'chalk'; // string styling
import clear from 'clear'; // clearing the window
import figlet from 'figlet'; // ASCII strings
import { program } from 'commander'; // command-line interface prompter
import cmdPrompt from './inquire';
import fs from 'fs';
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    clear();
    console.log(chalk.blue(figlet.textSync('Themed Profile Generator', {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    })));
    const theme = yield cmdPrompt.askTheme();
    console.log('Your theme: ', theme.theme);
    const numberOfProfiles = yield cmdPrompt.askNumberOfProfiles();
    console.log('Number of profiles: ', numberOfProfiles.number);
    // Generate profiles
    const profiles = generateProfiles(theme.theme, numberOfProfiles.number);
    console.log('Generating random profiles...');
    const jsonString = JSON.stringify(profiles);
    fs.writeFile('./themed-profiles.json', jsonString, (err) => {
        if (err) {
            console.log('There was an error writing the file', err);
        }
        else {
            console.log(`Successfully generated ${numberOfProfiles.number} '${theme.theme}' profile(s) and written to themed-profiles.json`);
        }
    });
});
const generate = (themeIdx, numberOfProfiles) => {
    const maximumProfiles = 100;
    const isValidTheme = !isNaN(parseInt(themeIdx)) &&
        parseInt(themeIdx) > -1 &&
        parseInt(themeIdx) < themeNames().length;
    const isValidNumberOfProfiles = !isNaN(parseInt(numberOfProfiles)) &&
        parseInt(numberOfProfiles) > 0 &&
        parseInt(numberOfProfiles) < maximumProfiles;
    if (isValidTheme && isValidNumberOfProfiles) {
        const theme = themeNames()[parseInt(themeIdx)];
        // Generate profiles
        const profiles = generateProfiles(theme, parseInt(numberOfProfiles));
        console.log('Generating random profiles...');
        const jsonString = JSON.stringify(profiles);
        fs.writeFile('./themed-profiles.json', jsonString, (err) => {
            if (err) {
                console.log('There was an error writing the file', err);
            }
            else {
                console.log(`Successfully generated ${numberOfProfiles} '${theme}' profile(s) and written to themed-profiles.json`);
            }
        });
    }
    else {
        console.log('Wrong input arguments');
    }
};
const listThemes = () => {
    const names = themeNames();
    console.log('Themes:');
    names.forEach((name, idx) => console.log(`${idx} - ${name}`));
};
program
    .command('run')
    .description('CLI to generate a number of random profiles of a certain theme')
    .action(run);
program
    .command('generate')
    .description('Generate a number of random profiles of a certain theme')
    .option('-t, --theme <number>', 'Specify the theme', '0')
    .option('-p, --profiles <number>', 'Specify the number of profiles', '3')
    .action((options) => {
    generate(options.theme, options.profiles);
});
program
    .command('themes')
    .description('List all available themes')
    .action(listThemes);
program.parse(process.argv);
