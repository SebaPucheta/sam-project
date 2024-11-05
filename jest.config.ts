import type { JestConfigWithTsJest } from 'ts-jest';

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const config: JestConfigWithTsJest = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // Use 'ts-jest' to run the tests.
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  roots: ['<rootDir>'],
  testPathIgnorePatterns: ['<rootDir>/.aws-sam/', '<rootDir>/build/', '<rootDir>/node_modules/'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.ts?$',

  // Equivalent to calling jest.clearAllMocks() before each test.
  clearMocks: true,

  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules'],
};

export default config;
