<template>
  <div class="music-audio-wrap">
    <div>
      <div>
        {{musicName}}
        <div v-for="(item, index) in artists">
          {{item.name}}
          <span v-if="index < (artists.length - 1)">/</span>
        </div>
      </div>
      <div @click="getLyric(id)">
        <img :src="imgUrl" style="width: 200px; height: 200px" v-if="showImg">
        <div v-else>{{lyric}}</div>
      </div>
      <div>
        <span></span>
        <span @click="getComment">评论</span>
        <span></span>
      </div>
      <div>
        <span>{{currentMin}}:{{currentSec}}</span>
        <mu-slider v-model="value1"></mu-slider>
        <span>{{fullMin}}:{{fullSec}}</span>
      </div>
      <div class="">
        <span class="icon-list"></span>
        <span class="icon-prewmusic" @click="prew"></span>
        <span class="icon-next" @click="next"></span>
        <span class="icon-pause" @click="play" v-if="isPlaying"></span>
        <span class="icon-play" @click="play" v-else></span>
      </div>
    </div>
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
        showImg: true,
        lyric: ''
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

<style lang="scss">
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
