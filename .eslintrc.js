module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential'
    ],
    rules: {
        'array-bracket-spacing': ['error', 'never'],
        'arrow-spacing': 'error',
        'brace-style': ['error', 'stroustrup'],
        'comma-dangle': ['error', 'never'],
        'comma-spacing': ['error', {'before': false, 'after': true}],
        'computed-property-spacing': [2],
        curly: ['error'],
        'eol-last': ['error', 'always'],
        eqeqeq: ['error', 'always', {'null': 'ignore'}],
        indent: ['error', 4],
        'newline-before-return': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'object-shorthand': ['error', 'always', { 'avoidQuotes': true }],
        'prefer-const': 'error',
        'prefer-destructuring': ['error', {
                array: false,
                object: true
            }, {
                'enforceForRenamedProperties': false
            }],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'space-before-function-paren': ['error', 'always'],
        'spaced-comment': 'error',
        'space-in-parens': ['error', 'never'],
        'object-curly-spacing': ['error', 'never']
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}