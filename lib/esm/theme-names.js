import data from './profile-data.json';
const getThemeNames = () => {
    return Object.keys(data['themes']);
};
export default getThemeNames;
