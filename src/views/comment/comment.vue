<template>
  <div>
    <list-title title="评论" :count="total"></list-title>
    <header @click="playMusic()" class="comment-header">
      <div class="comment-pic">
        <img :src="musicpic" alt="" style="width: 80px; height: 80px">
      </div>
      <div class="comment-msg">
        <h3>{{musicname}}</h3>
        <artists :artists="artists"></artists>
      </div>
      <span class="icon-右键"></span>
    </header>
    <comment :hotcomment="hotcomment" :comment="comment"></comment>
  </div>
</template>

<script>
  import listTitle from '../../components/listTitle'
  import comment from '../../components/comment'
  export default {
    data () {
      return {
        musicname: '',
        artists: [],
        musicpic: '',
        total: 0,
        comment: [],
        hotcomment: []
      }
    },
    components: {
      comment,
      listTitle
    },
    // 导航进入评论页面后，隐藏底部音乐控制器
    beforeRouteEnter (to, from, next) {
      next(vm => {
        console.log(to)
        console.log(from)
        vm.$store.dispatch('changeControllerStatus')
      })
    },
    mounted () {
      this.$http.get(`http://localhost:3000/song/detail?ids=${this.$route.params.id}`)
        .then((res) => {
          this.musicname = res.data.songs[0].name
          this.musicpic = res.data.songs[0].al.picUrl
          this.artists = res.data.songs[0].ar
          console.log(this)
        })
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

<style lang="scss" scoped>
  .comment-header {
    display: flex;
    .comment-pic {
      padding: 0.1rem;
    }
    .comment-msg {
      margin-left: 0.1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    > span {
      width: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
