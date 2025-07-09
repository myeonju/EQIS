// npx ts-jest config:init 명령어로 생성

/* eslint-disable no-undef */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // @/로 시작하는 경로를 src/ 경로로 설정
    },
};