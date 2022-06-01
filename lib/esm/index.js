import randomProfile from './random-profile';
const generateProfiles = (theme, numberOfProfiles = 3) => {
    const profiles = [];
    for (let i = 0; i < numberOfProfiles; i++) {
        profiles.push(randomProfile(theme));
    }
    return profiles;
};
export default generateProfiles;
