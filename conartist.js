const { config, preset } = require('conartist');
const { babel, base, jest, rollup } = preset;

module.exports = config(babel(), base(), jest(), rollup(), {
  'rollup.config.js'() {
    return Object.assign({}, rollup()['rollup.config.js'](), {
      globals: {
        preact: 'Preact'
      },
      name: 'skateRendererPreact'
    });
  },
  'package.json':{
    types: 'types/index.d.ts',
    files: ['types/'],
    scripts: {
      "test:ts": "tsc -p types"
    },
    devDependencies:{
      typescript: '~2.5.2',
      skatejs: '5.0.0-beta.3'
    }
  }
});
