import cleanCss from 'vite-plugin-clean-css';

export default {
    plugins: [
        cleanCss({
            level: {
                2: {
                    removeUnusedAtRules: true,
                },
            },
        }),
    ],
};