import themeNames from '../lib/cjs/theme-names'
import data from '../lib/cjs/profile-data.json'

test('Returns a list of all theme names', () => {
    const names = themeNames()
    expect(names.length).toEqual(Object.keys(data['themes']).length)
})
