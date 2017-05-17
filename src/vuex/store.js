import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
  state: {
    musicUrlList: [],
    isPlaying: true,
    isController: false,
    nowMusic: {
      ind: '',
      id: '',
      nowMusicUrl: '',
      nowName: '',
      nowArtists: '',
      nowImgurl: '',
      isPlaying: false
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
    },
    mvId: 0,
    moreMsg: {}
  },
  mutations: {
    oldMusicList (state) {
      state.musicUrlList = []
    },
    newMusicList (state, obj) {
      state.musicUrlList.push(obj)
    },
    insertMusic (state, obj) {
      state.musicUrlList.splice(obj.ind + 1, 0, obj)
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
    play (state, fromNext) {
      if (fromNext) {
        state.isPlaying = true
      } else {
        state.isPlaying = !state.isPlaying
      }
    },
    showController (state, playMusic) {
      if (playMusic) {
        state.isController = true
      } else {
        state.isController = !state.isController
      }
    },
    saveMvId (state, obj) {
      state.mvId = obj
    },
    saveMoreMsg (state, obj) {
      state.moreMsg = obj
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
    changePlayStatus (context, obj) {
      context.commit('play', obj)
    },
    pushMusic (context, obj) {
      context.commit('musicPush', obj)
    },
    changeControllerStatus (context, obj) {
      context.commit('showController', obj)
    },
    getmvId (context, obj) {
      context.commit('saveMvId', obj)
    },
    getMoreMsg (context, obj) {
      context.commit('saveMoreMsg', obj)
    },
    nextPlayMusic (context, obj) {
      context.commit('insertMusic', obj)
    }
  }
})
export default store
