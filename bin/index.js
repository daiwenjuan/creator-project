#!/usr/bin/env node
var yargs = require('yargs')
var argv = yargs
  .version(require('../package.json').version, '-v,--version')
  .alias('n', 'name')
  .choices('n', ['template'])
  .help()
  .argv
require('../src/runCopy')(argv)