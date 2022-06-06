declare const cmdPrompt: {
    askUsername: () => Promise<any> & {
        ui: import("inquirer/lib/ui/prompt")<any>;
    };
    askTheme: () => Promise<any> & {
        ui: import("inquirer/lib/ui/prompt")<any>;
    };
    askNumberOfProfiles: () => Promise<any> & {
        ui: import("inquirer/lib/ui/prompt")<any>;
    };
};
export default cmdPrompt;
