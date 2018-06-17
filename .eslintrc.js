module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "eqeqeq": "error",
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        // allow console.log() statements:
        "no-console": 0,
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
