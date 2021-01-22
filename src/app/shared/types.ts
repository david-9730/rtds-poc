export interface Tweet {
    message: {
        entities: {
            hashtags: {text: string}[]
        }
        text: string;
    };
}
