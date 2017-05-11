<template>
  <div>
    <div>
      评论({{total}}){{fromType}}
    </div>
    <div @click="playMusic()">
      <div>
        <img :src="musicpic" alt="" style="width: 80px; height: 80px">
      </div>
      <div>
        {{musicname}}
        <div v-for="(item, index) in artistname">{{item.name}}<span v-if="index < (artistname.length - 1)">/</span></div>
      </div>
    </div>
    <comment :hotcomment="hotcomment" :comment="comment"></comment>
    <span ref="fromtype"></span>
  </div>
</template>

<script>
  import comment from '../../components/comment'
  export default {
    data () {
      return {
        musicname: '',
        artistname: '',
        musicpic: '',
        total: '',
        comment: [],
        hotcomment: [],
        fromType: ''
      }
    },
    components: {
      comment
    },
    // 导航进入评论页面后，隐藏底部音乐控制器
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('changeControllerStatus')
      })
    },
    mounted () {
      console.log(this.$refs.fromType)
      this.musicname = this.$store.state.nowMusic.nowName
      this.musicpic = this.$store.state.nowMusic.nowImgurl
      this.artistname = this.$store.state.nowMusic.nowArtists
      this.$http.get(`http://localhost:3000/comment/music?id=${this.$route.params.id}&limit=20`)
        .then((res) => {
          // console.log(res)
          this.total = res.data.total
          this.comment = res.data.comments
          this.hotcomment = res.data.hotComments
          // console.log(res.data)
        })
    },
    methods: {
      playMusic () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  
</style>
