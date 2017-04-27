<template>
  <div>
    <div class="player">
      <div class="player-main">
        <div class="player-main-left" @click="toMusicMsg(musicId)">
          <img :src="imgUrl">
        </div>
        <div class="player-main-main" @click="toMusicMsg(musicId)">
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
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        ind: '',
        value1: 0
      }
    },
    computed: mapState({
      musicUrl: state => state.nowMusic.nowMusicUrl,
      musicName: state => state.nowMusic.nowName,
      artists: state => state.nowMusic.nowArtists,
      imgUrl: state => state.nowMusic.nowImgurl,
      musicId: state => state.nowMusic.id,
      playStatus: state => state.isPlaying
    }),
    methods: {
      toNext () {
        this.next()
      },
      getFullTime () {
        const audio = document.querySelector('#audio')
        this.fullTime = audio.duration
        // padStart为了使类似时间1:9，显示为01:09
        this.fullMin = Math.floor(this.fullTime / 60).toString().padStart(2, '0')
        this.fullSec = Math.floor(this.fullTime % 60).toString().padStart(2, '0')
        let {fullTime, fullMin, fullSec} = this
        const obj = {fullTime, fullMin, fullSec}
        this.$store.dispatch('getFull', obj)
      },
      getCurrentTime () {
        const audio = document.querySelector('#audio')
        this.currentTime = audio.currentTime
        this.value1 = (audio.currentTime / this.fullTime) * 100
        this.currentMin = Math.floor(this.currentTime / 60).toString().padStart(2, '0')
        this.currentSec = Math.floor(this.currentTime % 60).toString().padStart(2, '0')
        let {currentTime, currentMin, currentSec, value1} = this
        const obj = { currentTime, currentMin, currentSec, value1 }
        this.$store.dispatch('changeCurrent', obj)
      },
      play () {
        const audio = document.querySelector('#audio')
        if (!this.$store.state.isPlaying) {
          audio.play()
        } else {
          audio.pause()
        }
        this.$store.dispatch('changePlayStatus')
      },
      next () {
        // 如果是歌曲的最后一首，则ind为-1，以便下次取到的是第一首
        const ind = this.$store.state.nowMusic.ind === this.$store.state.musicUrlList.length - 1 ? -1 : this.$store.state.nowMusic.ind
        // 获得下一首歌曲的id
        const id = this.$store.state.musicUrlList[ind + 1].id
        console.log(id)
        // 由于获取的歌单，没有歌曲的url，需要先ajax请求url，再发送
        this.$http.get(`http://localhost:3000/music/url?id=${id}`)
          .then((res) => {
            // 下一首歌曲的url
            const url = res.data.data[0].url
            const {name, artists, imgUrl} = this.$store.state.musicUrlList[ind + 1]
            const nextObj = {
              id,
              ind: ind + 1,
              nowMusicUrl: url,
              nowName: name,
              nowArtists: artists,
              nowImgurl: imgUrl
            }
            // this.$router.push({path: `/music/${id}`})
            this.$store.dispatch('changePlayStatus', true)
            this.$store.dispatch('changeMusic', nextObj)
          })
      },
      toMusicMsg (id) {
        this.$store.dispatch('changeControllerStatus')
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
