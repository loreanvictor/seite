export default {
  verbose: true,
  clearMocks: true,
  transform: {},
  testEnvironment: 'node',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testMatch: ['**/test/**/*.test.m[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{mjs,jsx}',
    '!src/**/*.test.{mjs,jsx}',
    '!src/**/test/.*/*.{mjs, jsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 90,
      lines: 100,
      statements: 100,
    },
  },
}
