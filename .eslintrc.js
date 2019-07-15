module.exports = {
    extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier', 'prettier/react', 'plugin:prettier/recommended', 'prettier/@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-hooks', 'prettier', '@typescript-eslint'],
    rules: {
      "prettier/prettier": 2,
      "import/prefer-default-export": 0,
      "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
    },
    env: {
      browser: true,
      node: true
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    },
  }