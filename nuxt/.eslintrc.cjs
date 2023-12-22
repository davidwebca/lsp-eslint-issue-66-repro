const twConfig = require('./tailwind.config.cjs');

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'plugin:vue/vue3-recommended', 'plugin:tailwindcss/recommended'],
    parserOptions: {
        ecmaVersion: 2022,
    },
    plugins: ['vue', 'tailwindcss'],
    rules: {
        indent: ['error', 4],
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': [0, { 'packageDir ': './' }],
        'max-len': [
            'error',
            {
                code: 160,
                ignorePattern: 'class="([\\s\\S]*?)"|d="([\\s\\S]*?)"', // ignore classes or svg draw attributes
                ignoreUrls: true,
            },
        ],
        'vue/multi-word-component-names': 'off',
        'vue/script-indent': [
            'error',
            4,
            {
                baseIndent: 0,
                switchCase: 0,
            },
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
            },
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 2,
                },
                multiline: {
                    max: 1,
                },
            },
        ],
        'vue/v-on-style': ['error', 'longform'],
        'tailwindcss/no-custom-classname': [0],
        'tailwindcss/classnames-order': [1, { config: twConfig }],
        'no-plusplus': 0,
        'vue/no-v-html': 0,
        'no-unused-vars': 'warn',
        'no-debugger': 'warn',
        'no-console': 'warn',
        'no-underscore-dangle': 0,
        'no-undef': 0,
        'import/prefer-default-export': 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.svg', '.css'],
                moduleDirectory: ['node_modules', './'],
            },
            alias: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.svg', '.css'],
                map: [['~', './']],
            },
            typescript: {},
        },
    },
    overrides: [
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
            rules: {
                indent: 'off',
            },
        },
    ],
};
