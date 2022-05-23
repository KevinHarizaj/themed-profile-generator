declare const data: any;
declare type Profile = {
    firstName: string;
    lastName: string;
    sex: string;
    age: number;
    job: string;
};
declare type Theme = keyof typeof data['themes'];
declare const getRandomInt: (max: number, min?: number) => number;
declare const generateSingleProfile: (theme: Theme) => Profile;
declare const generateProfiles: (theme: Theme, numberOfProfiles: number) => Array<Profile>;
declare const getThemeNames: () => string[];
