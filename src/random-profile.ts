import data from './profile-data.json'
import { Theme, Profile } from './types'

const getRandomInt = (max: number, min = 0): number => {
    return Math.floor(Math.random() * (max - min) + min)
}

const getRandomProfile = (theme: Theme): Profile => {
    const sex: Profile['sex'] = data['sex'][getRandomInt(data['sex'].length)]

    const firstName: Profile['firstName'] =
        sex === 'male'
            ? data['firstNamesMale'][
                  getRandomInt(data['firstNamesMale'].length)
              ]
            : data['firstNamesFemale'][
                  getRandomInt(data['firstNamesFemale'].length)
              ]

    const lastName: Profile['lastName'] =
        data['themes'][theme]['lastNames'][
            getRandomInt(data['themes'][theme]['lastNames'].length)
        ]

    const age: Profile['age'] = getRandomInt(
        data['themes'][theme]['maxAge'] + 1,
        data['themes'][theme]['minAge']
    )

    const job: Profile['job'] =
        data['themes'][theme]['jobs'][
            getRandomInt(data['themes'][theme]['jobs'].length)
        ]

    return { firstName, lastName, sex, age, job }
}

export default getRandomProfile
