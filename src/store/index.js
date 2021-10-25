import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import selectPlugin from '@rematch/select';
import createRematchPersist from '@rematch/persist'
import storage from "redux-persist/lib/storage"
import app from './app'
import appJson from '../app.json'

const models = {
  app,
}

if (process.env.NODE_ENV !== 'development' && typeof(window) !== 'undefined') {
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = undefined;
}
const store = init({
  models,
  plugins: [
    selectPlugin(),
    createLoadingPlugin({
      type: 'number',
      blacklist: [
        'app/route$navigate',
        'app/route$reset',
        'app/route$push',
        'app/route$back',
        'app/ui$toast'
      ],
    }),
    createRematchPersist({
      whitelist: [],
      version: 1,
      key: `${appJson.bundleId}:rematch:root`,
      storage,
    })
  ],
  redux: {
    middlewares: [],
  }
})

export default store
