<template>
  <div id="app">
    <router-view class="view-wrap"></router-view>
    <div class="player">
      <div @click="toMusicMsg(musicId)">
        <div>
          <img :src="imgUrl" style="width: 0.4rem; height: 0.4rem">
        </div>
        <div>
          <div>{{musicName}}</div>
          <div>
            <div v-for="(item, index) in artists">{{item.name}}<span v-if="index < (artists.length - 1)">/</span></div>
          </div>
        </div>
      </div>
      <div @click="next">
        下一首
      </div>
      <div @click="play">
        暂停
      </div>
      <el-progress :percentage="value1" :text-inside="true" :stroke-width="2" status="exception" :show-text="false"></el-progress>
    </div>
    <audio :src="musicUrl" id="audio" autoplay @ended="toNext" @loadedmetadata="getFullTime" @timeupdate="getCurrentTime"></audio>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ind: '',
      value1: 0
    }
  },
  computed: {
    musicUrl () {
      return this.$store.state.nowMusic.nowMusicUrl
    },
    imgUrl () {
      return this.$store.state.nowMusic.nowImgurl
    },
    musicName () {
      return this.$store.state.nowMusic.nowName
    },
    artists () {
      return this.$store.state.nowMusic.nowArtists
    },
    musicId () {
      return this.$store.state.nowMusic.id
    }
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
    },
    play () {
      console.log('play click')
      const audio = document.querySelector('#audio')
      if (!this.$store.state.isPlaying) {
        audio.play()
        this.$store.dispatch('changePlayStatus')
      } else {
        audio.pause()
        this.$store.dispatch('changePlayStatus')
      }
    },
    next () {
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
    toMusicMsg (id) {
      this.$router.push({path: `/music/${id}`})
    }
  }
}
</script>

<style>
  .player {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: pink;
    
  }
  .view-wrap {
    margin-bottom: 1.2rem;
  }
</style>
