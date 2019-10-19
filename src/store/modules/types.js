import { TYPESS, NEW_TYPES, WEBSITE_ADD } from '../types'

const state = {
  typess: []
}

const mutations = {
  [TYPESS] (state, data) {
    state.typess = data.typess
  },
  [NEW_TYPES] (state, data) {
    state.typess.push(data)
  },
  [WEBSITE_ADD] (state, data) {
  }
}

export default {
  state,
  mutations
}
