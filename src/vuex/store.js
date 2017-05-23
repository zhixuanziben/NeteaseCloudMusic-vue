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
    moreMsg: {},
    // 播放模式, 0代表列表顺序播放，1随机播放，2单曲循环
    playModel: 0,
    // 存储comment页面的来源, 0代表音乐，1代表歌单，2代表专辑，3代表mv
    commentType: 0,
    // 存储评论页面头部信息
    commentHeader: {}
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
    play (state, bol) {
      state.isPlaying = bol
    },
    showController (state, playMusic) {
      state.isController = playMusic
    },
    saveMvId (state, obj) {
      state.mvId = obj
    },
    saveMoreMsg (state, obj) {
      state.moreMsg = obj
    },
    changePlayModel (state, num) {
      state.playModel = num
    },
    changeCommentType (state, num) {
      state.commentType = num
    },
    changeCommentHeader (state, obj) {
      state.commentHeader = obj
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
    changePlayStatus (context, bol) {
      context.commit('play', bol)
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
    },
    genghuanPlayModel (context, num) {
      context.commit('changePlayModel', num)
    },
    saveCommentType (context, num) {
      context.commit('changeCommentType', num)
    },
    saveCommentHeader (context, obj) {
      context.commit('changeCommentHeader', obj)
    }
  }
})
export default store
