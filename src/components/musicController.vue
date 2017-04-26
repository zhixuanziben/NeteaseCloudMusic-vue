<template>
  <div>
    <div class="player">
      <div @click="toMusicMsg(musicId)" class="player-main">
        <div class="player-main-left">
          <img :src="imgUrl">
        </div>
        <div class="player-main-main">
          <div>
            <div class="musicname">{{musicName}}</div>
            <div class="artistsname">
              <span v-for="(item, index) in artists">{{item.name}}<span v-if="index < (artists.length - 1)">/</span></span>
            </div>
          </div>
        </div>
        <div class="player-main-right">
          <span class="icon-list"></span>
          <span class="icon-next" @click="next"></span>
          <span class="icon-pause" @click="play" v-if="playStatus"></span>
          <span class="icon-play" @click="play" v-else></span>
        </div>
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
      },
      playStatus () {
        return this.$store.state.isPlaying
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

<style lang="scss">
  @import './scss/icon.scss';
  .player-main {
    height: 0.8rem;
    display: flex;
    .player-main-left {
      padding: 0.1rem;
      > img {
        width: 0.6rem;
        height: 0.6rem
      }
    }
    .player-main-main {
      flex: 1;
      display: flex;
      align-items: center;
      .musicname {
        font-weight: 500;
        font-size: 0.2rem;
      }
      .artistsname {
        font-size: 0.15rem;
        color: #99A9BF;
      }
    }
    .player-main-right {
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        margin-right: 0.2rem;
        font-size: 0.4rem;
        color: #df2d2d;
      }
    }
  }
</style>
