// nodejs modules

const modules = (window as any).MODULES || {}
export default {
  ...modules,
  process: (window as any).process,
};
