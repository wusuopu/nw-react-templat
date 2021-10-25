nwjs + react 开发桌面应用。
该模板集成了 react + typescript + react-router + redux + storybook + styled-components 等工具，做到开箱即用。

## 环境变量配置
先下载 nw.js: https://nwjs.io/downloads/
再配置两个环境变量： `NWJS_SDK_PATH` 和 `NWJS_PATH` ；一个是用于开发环境，一个是用于打包发布。例如：
```
# Windows 系统
NWJS_SDK_PATH=<path>\\nw.exe
# MacOS 系统
NWJS_SDK_PATH=<path>/nwjs.app
# Linux 系统
NWJS_SDK_PATH=<path>/nw
```

## 开发
先安装依赖： `yarn`
运行 react 的 devServer； `yarn run start:web`
运行 nw 程序： `yarn run start:nw`

如果需要使用 chrome 的 react-devtools 和 redux-devtools 进行调度，则需要先在 chrome 中安装这两个插件。
由于 react 的 webpack 只能打包前端相关的 js 模块，如果需要使用 nodejs 的模块，则需要先将对应的模块加载到 `module/index.js`，然后执行 `yarn bundle` 将其他打包；
之后就可以通过 `src/lib/node.ts` 来引用。


## 打包发布
先打包 react 应用： `yarn run build:web`

再打包 nw 程序： `yarn run build:nw`；默认是针对当前系统进行打包。
如果是想跨平台打包，则需要传额外参数；如：
```
yarn run build:nw --win
yarn run build:nw --linux
yarn run build:nw --mac
```
同时还需要配置额外的环境变量，如：
```
NWJS_WIN_PATH=<path>\\nw.exe
NWJS_LINUX_PATH=<path>/nw
NWJS_MAC_PATH=<path>/nwjs.app
```

