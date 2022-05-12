export const randomName = (): string => {
    const names: Array<string> = [
        'Dwight Schrute',
        'Michael Scott',
        'Pam Beesly',
        'Jim Halpert'
    ]
    return names[Math.floor(Math.random() * names.length)]
}
