const config = {
    testEnvironment: 'jsdom',
    modulePaths: ["<rootDir>"], // Added comma here
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
    moduleFileExtensions: ['js', 'jsx'],
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    }
  };
  
  export default config;
  