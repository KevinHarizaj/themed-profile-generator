declare const randomProfile: any;
declare const chalk: any;
declare const clear: any;
declare const figlet: any;
declare const program: any;
declare const cmdPrompt: any;
declare const fs: any;
declare type Profile = {
    firstName: string;
    lastName: string;
    sex: string;
    age: number;
    job: string;
};
declare type Theme = 'Middle Ages' | 'Sci-Fi Future' | 'Crime';
declare const run: () => Promise<void>;
declare const generate: (themeIdx: any, numberOfProfiles: any) => void;
declare const listThemes: () => void;
declare const generateProfiles: (theme: Theme, numberOfProfiles: number) => Array<Profile>;
