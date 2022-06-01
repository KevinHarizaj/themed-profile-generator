import generateProfiles from '../lib/cjs/index'

test('Returns 1 profile', () => {
    const profiles = generateProfiles('Middle Ages', 1)
    expect(profiles.length).toEqual(1)
})

test('Returns 3 profiles per default', () => {
    const profiles = generateProfiles('Middle Ages')
    expect(profiles.length).toEqual(3)
})
