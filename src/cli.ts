import themeNames from './theme-names'
import generateProfiles from './index'

import { Theme } from './types'

const chalk = require('chalk') // string styling
const clear = require('clear') // clearing the window
const figlet = require('figlet') // ASCII strings
const program = require('commander') // command-line interface prompter
const cmdPrompt = require('./inquire')
const fs = require('fs')

const run = async (): Promise<void> => {
    clear()
    console.log(
        chalk.blue(
            figlet.textSync('Themed Profile Generator', {
                font: 'Big',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 80,
                whitespaceBreak: true
            })
        )
    )
    const theme = await cmdPrompt.askTheme()
    console.log('Your theme: ', theme.theme)
    const numberOfProfiles = await cmdPrompt.askNumberOfProfiles()
    console.log('Number of profiles: ', numberOfProfiles.number)

    // Generate profiles
    const profiles = generateProfiles(theme.theme, numberOfProfiles.number)
    console.log('Generating random profiles...')

    const jsonString = JSON.stringify(profiles)
    fs.writeFile('./tpg.json', jsonString, (err: any) => {
        if (err) {
            console.log('There was an error writing the file', err)
        } else {
            console.log(
                `Successfully generated ${numberOfProfiles.number} '${theme.theme}' profile(s) and written to tpg.json`
            )
        }
    })
}

const generate = (themeIdx: any, numberOfProfiles: any) => {
    const maximumProfiles = 100
    const isValidTheme =
        !isNaN(parseInt(themeIdx)) &&
        parseInt(themeIdx) > -1 &&
        parseInt(themeIdx) < themeNames().length

    const isValidNumberOfProfiles =
        !isNaN(parseInt(numberOfProfiles)) &&
        parseInt(numberOfProfiles) > 0 &&
        parseInt(numberOfProfiles) < maximumProfiles

    if (isValidTheme && isValidNumberOfProfiles) {
        const theme: Theme = themeNames()[themeIdx] as Theme

        // Generate profiles
        const profiles = generateProfiles(theme, parseInt(numberOfProfiles))
        console.log('Generating random profiles...')

        const jsonString = JSON.stringify(profiles)
        fs.writeFile('./tpg.json', jsonString, (err: any) => {
            if (err) {
                console.log('There was an error writing the file', err)
            } else {
                console.log(
                    `Successfully generated ${numberOfProfiles} '${theme}' profile(s) and written to tpg.json`
                )
            }
        })
    } else {
        console.log('Wrong input arguments')
    }
}

const listThemes = (): void => {
    const names: Array<string> = themeNames()
    console.log('Themes:')
    names.forEach((name: string, idx: number) =>
        console.log(`${idx} - ${name}`)
    )
}

program
    .command('run')
    .description(
        'CLI to generate a number of random profiles of a certain theme'
    )
    .action(run)

program
    .command('generate')
    .description('Generate a number of random profiles of a certain theme')
    .option('-t, --theme <number>', 'Specify the theme', '0')
    .option('-p, --profiles <number>', 'Specify the number of profiles', '3')
    .action((options: any) => {
        generate(options.theme, options.profiles)
    })

program
    .command('themes')
    .description('List all available themes')
    .action(listThemes)

program.parse(process.argv)
