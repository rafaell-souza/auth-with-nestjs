export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testEnvironment: "node",
  testRegex: "src/.*\\.spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
