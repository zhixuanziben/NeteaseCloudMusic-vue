<template>
  <div>
    <list-title title="评论" :count="total"></list-title>
    <header @click="playMusic()" class="comment-header">
      <div class="comment-pic">
        <img :src="commentMsg.musicpic" alt="" style="width: 80px; height: 80px">
      </div>
      <div class="comment-msg">
        <h3>{{commentMsg.name}}</h3>
        <artists :artists="commentMsg.artists"></artists>
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
        name: '',
        artists: [],
        musicpic: '',
        total: 0,
        comment: [],
        hotcomment: [],
        commentType: ['music', 'playList', 'album']
      }
    },
    components: {
      comment,
      listTitle
    },
    computed: {
      commentMsg () {
        return this.$store.state.commentHeader
      }
    },
    // 导航进入评论页面后，隐藏底部音乐控制器
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('changeControllerStatus')
      })
    },
    mounted () {
      const type = this.commentType[this.$store.state.commentType]
      this.fetchData(type)
    },
    methods: {
      playMusic () {
        this.$router.go(-1)
      },
      fetchData (type) {
        this.$http.get(`http://localhost:3000/comment/${type}?id=${this.$route.params.id}&limit=20`)
          .then((res) => {
            // console.log(res)
            this.total = res.data.total
            this.comment = res.data.comments
            this.hotcomment = res.data.hotComments
            // console.log(res.data)
          })
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
