import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: [
    "<rootDir>/src/**/*.test.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.spec.{js,jsx,ts,tsx}",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
};

export default createJestConfig(config);
