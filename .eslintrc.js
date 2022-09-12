module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	overrides: [
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react',
		'react-hooks',
		'@typescript-eslint',
		'prettier'
	],
	rules: {
		indent: [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'never'
		],
		'no-duplicate-imports': 'error',
		'spaced-comment': 'error',
		camelcase: 'error',
		'react/react-in-jsx-scope': 'off',
		'quote-props': ['error', 'as-needed']
	},
	settings: {
		'import/resolver': {
			typescript: {
	
			}
		},
		react: {
			version: 'detect'
		}
	},
}
