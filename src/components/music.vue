<template>
  <div class="music-audio-wrap">
    <div>
      <div>
        {{musicName}}
        <div v-for="(item, index) in artists">{{item.name}}<span v-if="index < (artists.length - 1)">/</span></div>
      </div>
      <div @click="getLyric(id)">
        <img :src="imgUrl" style="width: 200px; height: 200px" v-if="showImg">
        <div v-else>{{lyric}}</div>
      </div>
      <div>
        <span>{{currentMin}}:{{currentSec}}</span>
        <el-slider v-model="value1"></el-slider>
        <span>{{fullMin}}:{{fullSec}}</span>
      </div>
      <div>
        <span @click="getComment">评论</span>
      </div>
      <div>
        <div>模式</div>
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
        // value1: 0,
        musicUrl: '',
        // isPlaying: true,
        urlArr: [],
        // ind是播放的曲目，在当前播放列表的序列
        ind: null,
        artistsArr: [],
        // artists: '',
        // imgUrl: '',
        // pattern,0代表列表循环模式，1代表随机播放，2代表单曲循环
        pattern: 0,
        showImg: true,
        lyric: ''
        // fullTime: 0,
        // fullMin: 0,
        // fullSec: 0,
        // currentTime: 0,
        // currentMin: 0,
        // currentSec: 0
      }
    },
    mounted () {
      console.log(this.$store.state)
      this.currentMin = this.$store.state.currentMin
      this.currentSec = this.$store.state.currentSec
      this.currentTime = this.$store.state.currentTime
      this.fullMin = this.$store.state.fullMin
      this.fullSec = this.$store.state.fullSec
      this.fullTime = this.$store.state.fullTime
    },
    computed: {
      id () {
        return this.$store.state.nowMusic.id
      },
      musicName () {
        return this.$store.state.nowMusic.nowName
      },
      artists () {
        return this.$store.state.nowMusic.nowArtists
      },
      imgUrl () {
        return this.$store.state.nowMusic.nowImgurl
      },
      currentMin () {
        return this.$store.state.current.currentMin
      },
      currentSec () {
        return this.$store.state.current.currentSec
      },
      fullMin () {
        return this.$store.state.full.fullMin
      },
      fullSec () {
        return this.$store.state.full.fullSec
      },
      value1 () {
        return this.$store.state.current.value1
      },
      isPlaying () {
        return this.$store.state.isPlaying
      }
    },
    methods: {
      play () {
        console.log('play click')
        const audio = document.querySelector('#audio')
        if (!this.$store.state.isPlaying) {
          audio.play()
          // this.isPlaying = true
          this.$store.dispatch('changePlayStatus')
        } else {
          audio.pause()
          // this.isPlaying = false
          this.$store.dispatch('changePlayStatus')
        }
      },
      prew () {
        const ind = this.$store.state.nowMusic.ind === 0 ? this.$store.state.musicUrlList.length : this.$store.state.nowMusic.ind
        const obj1 = {
          ind: ind - 1,
          nowMusicUrl: this.$store.state.musicUrlList[ind - 1].url,
          nowName: this.$store.state.musicUrlList[ind - 1].name,
          nowArtists: this.$store.state.musicUrlList[ind - 1].artists,
          nowImgurl: this.$store.state.musicUrlList[ind - 1].imgUrl
        }
        this.$store.dispatch('changeMusic', obj1)
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
      getComment () {
        this.$router.push({path: `/comment/${this.$store.state.nowMusic.id}`})
      },
      getLyric (id) {
        this.$http.get(`http://localhost:3000/lyric?id=${id}`)
          .then((res) => {
            this.lyric = res.data.lrc.lyric
          }).then(() => {
            this.showImg = !this.showImg
          })
      }
    }
  }
</script>

<style scoped>
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
