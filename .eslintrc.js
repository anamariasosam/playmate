module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],

    env: {
        browser: true,
    },

    rules: {
        semi: [1, 'never'],
        'arrow-parens': [1, 'as-needed'],
        'react/prefer-stateless-function': ['warn'],
    },
};
