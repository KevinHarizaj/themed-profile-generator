import inquirer from 'inquirer'
import themeName from './theme-names'

const cmdPrompt =  {
    askUsername: () => {
        const questions: object[] = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your username to get your report:',
                validate: function (value: string) {
                    if (value.length) {
                        return true
                    } else {
                        return 'Please enter a username.'
                    }
                }
            }
        ]
        return inquirer.prompt(questions)
    },
    askTheme: () => {
        const questions: object[] = [
            {
                name: 'theme',
                type: 'list',
                message: 'Which theme do you want? (Use arrow keys)',
                choices: themeName()
            }
        ]
        return inquirer.prompt(questions)
    },
    askNumberOfProfiles: () => {
        const maximumProfiles = 100
        const questions: object[] = [
            {
                name: 'number',
                type: 'number',
                message:
                    'How many profiles do you want to be generated? Default:',
                default: 3,
                validate: function (value: string) {
                    const isNumber = !isNaN(parseInt(value))
                    const isInRange =
                        parseInt(value) > 0 && parseInt(value) < maximumProfiles
                    if (isNumber && isInRange) {
                        return true
                    } else {
                        return `Please enter a number between 0 and ${maximumProfiles}`
                    }
                }
            }
        ]
        return inquirer.prompt(questions)
    }
}

export default cmdPrompt
