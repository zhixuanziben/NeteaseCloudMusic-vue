import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const store = new vuex.Store({
  state: {
    musicUrlList: [],
    nowMusicUrl: ''
  },
  mutations: {
    urlList (state) {
    }
  },
  actions: {
    getUrlList (context, ind) {
      context.commit('urlList', ind)
    }
  }
})

export default store
