export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.scss$": "jest-css-modules-transform",
  },
  moduleNameMapper: {
    ".(css|less|sass|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
