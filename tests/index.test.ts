import { randomName } from '../lib/cjs/index'
test("Testing 'random name' function", () => {
    expect([
        'Dwight Schrute',
        'Michael Scott',
        'Pam Beesly',
        'Jim Halpert'
    ]).toContain(randomName())
})
