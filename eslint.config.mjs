import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.node,
            },
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            "no-inner-declarations": 0,
            "no-constant-condition": 0,
            "no-unused-vars": 1,
            "no-console": 1,
            "no-empty": 1,
            "semi": 1,

            "max-len": ["warn", {
                code: 80,
            }],
        },
    }
];