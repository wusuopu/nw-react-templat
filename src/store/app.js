import _ from 'lodash'
import { createModel } from '@rematch/core'
import { createHashHistory } from 'history'

export default createModel()({
  state: {},
  selectors: (slice, createSelector, hasProps) => ({
  }),
  reducers: {

  },
  effects: {
    route$push(page) {
      if (_.isString(page)) {
        createHashHistory().push(page);
      } else {
        createHashHistory().push(page.path, page.state)
      }
      setTimeout(() => window.scrollTo(0, 0), 100);
    },
    route$back() {
      createHashHistory().goBack()
    },
    route$replace(page) {
      if (_.isString(page)) {
        createHashHistory().replace(page);
      } else {
        createHashHistory().replace(page.path, page.state)
      }
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }
})
