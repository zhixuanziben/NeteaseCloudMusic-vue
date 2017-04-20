<template>
  <div id="app">
    <router-view></router-view>
    <audio :src="musicUrl" controls="controls" id="audio" autoplay @ended="toNext" @loadedmetadata="getFullTime" @timeupdate="getCurrentTime"></audio>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ind: '',
      musicName: '',
      artists: '',
      imgUrl: ''
    }
  },
  computed: {
    musicUrl () {
      return this.$store.state.nowMusic.nowMusicUrl
    }
  },
  mounted () {
    // for (var i = 0; i < this.$store.state.musicUrlList.length; i++) {
      // if (this.$store.state.musicUrlList[i].url === this.musicUrl) {
        // this.ind = i
        // this.musicName = this.$store.state.musicUrlList[i].name
        // this.artists = this.$store.state.musicUrlList[i].artists
        // this.imgUrl = this.$store.state.musicUrlList[i].imgUrl
      // }
    // }
  },
  methods: {
    toNext () {
      const ind = this.$store.state.nowMusic.ind === this.$store.state.musicUrlList.length - 1 ? -1 : this.$store.state.nowMusic.ind
      const obj1 = {
        ind: ind + 1,
        nowMusicUrl: this.$store.state.musicUrlList[ind + 1].url,
        nowName: this.$store.state.musicUrlList[ind + 1].name,
        nowArtists: this.$store.state.musicUrlList[ind + 1].artists,
        nowImgurl: this.$store.state.musicUrlList[ind + 1].imgUrl
      }
      this.$store.dispatch('changeMusic', obj1)
    },
    getFullTime () {
      const audio = document.querySelector('#audio')
      this.fullTime = audio.duration
      this.fullMin = Math.floor(this.fullTime / 60)
      this.fullSec = Math.floor(this.fullTime % 60) < 10 ? '0' + Math.floor(this.fullTime % 60) : Math.floor(this.fullTime % 60)
      const obj = {
        fullTime: this.fullTime,
        fullMin: this.fullMin,
        fullSec: this.fullSec
      }
      this.$store.dispatch('getFull', obj)
    },
    getCurrentTime () {
      const audio = document.querySelector('#audio')
      this.currentTime = audio.currentTime
      this.value1 = (audio.currentTime / this.fullTime) * 100
      this.currentMin = Math.floor(this.currentTime / 60)
      this.currentSec = Math.floor(this.currentTime % 60) < 10 ? '0' + Math.floor(this.currentTime % 60) : Math.floor(this.currentTime % 60)
      const obj = {
        currentTime: this.currentTime,
        currentMin: this.currentMin,
        currentSec: this.currentSec,
        value1: this.value1
      }
      this.$store.dispatch('changeCurrent', obj)
    }
  }
}
</script>

<style>

</style>
