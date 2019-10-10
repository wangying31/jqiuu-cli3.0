import { WEBSITES_LIST, WEBSITES_BROWSE_NUM, WEBSITES_LIKE_NUM, ADD_WEBSITES } from '../types'

const state = {
  list: []
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
  [ADD_WEBSITES] (state, data) {
    state.list.push(data.websites)
  }
}

export default {
  state,
  mutations
}
