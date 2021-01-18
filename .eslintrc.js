module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        'airbnb',
        "plugin:react/recommended",
        "plugin:node/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // "import/newline-after-import": ["error", { "count": 2 }],
        // "no-unused-vars": "warn",
        // "no-console": "off",
        // "func-names": "off",
        // "no-process-exit": "off",
        // "object-shorthand": "off",
        // "indent": ["error", 2],
        // "node/no-unpublished-require": ["error", {
        //     "allowModules": [],
        //     "convertPath": null,
        //     "tryExtensions": [".js", ".json", ".node"]
        }]
    }
};
