module.exports = {
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^firebase/app$": "<rootDir>src/components/__mock__/firebase/firebase.js",
    "^firebase/auth$": "<rootDir>src/components/__mock__/firebase/firebase.js",
    "^firebase/firestore$":
      "<rootDir>src/components/__mock__/firebase/firebase.js",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!.*\\.jsx?$|.*\\.scss$)"],
  moduleNameMapper: {
    "\\.(scss)$": "<rootDir>/src/components/__mock__/style-mock.js",
  },
  testEnvironment: "jsdom",
  // setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  setupFiles: ["./jest.setup.js"],
};
