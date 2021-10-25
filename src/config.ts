export default {
  IS_NW: typeof (window as any).nw !== 'undefined',
  CONFIG_FOLDER: (window as any).nw ? (window as any).process.cwd() : '',
}
