module.exports = {
    root: true,
    extends: "@react-native-community",
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
        "prettier/prettier": 0,
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        quotes: ["error", "double"],
        "@typescript-eslint/indent": ["error", 4],
        "react-hooks/exhaustive-deps": "warn",
    },
};
