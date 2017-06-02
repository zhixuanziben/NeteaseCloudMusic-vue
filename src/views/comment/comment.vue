<template>
  <div>
    <list-title title="评论" :count="total"></list-title>
    <header @click="playMusic()" class="comment-header" v-if="commentMsg">
      <div class="comment-pic">
        <img v-lazy="commentMsg.musicpic" alt="" style="width: 80px; height: 80px">
      </div>
      <div class="comment-msg">
        <h3>{{commentMsg.name}}</h3>
        <artists :artists="commentMsg.artists"></artists>
      </div>
      <span class="icon-右键"></span>
    </header>
    <comment :hotcomment="hotcomment" :comment="comments"></comment>
    <mu-infinite-scroll 
      :loadingText="loadingText" 
      :loading="loading" 
      @load="fetchData(commentType[type])"/>
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
        comments: [],
        hotcomment: [],
        commentType: ['music', 'playList', 'album'],
        loading: false,
        loadingText: '努力加载中...'
      }
    },
    components: {
      comment,
      listTitle
    },
    computed: {
      type () {
        return this.$store.state.commentType
      },
      commentMsg () {
        // 如果vuex中没有存储相关的评论头部信息，则重新加载
        if (!this.$store.state.commentHeader.artists) {
          this.$http.get(`http://localhost:3000/song/detail?ids=${this.$route.params.id}`)
            .then((res) => {
              let artists = res.data.songs[0].ar ? res.data.songs[0].ar : res.data.songs.artists
              let obj = {
                artists: artists,
                musicpic: res.data.songs[0].al.picUrl,
                name: res.data.songs[0].name
              }
              this.$store.dispatch('saveCommentHeader', obj)
              this.$store.dispatch('saveCommentType', 0)
              return this.$store.state.commentHeader
            })
        } else {
          return this.$store.state.commentHeader
        }
      }
    },
    // 导航进入评论页面后，隐藏底部音乐控制器
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('changeControllerStatus', false)
      })
    },
    // 导航进入评论页面后，显示底部音乐控制器
    beforeRouteLeave (to, from, next) {
      if (this.$store.state.musicUrlList.length !== 0) {
        this.$store.dispatch('changeControllerStatus', true)
      }
      next()
    },
    mounted () {
      const type = this.commentType[this.type]
      this.fetchData(type)
    },
    methods: {
      playMusic () {
        this.$router.go(-1)
      },
      fetchData (type) {
        const offset = this.comments.length
        this.loading = true
        this.$http.get(`http://localhost:3000/comment/${type}?id=${this.$route.params.id}&limit=10&offset=${offset}`)
          .then((res) => {
            this.total = res.data.total
            // 因为如果offset不是0的话，返回的数据就没有hotcomment了，所以要进行判断
            this.hotcomment = res.data.hotComments || this.hotcomment
            for (let comment of res.data.comments) {
              this.comments.push(comment)
            }
            this.loading = false
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
