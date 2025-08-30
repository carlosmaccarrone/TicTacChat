import path from 'path';

export default {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx", "mjs"],
  testEnvironment: "jest-environment-jsdom",
  extensionsToTreatAsEsm: [".jsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: [path.resolve("./jest.setup.mjs")]
};