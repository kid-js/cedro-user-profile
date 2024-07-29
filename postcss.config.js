import postcssPresetEnv from 'postcss-preset-env';
import postcssSortMediaQueries from 'postcss-sort-media-queries';

export default {
    plugins: [
        postcssPresetEnv({
            stage: false,
            features: {
                'nesting-rules': true,
                'media-query-ranges': true,
            },
        }),
        postcssSortMediaQueries({
            sort: 'desktop-first',
        }),
    ],
};