export default {
    clearMocks: true,
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/test/singleton.js'],
}
