import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.{test,spec}.js'],
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    },
    retry: 2,
    testTimeout: 30000,
    hookTimeout: 30000,
    reporters: ['default', 'html'],
    outputFile: {
      html: './reports/test-report.html'
    }
  }
});
