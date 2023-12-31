module.exports = {
  coverageDirectory: './tests/coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/node_modules/**',
    "!<rootDir>/src/core/**",
    "!<rootDir>/src/models/**",
    "!<rootDir>/src/repository/**",
    "!<rootDir>/src/utils/**",
    "!<rootDir>/src/app/index.ts"
  ],
  forceExit: true,
  globals: {
    "ts-jest": {
      "tsconfig": "<rootDir>/tsconfig.json"
    }
  },
  preset: "ts-jest",
  roots: [
    "<rootDir>/tests"
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testMatch: [
    '**/__tests__/**/*.(js|ts|tsx)',
    '**/?(*.)+(spec|test).(js|ts|tsx)',
  ],
  moduleNameMapper: {
    "^container": "<rootDir>/src/container",
    "^app/(.*)$": "<rootDir>/src/app/$1",
    "^core/(.*)$": "<rootDir>/src/core",
    "^domain/(.*)$": "<rootDir>/src/domain/$1",
    "^infra/(.*)$": "<rootDir>/src/infra/$1",
    "^interfaces/(.*)$": "<rootDir>/src/interfaces/$1"
  },
  modulePaths: [],
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/src",
    "<rootDir>/(build|node_modules)/"
  ],
  transformIgnorePatterns:  [
    "<rootDir>/(build|node_modules)/"
  ],
  testEnvironment: 'node',
};
