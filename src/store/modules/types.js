import { TYPESS, NEW_TYPES } from '../types'

const state = {
  typess: []
}

const mutations = {
  [TYPESS] (state, data) {
    state.typess = data.typess
  },
  [NEW_TYPES] (state, data) {
    state.typess.push(data)
  }
}

export default {
  state,
  mutations
}
