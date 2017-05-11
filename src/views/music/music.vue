<template>
  <div class="music-audio-wrap">
    <header>
      <div class="header-iconback" @click="back">
        <span class="icon-右键"></span>
      </div>
      <div class="header-title">
        <span class="header-music-name">
          {{musicName}}
        </span>
        <div v-for="(item, index) in artists" class="header-music-artists">
          {{item.name}}
          <span v-if="index < (artists.length - 1)">/</span>
        </div>
      </div>
    </header>
    <section class="music-main">
      <img src="../../assets/imgs/stick_bg.png" class="music-main-stick">
      <div class="music-main-pic">
        <img :src="imgUrl">
      </div>
    </section>
    <section class="music-section-icon">
      <span class="icon-aixin"></span>
      <span class="icon-comment" @click="getComment"></span>
      <span class="icon-省略"></span>
    </section>
    <section class="music-section-time">
      <span>{{currentMin}}:{{currentSec}}</span>
      <mu-slider v-model="value1" class="slider"></mu-slider>
      <span>{{fullMin}}:{{fullSec}}</span>
    </section>
    <div class="lyric-content">
      <span v-for="(item, index) of arr" v-if="(currentMin >= item.currentMin)&&(currentSec >= item.currentSec)&&(currentSec<=arr[index+1].currentSec)&&(currentMin<=arr[index+1].currentMin)">
        {{item.lyric}}
      </span>
    </div>
    <section class="music-section-contro">
      <span class="icon-列表循环"></span>
      <span class="icon-prewmusic" @click="prew"></span>
      <span class="icon-pause" @click="play" v-if="isPlaying"></span>
      <span class="icon-play" @click="play" v-else></span>
      <span class="icon-next" @click="next"></span>
      <span class="icon-list"></span>
    </section>
    <div class="music-bg" :style="{'background-image':'url(' + imgUrl + '?param=500y500' + ')'}"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        value: 50,
        musicUrl: '',
        urlArr: [],
        // ind是播放的曲目，在当前播放列表的序列
        ind: null,
        artistsArr: [],
        // pattern,0代表列表循环模式，1代表随机播放，2代表单曲循环
        pattern: 0,
        lyric: '',
        arr: []
      }
    },
    computed: mapState({
      id: state => state.nowMusic.id,
      musicName: state => state.nowMusic.nowName,
      artists: state => state.nowMusic.nowArtists,
      imgUrl: state => state.nowMusic.nowImgurl,
      currentMin: state => state.current.currentMin,
      currentSec: state => state.current.currentSec,
      fullTime: state => state.full.fullTime,
      fullMin: state => state.full.fullMin,
      fullSec: state => state.full.fullSec,
      value1: state => state.current.value1,
      isPlaying: state => state.isPlaying
    }),
    mounted () {
      this.getLyric(this.id)
      console.log(this.lyric)
    },
    // 导航离开音乐详细信息后，显示底部音乐控制器
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      console.log('good')
      this.$store.dispatch('changeControllerStatus', true)
      next()
    },
    methods: {
      play () {
        const audio = document.querySelector('#audio')
        if (!this.$store.state.isPlaying) {
          audio.play()
        } else {
          audio.pause()
        }
        this.$store.dispatch('changePlayStatus')
      },
      prew () {
        const ind = this.$store.state.nowMusic.ind === 0 ? this.$store.state.musicUrlList.length : this.$store.state.nowMusic.ind
        // 获得下一首歌曲的id
        const id = this.$store.state.musicUrlList[ind - 1].id
        // 由于获取的歌单，没有歌曲的url，需要先ajax请求url，再发送
        this.$http.get(`http://localhost:3000/music/url?id=${id}`)
          .then((res) => {
            // 下一首歌曲的url
            const url = res.data.data[0].url
            const {name, artists, imgUrl} = this.$store.state.musicUrlList[ind - 1]
            const nextObj = {
              id,
              ind: ind - 1,
              nowMusicUrl: url,
              nowName: name,
              nowArtists: artists,
              nowImgurl: imgUrl
            }
            this.$router.push({path: `/music/${id}`})
            this.$store.dispatch('changePlayStatus', true)
            this.$store.dispatch('changeMusic', nextObj)
          })
      },
      next () {
        // 如果是歌曲的最后一首，则ind为-1，以便下次取到的是第一首
        const ind = this.$store.state.nowMusic.ind === this.$store.state.musicUrlList.length - 1 ? -1 : this.$store.state.nowMusic.ind
        // 获得下一首歌曲的id
        const id = this.$store.state.musicUrlList[ind + 1].id
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
            this.$router.push({path: `/music/${id}`})
            this.$store.dispatch('changePlayStatus', true)
            this.$store.dispatch('changeMusic', nextObj)
          })
      },
      getComment () {
        this.$router.push({path: `/comment/${this.$store.state.nowMusic.id}`})
      },
      getLyric (id) {
        /*eslint-disable */
        const dateReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        this.$http.get(`http://localhost:3000/lyric?id=${id}`)
          .then((res) => {
            this.lyric = res.data.lrc.lyric
            // 获得的歌词是一个字符串，类似'[00:00:00] 歌词第一句/n[00:01:01] 歌词第二句/n'这种
            // 切割成一个数组，数组的每一项包含对应的时间和歌词
            const lyrics = this.lyric.split('\n')
            // 定义一个空数组，用来存放歌词，数组的每一项都是一个对象，对象包含时间属性和歌词属性
            for (var [ind, lyric] of lyrics.entries()) {
              // 正则匹配，获得包含时间的字符串，
              const eachtime = lyric.match(dateReg)
              var min = eachtime ? eachtime[0].slice(1, 3) : undefined 
              var sec = eachtime ? eachtime[0].slice(4, 6) : undefined
              // 将包含时间的字符串替换点，获得对应每一项的歌词
              const eachlyric = lyric.replace(dateReg, "").trim()
              this.arr[ind] = {
                date: eachtime,
                currentMin: min,
                currentSec: sec,
                lyric: eachlyric
              }
            }
            console.log(this.arr)
          })
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss">
  @mixin element-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .music-audio-wrap {
    .music-bg {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      filter: blur(0.4rem);
      background-repeat: no-repeat;
      background-size: cover;
      z-index: -1;
    }
    > header {
      display: flex;
      height: 1rem;
      border-bottom: 1px solid #fff9e8;
      .header-iconback {
        width: 0.55rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff9e8;
      }
      .header-title {
        flex: 1;
        @include element-center;
        .header-music-name {
          font-size: 0.15rem;
          color: #fff9e8;
        }
        .header-music-artists {
          font-size: 0.12rem;
          color: #665a3b;
        }
      }
    }
    .music-main {
      .music-main-stick {
        display: block;
        height: 1.2rem;
        margin: 0 auto;
        margin-top: -0.05rem;
        margin-bottom: -0.2rem;
      }
      .music-main-pic {
        background: url(../../assets/imgs/cd_wrapper.png);
        background-size: cover;
        margin: 0 auto;
        width: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: rotate 25s linear infinite;
        // animation-play-state: paused;
        img {
          width: 66%;
          margin: 0 auto;
          border-radius: 50%;
        }
      }
    }
    .music-section-icon {
      display: flex;
      width: 80%;
      margin: 0.7rem auto 0.4rem;
      color: #fff;
      font-size: 0.4rem;
      > span {
        flex: 1;
        text-align: center;
      }
    }
    .music-section-time {
      display: flex;
      width: 80%;
      margin: 0 auto;
      color: #fff;
      .slider {
        margin-left: 0.2rem;
        margin-right: 0.2rem;
      }
    }
    .lyric-content {
      height: 0.2rem;
      width: 100%;
      text-align: center;
    }
    .music-section-contro {
      display: flex;
      color: #fff;
      margin: 0.5rem 0;
      height: 1rem;
      line-height: 1rem;
      > span {
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.4rem;
      }
      .icon-play,
      .icon-pause {
        font-size: 0.7rem;
      }
    }
  }
  @keyframes rotate {
    0%{ 
      transform:rotate(0deg);
    } 100%{
      transform:rotate(360deg);
    }
  }
</style>
