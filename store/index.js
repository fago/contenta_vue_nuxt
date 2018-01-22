import Vuex from 'vuex'
import axios from '~/plugins/axios'

/**
 * This our global store state for our app.
 */
const createStore = () => new Vuex.Store({
  state: {
    menuMobileIsOpened: false,
    menu: false
  },
  mutations: {
    setMenuMobileIsOpened (state, value) {
      state.menuMobileIsOpened = value
    },
    setMenu (state, menu) {
      state.menu = menu
    },
  },
  actions: {
    nuxtServerInit ({ dispatch }) {
      return dispatch('menu')
    },
    menu ({commit}) {
      axios.get('/api/menuLinks').then(resp => {
        commit('setMenu', resp.data.data)
      })
    }
  }
})

export default createStore
