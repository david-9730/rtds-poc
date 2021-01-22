export interface Tweet {
    message: {
        entities: {
            hashtags: {text: string}[]
        }
        text: string;
        user: {
            name: string;
            profile_image_url: string;
            screen_name: string;
        }
    };
}
