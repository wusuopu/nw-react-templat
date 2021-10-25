const fs = require('fs')
const _ = require('lodash')

let log  = _.concat([
  'running in yarn start',
], process.argv)
fs.writeFileSync('/tmp/craco.log', log.join('\n'))
