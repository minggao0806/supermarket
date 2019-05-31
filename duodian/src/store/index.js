import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    location: {},
    addCar: []
  },
  mutations: {
    editAddress (state, list) {
      state.location = list
      console.log(this.location)
    },
    addFood (state, list) {
      state.addCar.push(list)
    }
  },
  actions: {
    edit (context, list) {
      context.commit('editAddress', list)
      console.log(list)
    }
  }
})

export default store
