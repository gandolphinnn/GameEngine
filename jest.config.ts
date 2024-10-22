import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	coverageProvider: 'v8',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'^@gandolphinnn/shared$': '<rootDir>/app/lib/shared/index.ts',
		'^@gandolphinnn/graphics$': '<rootDir>/app/lib/graphics/index.ts',
		'^@gandolphinnn/inputs$': '<rootDir>/app/lib/inputs/index.ts',
		'^@gandolphinnn/rigid$': '<rootDir>/app/lib/rigid/index.ts',
		'^@gandolphinnn/game$': '<rootDir>/app/lib/game/index.ts',
		'^node_modules/(.*)$': '<rootDir>/node_modules/$1',
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.jsx?$': 'babel-jest', // Add this line to handle ES modules
	},
	transformIgnorePatterns: [
		'/node_modules/(?!@gandolphinnn/utils)',
	],
};

export default config;