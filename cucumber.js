export default {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/step_definitions/**/*.js'],
    format: ['html:cucumber-report.html', 'summary'],
    publishQuiet: true
  }
};
