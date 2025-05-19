module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/test/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}; 