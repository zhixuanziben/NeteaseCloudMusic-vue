<template>
  <div class="music-audio-wrap">
    <audio :src="musicUrl" controls="controls" id="audio" autoplay volume="0.1" @ended="toNext" @loadedmetadata="getFullTime" @timeupdate="getCurrentTime"></audio>
    <div>
      <div>
        {{musicName}}
        <div v-for="(item, index) in artists">{{item.name}}<span v-if="index < (artists.length - 1)">/</span></div>
      </div>
      <div>
        <img :src="imgUrl">
      </div>
      <div>
        <span>{{currentMin}}:{{currentSec}}</span>
        <el-slider v-model="value1"></el-slider>
        <span>{{fullMin}}:{{fullSec}}</span>
      </div>
      <div>
        <div @click="changePattern">模式</div>
        <div @click="prew">
          <icon name="prewmusic"></icon>
        </div>
        <div @click="next">
          <icon name="nextmusic"></icon>
        </div>
        <div @click="play">
          <icon name="pause" v-if="isPlaying"></icon>
          <icon name="play" v-else></icon>
        </div>
        <div>
          <icon name="list"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value1: 0,
        musicUrl: '',
        isPlaying: true,
        urlArr: [],
        // ind是播放的曲目，在当前播放列表的序列
        ind: null,
        musicName: '',
        artistsArr: [],
        artists: '',
        imgUrl: '',
        // pattern,0代表列表循环模式，1代表随机播放，2代表单曲循环
        pattern: 0,
        fullTime: 0,
        fullMin: 0,
        fullSec: 0,
        currentTime: 0,
        currentMin: 0,
        currentSec: 0
      }
    },
    mounted () {
      this.$http.get(`http://www.zhixuanvip.com/music/url?id=${this.$route.params.id}`)
        .then(function (res) {
          this.musicUrl = this.$store.state.nowMusicUrl
          for (var i = 0; i < this.$store.state.musicUrlList.length; i++) {
            if (this.$store.state.musicUrlList[i].url === this.musicUrl) {
              this.ind = i
              this.musicName = this.$store.state.musicUrlList[i].name
              this.artists = this.$store.state.musicUrlList[i].artists
              this.imgUrl = this.$store.state.musicUrlList[i].imgUrl
            }
          }
        })
    },
    filters: {
      filter (val) {
        if (val[val.length - 1] === '/') {
          val.splice(val.length - 1, 1)
        }
        return val
      }
    },
    methods: {
      changePattern () {

      },
      play () {
        console.log('play click')
        const audio = document.querySelector('#audio')
        if (!this.isPlaying) {
          audio.play()
          this.isPlaying = true
        } else {
          audio.pause()
          this.isPlaying = false
        }
      },
      prew () {
        this.musicUrl = this.$store.state.musicUrlList[this.ind - 1].url
        this.ind = this.ind - 1
        this.musicName = this.$store.state.musicUrlList[this.ind].name
        this.artists = this.$store.state.musicUrlList[this.ind].artists
        this.imgUrl = this.$store.state.musicUrlList[this.ind].imgUrl
      },
      next () {
        console.log('next click')
        this.musicUrl = this.$store.state.musicUrlList[this.ind + 1].url
        this.ind += 1
        this.musicName = this.$store.state.musicUrlList[this.ind].name
        this.artists = this.$store.state.musicUrlList[this.ind].artists
        this.imgUrl = this.$store.state.musicUrlList[this.ind].imgUrl
        console.log(this.musicUrl)
      },
      toNext () {
        console.log('hi')
        this.next()
      },
      getFullTime () {
        const audio = document.querySelector('#audio')
        this.fullTime = audio.duration
        this.fullMin = Math.floor(this.fullTime / 60)
        this.fullSec = Math.floor(this.fullTime % 60) < 10 ? '0' + Math.floor(this.fullTime % 60) : Math.floor(this.fullTime % 60)
      },
      getCurrentTime () {
        const audio = document.querySelector('#audio')
        this.currentTime = audio.currentTime
        this.value1 = (audio.currentTime / this.fullTime) * 100
        this.currentMin = Math.floor(this.currentTime / 60)
        this.currentSec = Math.floor(this.currentTime % 60) < 10 ? '0' + Math.floor(this.currentTime % 60) : Math.floor(this.currentTime % 60)
      }
    }
  }
</script>

<style scope>
  .music-audio-wrap {
    background-color: gray;
  }
  .slider {
    background-color: red;
    height: 0.10rem;
    width: 2rem;
  }
  .slider > div {
    width: 0.15rem;
    height: 0.15rem;
    margin-left: 0.5rem; 
  }
</style>
