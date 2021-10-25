require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const app = require('../src/app.json')

let NWJS_BIN = process.env.NWJS_SDK_PATH || ''
if (process.platform === 'darwin') {
  NWJS_BIN = path.join(NWJS_BIN, 'Contents/MacOS/nwjs')
}
if (!NWJS_BIN || !fs.existsSync(NWJS_BIN)) {
  console.error('NWJS_SDK_PATH env is error')
  process.exit(1)
}

let isDev = process.argv[2] !== '--prod'
let extensionFolder = ''
if (process.platform === 'darwin') {
  extensionFolder = path.join(
    process.env.HOME,
    '/Library/Application Support/Google/Chrome/Default/Extensions'
  )
} else if (process.platform === 'linux') {
  extensionFolder = path.join(
    process.env.HOME,
    '/.config/google-chrome/Default/Extensions/'
  )
} else {
  extensionFolder = path.join(
    process.env.userprofile,
    '/AppData/Local/Google/Chrome/User Data/Default/Extensions'
  )
}

const getExtensionFolder = (extensionId) => {
  let extensionVersion = ''
  try {
    extensionVersion = fs.readdirSync(path.join(extensionFolder, extensionId))[0]
  } catch (err) {
  }
  if (!extensionVersion) { return '' }
  return path.join(extensionFolder, extensionId, extensionVersion)
}

const loadExtensions = () => {
  let args = []
  if (!isDev) { return '' }
  let extensions = [
    'fmkadmapgofadopljbjfkapdkoienihi',     // react-devtools
    'lmhkpmbekcpmknklioeibfkpmmfibljd'      // redux-devtools
  ]

  for (let extensionId of extensions) {
    let folder = getExtensionFolder(extensionId)
    if (folder) { args.push(folder) }
  }
  if (_.isEmpty(args)) { return '' }

  return `--load-extension='${args.join(',')}'`
}

let PORT = process.env.PORT || '3000'
let dist = 'dev'

const genManifest = () => {
  let NWJS_START_URL = `http://127.0.0.1:${PORT}`
  let manifest = {
    "name": app.appName,
    "main": NWJS_START_URL,
    "window": _.assign({
      "width": 1300,
      "height": 800,
      "position": "center",
      "min_width": 1200,
      "min_height": 700
    }, app.window),
    "show": false,
    "permissions": [ "chrome-extension://*", "file:///*", "http://*/*", "https://*/*" ],
    "chromium-args": loadExtensions(),
    "node-remote": `${NWJS_START_URL}/*`,     // "<all_urls>"
  }
  if (!fs.existsSync(dist)) { fs.mkdirSync(dist) }
  fs.writeFileSync(path.join(dist, 'package.json'), JSON.stringify(manifest, undefined, 2))
}

const openNW = () => {
  console.log('openNW:', NWJS_BIN)
  const spawn = require('cross-spawn');
  genManifest()
  spawn(NWJS_BIN, [dist])
}
module.exports = {
  openNW,
  genManifest,
};

openNW();
