<template>
  <div>
    <list-title :title="name"></list-title>
    <video-player  ref="videoPlayer"
                   :options="playerOptions"
                   title="you can listen some event if you need">
    </video-player>
    <div class="each-section-wrap">
      <span @click="goDetails">详情</span>
      <span @click="goComment">评论</span>
      <span @click="goSimilar">相关MV</span>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player'
  import listTitle from '../../components/listTitle.vue'
  export default {
    data () {
      return {
        MVURL: '',
        name: '',
        playerOptions: {
          // component options
          start: 0,
          playsinline: false,
          // videojs options
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/mp4',
            src: ''
          }],
          poster: ''
        }
      }
    },
    components: {
      listTitle,
      videoPlayer
    },
    mounted () {
      this.ajax()
      setTimeout(() => {
        // console.log('dynamic change options', this)
        this.playerOptions.muted = false
      }, 2000)
    },
    computed: {
      mvid () {
        return this.$store.state.mvId
      },
      player () {
        return this.$refs.videoPlayer.player
      }
    },
    watch: {
      mvid () {
        this.ajax()
      }
    },
    // 导航进入mv页面后，隐藏底部音乐控制器
    beforeRouteEnter (to, from, next) {
      next(vm => {
        const audio = document.querySelector('#audio')
        audio.pause()
        vm.$store.dispatch('changePlayStatus', false)
        vm.$store.dispatch('changeControllerStatus', false)
      })
    },
    // 导航进入mv页面后，显示底部音乐控制器
    beforeRouteLeave (to, from, next) {
      if (this.$store.state.musicUrlList.length !== 0) {
        this.$store.dispatch('changeControllerStatus', true)
      }
      next()
    },
    methods: {
      ajax () {
        this.$http.get(`http://localhost:3000/mv?mvid=${this.$route.params.id}`).then((res) => {
          this.MVURL = `http://localhost:3000/mv/url?url=${res.data.data.brs[240]}`
          this.playerOptions.sources[0].src = `http://localhost:3000/mv/url?url=${res.data.data.brs[240]}`
          this.name = res.data.data.name
          this.playerOptions.poster = res.data.cover
        })
      },
      goDetails () {
        this.$router.replace({path: `/mv/${this.$route.params.id}/details`})
      },
      goComment () {
        this.$router.replace({path: `/mv/${this.$route.params.id}/mvcomment`})
      },
      goSimilar () {
        this.$router.replace({path: `/mv/${this.$route.params.id}/similarMV`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .each-section-wrap {
    display: flex;
    > span {
      flex: 1;
      text-align: center;
    }
  }
</style>
