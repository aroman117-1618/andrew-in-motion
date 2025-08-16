module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'pnpm start',
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'performance': ['error', {minScore: 0.9}],
        'layout-shift': ['error', {maxNumericValue: 0.05}],
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci'
    }
  }
};