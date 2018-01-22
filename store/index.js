import Vuex from 'vuex'
import {getRecipePageData} from '~/lib/api'

/**
 * This our global store state for our app.
 */
const createStore = () => new Vuex.Store({
  state: {
    menuMobileIsOpened: false,
    menu: false,
    routeData: false
  },
  mutations: {
    setMenuMobileIsOpened (state, value) {
      state.menuMobileIsOpened = value
    },
    setMenu (state, menu) {
      state.menu = menu
    },
    setRouteData (state, routeData) {
      state.routeData = routeData
    },
  },
  actions: {
    nuxtServerInit ({ dispatch }, { route }) {
      return dispatch('routeData', route)
    },
    async routeData ({commit}, route) {
      if (route.name == 'recipes-id') {
        const combined_data = await getRecipePageData(route.params.id)
        commit('setMenu', combined_data[2].data)
        commit('setRouteData', combined_data)
      }
    }
  }
})

export default createStore
