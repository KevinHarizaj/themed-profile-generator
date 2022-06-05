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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const theme_names_1 = __importDefault(require("./theme-names"));
const index_1 = __importDefault(require("./index"));
const chalk_1 = __importDefault(require("chalk")); // string styling
const clear_1 = __importDefault(require("clear")); // clearing the window
const figlet_1 = __importDefault(require("figlet")); // ASCII strings
const commander_1 = require("commander"); // command-line interface prompter
const inquire_1 = __importDefault(require("./inquire"));
const fs_1 = __importDefault(require("fs"));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, clear_1.default)();
    console.log(chalk_1.default.blue(figlet_1.default.textSync('Themed Profile Generator', {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    })));
    const theme = yield inquire_1.default.askTheme();
    console.log('Your theme: ', theme.theme);
    const numberOfProfiles = yield inquire_1.default.askNumberOfProfiles();
    console.log('Number of profiles: ', numberOfProfiles.number);
    // Generate profiles
    const profiles = (0, index_1.default)(theme.theme, numberOfProfiles.number);
    console.log('Generating random profiles...');
    const jsonString = JSON.stringify(profiles);
    fs_1.default.writeFile('./themed-profiles.json', jsonString, (err) => {
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
        parseInt(themeIdx) < (0, theme_names_1.default)().length;
    const isValidNumberOfProfiles = !isNaN(parseInt(numberOfProfiles)) &&
        parseInt(numberOfProfiles) > 0 &&
        parseInt(numberOfProfiles) < maximumProfiles;
    if (isValidTheme && isValidNumberOfProfiles) {
        const theme = (0, theme_names_1.default)()[parseInt(themeIdx)];
        // Generate profiles
        const profiles = (0, index_1.default)(theme, parseInt(numberOfProfiles));
        console.log('Generating random profiles...');
        const jsonString = JSON.stringify(profiles);
        fs_1.default.writeFile('./themed-profiles.json', jsonString, (err) => {
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
    const names = (0, theme_names_1.default)();
    console.log('Themes:');
    names.forEach((name, idx) => console.log(`${idx} - ${name}`));
};
commander_1.program
    .command('run')
    .description('CLI to generate a number of random profiles of a certain theme')
    .action(run);
commander_1.program
    .command('generate')
    .description('Generate a number of random profiles of a certain theme')
    .option('-t, --theme <number>', 'Specify the theme', '0')
    .option('-p, --profiles <number>', 'Specify the number of profiles', '3')
    .action((options) => {
    generate(options.theme, options.profiles);
});
commander_1.program
    .command('themes')
    .description('List all available themes')
    .action(listThemes);
commander_1.program.parse(process.argv);
