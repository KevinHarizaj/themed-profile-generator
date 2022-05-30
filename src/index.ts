const randomProfile = require('./random-profile')

const chalk = require('chalk') // string styling
const clear = require('clear') // clearing the window
const figlet = require('figlet') // ASCII strings
const program = require('commander') // command-line interface prompter
const cmdPrompt = require('./inquire')
const fs = require('fs')

type Profile = {
    firstName: string
    lastName: string
    sex: string
    age: number
    job: string
}

type Theme = 'Middle Ages' | 'Sci-Fi Future' | 'Crime'

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

const run = async (): Promise<void> => {
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
        parseInt(themeIdx) < randomProfile.getThemeNames().length

    const isValidNumberOfProfiles =
        !isNaN(parseInt(numberOfProfiles)) &&
        parseInt(numberOfProfiles) > 0 &&
        parseInt(numberOfProfiles) > maximumProfiles

    if (isValidTheme && isValidNumberOfProfiles) {
        const theme: Theme = randomProfile.getThemeNames()[themeIdx]

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
    }
}

const listThemes = (): void => {
    const names: Array<string> = randomProfile.getThemeNames()
    console.log('Themes:')
    names.forEach((name: string, idx: number) =>
        console.log(`${idx} - ${name}`)
    )
}

const generateProfiles = (
    theme: Theme,
    numberOfProfiles: number
): Array<Profile> => {
    const profiles: Array<Profile> = []

    for (let i = 0; i < numberOfProfiles; i++) {
        profiles.push(randomProfile.getRandomProfile(theme))
    }

    return profiles
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
    .argument('<number>', 'Theme number')
    .argument('<number>', 'Number of profiles')
    .action(generate)

program
    .command('themes')
    .description('List all available themes')
    .action(listThemes)

// program.parse()
//generate('0', '1')
//listThemes()
run()

module.exports = { generateProfiles }
