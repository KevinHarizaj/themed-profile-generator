import data from './profile-data.json'

const getThemeNames = (): Array<string> => {
    return Object.keys(data['themes'])
}

export default getThemeNames
