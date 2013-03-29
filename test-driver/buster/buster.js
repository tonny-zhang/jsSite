var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "browser", // or "node"
    sources: [
        "src/arithmetic-stack.js"
    ],
    tests: [
        "tests/buster/*.js"
    ]
}