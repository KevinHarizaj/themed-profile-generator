import randomProfile from './random-profile'
import { Theme, Profile } from './types'

const generateProfiles = (
    theme: Theme,
    numberOfProfiles: number = 3
): Array<Profile> => {
    const profiles: Array<Profile> = []

    for (let i = 0; i < numberOfProfiles; i++) {
        profiles.push(randomProfile(theme))
    }

    return profiles
}

export default generateProfiles
