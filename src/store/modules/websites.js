import { WEBSITES_LIST, WEBSITES_BROWSE_NUM, WEBSITES_LIKE_NUM, WEBSITE_ADD, WEBSITE_UPDATE, WEBSITE_FINDBYID, WEBSITE_DELETE } from '../types'

const state = {
  list: [],
  listOne: {}
}

const mutations = {
  [WEBSITES_LIST] (state, data) {
    state.list = data.websites
  },
  [WEBSITES_BROWSE_NUM] (state, data) {
    // let list = state.list
    state.list.map(item => {
      if (item._id === data.wid) {
        item.browseNum = data.browseNum
      }
    })
    // state.list = list
  },
  [WEBSITES_LIKE_NUM] (state, data) {
    state.list.map(item => {
      if (item._id === data.wid) {
        item.likeNum = data.likeNum
      }
    })
  },
  [WEBSITE_ADD] (state, data) {
  },
  [WEBSITE_UPDATE] (state, data) {
    state.list = data.websites
  },
  [WEBSITE_FINDBYID] (state, data) {
    state.listOne = data.list
  },
  [WEBSITE_DELETE] (state, data) {
  }
}

export default {
  state,
  mutations
}
