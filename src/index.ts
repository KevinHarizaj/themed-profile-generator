//import { randomName } from './random-name'
//export { randomName }

const tpg = require('./random-profiles')

const chalk = require('chalk') // string styling
const clear = require('clear') // clearing the window
const figlet = require('figlet') // ASCII strings
//const path = require('path') // path module
const program = require('commander') // command-line interface prompter
const cmdPrompt = require('./inquire')
const fs = require('fs')

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

async function run(): Promise<void> {
    const theme = await cmdPrompt.askTheme()
    console.log('Your theme: ', theme.theme)
    const numberOfProfiles = await cmdPrompt.askNumberOfProfiles()
    console.log('Number of profiles: ', numberOfProfiles.number)

    // generate profiles here
    const profiles = await tpg.generateProfiles(theme, numberOfProfiles)

    console.log('profiles:', profiles)

    // dummy profiles
    const dummyProfiles = [
        {
            name: 'Tom',
            age: 32,
            job: 'Photographer'
        },
        {
            name: 'Elsa',
            age: 23,
            job: 'Princess'
        }
    ]

    const jsonString = JSON.stringify(profiles)
    fs.writeFile('./tpg.json', jsonString, (err: any) => {
        if (err) {
            console.log('There was an error writing the file', err)
        } else {
            console.log(
                `Thank you! ${numberOfProfiles.number} ${theme.theme} profiles were generated and successfully written to the file tpg.json`
            )
        }
    })
}

// const listThemes = () => { return }

// program
//     .command('themes')
//     .description('List all available themes')
//     .action(listThemes)
// program: list themes, generate profiles -arg -arg ???

run()
