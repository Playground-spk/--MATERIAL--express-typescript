module.exports = {
  "preset": "ts-jest",
  "testEnvironment": "node",
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx)",
    "**/?(*.)+(spec|test).+(ts|tsx)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "node_modules/variables/.+\\.(t)s?$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!variables/.*)"
  ],
  "setupFilesAfterEnv": ['./jest.setup.js']
}