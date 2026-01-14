import { createApp, type App } from "vue";

export const withSetup = async <T>(composable: () => T) => {
    let result: T;

    const app = createApp({
        setup() {
            result =  composable();
            return () => {};
        },
    });
    app.mount(document.createElement('div'));
    return [
        result,
        app
    ] as const;
};