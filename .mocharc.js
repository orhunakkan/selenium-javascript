export default {
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "mochawesome-report",
    reportFilename: "mochawesome",
    overwrite: true,
    html: true,
    json: true,
  },
  timeout: 30000,
  spec: ["tests/**/*.spec.js"],
  recursive: true,
  exit: true
};
