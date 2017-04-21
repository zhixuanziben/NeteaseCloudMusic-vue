import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
  state: {
    musicUrlList: [],
    isPlaying: true,
    nowMusic: {
      ind: '',
      id: '',
      nowMusicUrl: 'http://m2.music.126.net/7o5D4dA6271VktgawcbZFA==/18665309393829604.mp3',
      nowName: '',
      nowArtists: '',
      nowImgurl: '',
      isPlaying: true
    },
    full: {
      fullTime: '',
      fullMin: '',
      fullSec: ''
    },
    current: {
      currentTime: '',
      currentMin: '',
      currentSec: '',
      value1: ''
    }
  },
  mutations: {
    oldMusicList (state) {
      state.musicUrlList = []
    },
    newMusicList (state, obj) {
      state.musicUrlList.push(obj)
    },
    musicPush (state, obj) {
      state.musicUrlList.push(obj)
    },
    nowMusicUrl (state, obj) {
      state.nowMusic.ind = obj.ind
      state.nowMusic.id = obj.id
      state.nowMusic.nowMusicUrl = obj.nowMusicUrl
      state.nowMusic.nowName = obj.nowName
      state.nowMusic.nowArtists = obj.nowArtists
      state.nowMusic.nowImgurl = obj.nowImgurl
    },
    full (state, obj) {
      state.full.fullTime = obj.fullTime
      state.full.fullMin = obj.fullMin
      state.full.fullSec = obj.fullSec
    },
    current (state, obj) {
      state.current.currentTime = obj.currentTime
      state.current.currentMin = obj.currentMin
      state.current.currentSec = obj.currentSec
      state.current.value1 = obj.value1
    },
    play (state) {
      state.isPlaying = !state.isPlaying
    }
  },
  actions: {
    clearMusicList (context) {
      context.commit('oldMusicList')
    },
    getMusicList (context, obj) {
      context.commit('newMusicList', obj)
    },
    changeMusic (context, obj) {
      context.commit('nowMusicUrl', obj)
    },
    getFull (context, obj) {
      context.commit('full', obj)
    },
    changeCurrent (context, obj) {
      context.commit('current', obj)
    },
    changePlayStatus (context) {
      context.commit('play')
    },
    pushMusic (context, obj) {
      context.commit('musicPush', obj)
    }
  }
})
export default store
