const { config } = require('conartist');
const { babel, base, jest, rollup } = require('conartist/preset');

module.exports = config(babel(), base(), jest(), rollup(), {
  'rollup.config.js'() {
    return Object.assign({}, rollup()['rollup.config.js'](), {
      globals: {
        preact: 'Preact'
      },
      name: 'skateRendererPreact'
    });
  }
});
