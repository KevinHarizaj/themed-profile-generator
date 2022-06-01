import randomProfile from '../lib/cjs/random-profile.js'
import data from '../lib/cjs/profile-data.json'
import { Profile, Theme } from '../lib/cjs/types.js'

let theme: Theme
let profile: Profile

beforeEach(() => {
    const themeIdx = 0
    theme = Object.keys(data['themes'])[themeIdx] as Theme
    profile = randomProfile(theme)
})

test('Returns profile with age between minAge and maxAge depending on theme', () => {
    const age = profile.age
    expect(age).toBeGreaterThanOrEqual(data['themes'][theme]['minAge'])
    expect(age).toBeLessThanOrEqual(data['themes'][theme]['maxAge'])
})

test('Returns profile with last name included in lastName list', () => {
    expect(data['themes'][theme]['lastNames']).toContain(profile.lastName)
})

test('Returns profile with job included in jobs list of theme', () => {
    expect(data['themes'][theme]['jobs']).toContain(profile.job)
})
