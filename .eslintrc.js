module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '@vue/eslint-config-typescript/recommended',
    'airbnb-base',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:vue-scoped-css/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier'],
  ignorePatterns: ['.config.cjs', '/src/.d.ts', '/*.json', '/node_modules', '/*.md'],
  rules: {
    'prettier/prettier': 'error',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off', // 尽力了，真只能关掉：https://github.com/eslint/eslint/discussions/14667
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'error',
    'no-console': 'off',
    'no-shadow': 'off',
    'vue/multi-word-component-names': 'off',
    'vue-scoped-css/no-unused-selector': 'off',
    'vue/component-tags-order': ['error', { order: ['template', 'script', 'style'] }], // template统一在上
    'vue/component-name-in-template-casing': ['error', 'kebab-case', { registeredComponentsOnly: false }], // 模版都用烤串命名
    // 强制使用三等号
    eqeqeq: 'error',
    // 不使用Function，尽量使用函数声明：(a: string) => string
    '@typescript-eslint/ban-types': 'warn',
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'warn',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ], // 没包内容的标签都闭合
  },
};
