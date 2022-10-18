/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'xo',
	],
	overrides: [
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
	},
	ignorePatterns: [
		'dist/',
		'**/node_modules/',
		'.parcel-cache/',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
};
