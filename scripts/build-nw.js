require('dotenv').config({ path: '.env.local' })
const fs = require('fs-extra')
const archiver = require('archiver');
const _ = require('lodash')
const path = require('path')
const mkdirp = require('mkdirp')
const app = require('../src/app.json')

const genManifest = () => {
  let manifest = {
    "name": app.appName,
    "main": "index.html",
    "window": _.assign({
      "width": 1300,
      "height": 800,
      "position": "center",
      "min_width": 1200,
      "min_height": 700
    }, app.window),
    "show": false,
    "permissions": [ "chrome-extension://*", "file:///*", "http://*/*", "https://*/*" ],
    "chromium-args": '--user-data-dir=nwjs-profile',
    "node-remote": 'file:///*',
  }
  if (!fs.existsSync('build')) { fs.mkdirSync('build') }
  fs.writeFileSync(path.join('build', 'package.json'), JSON.stringify(manifest, undefined, 2))
}


// copy build files to nwjs folder
const bundle = async (nwjsBinPath, release) => {
  const OUTPUTS = {
    win32: 'win',
    linux: 'linux',
    darwin: 'mac',
  }
  let output = path.join('releases', OUTPUTS[release])
  if (await fs.exists(output)) {
    await (fs.rm || fs.rmdir)(output, {recursive: true})
  }
  mkdirp.sync(output)
  let nwjsDir = nwjsBinPath
  if (release !== 'darwin') {
    nwjsDir = path.dirname(nwjsBinPath)
  }

  return new Promise((resove, reject) => {
    let zipfileName = path.join(output, `app-${OUTPUTS[release]}-${app.version}.zip`)
    let zipfile = fs.createWriteStream(zipfileName)
    let archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', function(err) {
      reject(err);
    });
    zipfile.on('close', function() {
      console.log(`built ${release} complete to ${zipfileName}.`)
      resove();
    });
    archive.pipe(zipfile);

    let rootPath = release === 'darwin' ? `${app.appName}.app` : ''
    archive.directory(nwjsDir, rootPath || false);    // copy nwjs files to root
    archive.directory('build/', release === 'darwin' ? `${rootPath}/Contents/Resources/app.nw` : 'package.nw');
    archive.finalize();
  })

}

const build = async () => {
  genManifest()

  const osNames = {
    '--win': ['win32'],
    '--linux': ['linux'],
    '--mac': ['darwin'],
    '--all': ['win32', 'linux', 'darwin'],
  }
  const NWJS_ENV_NAME = {
    win32: 'NWJS_WIN_PATH',
    linux: 'NWJS_LINUX_PATH',
    darwin: 'NWJS_MAC_PATH',
  }
  const releases = osNames[process.argv[2]] || [process.platform]
  for (let release of releases) {
    console.log(`building for ${release}....`)

    let NWJS_BIN = process.env[NWJS_ENV_NAME[release]] || ''
    if (release === process.platform && !NWJS_BIN) { NWJS_BIN = process.env.NWJS_PATH }
    if (!NWJS_BIN || !fs.existsSync(NWJS_BIN)) {
      console.error(`nwjs path is error`)
      process.exit(1)
    }
    await bundle(NWJS_BIN, release)
  }
}
build()
