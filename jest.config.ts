export default {
  verbose: true,
  clearMocks: true,
  testEnvironment: 'node',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testMatch: ['**/test/**/*.test.[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/test/.*/*.{js, jsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 90,
      lines: 100,
      statements: 100,
    },
  }
}
