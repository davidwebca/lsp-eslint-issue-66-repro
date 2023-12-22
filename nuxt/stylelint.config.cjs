module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
        'stylelint-config-recommended-vue',
    ],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer'],
            },
        ],
        'no-descending-specificity': null,
        'function-url-quotes': null,
        'function-no-unknown': null,
        'selector-class-pattern': null,
        'import-notation': null,
        'no-invalid-position-at-import-rule': null,
        'at-rule-empty-line-before': null,
    },
};
