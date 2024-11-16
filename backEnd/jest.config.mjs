export default {
  transform: {
    "^.+\\.mjs$": "babel-jest",
  },
  moduleFileExtensions: ["js", "mjs", "json"], // Optional: include 'mjs'
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)", "**/?(*.)+(spec|test).mjs"],
};
