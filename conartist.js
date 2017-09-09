const { config } = require('conartist');
const { base, babel, rollup } = require('conartist/config');
const fs = require('fs');

if (fs.existsSync('LICENSE')) {
  base.LICENSE = fs.readFileSync('LICENSE');
}

module.exports = config(base, babel, rollup, {
  'package.json': require('./package.json')
});
