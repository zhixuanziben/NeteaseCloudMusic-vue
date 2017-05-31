<template>
  <div>
    <div v-for="item in playlists" @click="toAlbum(item.id)" class="each-songlist">
      <div class="each-songlist-left">
        <img :src="item.coverImgUrl" alt="">
      </div>
      <div class="each-songlist-right">
        <h3 class="each-songlist-name">{{item.name}}</h3>
        <div class="each-songlist-msg">
          {{item.trackCount}}首
          by
          {{item.creator.nickname}},
          播放{{item.playCount}}次
        </div>
      </div>
    </div>
    <mu-infinite-scroll 
      :loadingText="loadingText" 
      :loading="loading" 
      @load="fetchData"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        playlists: [],
        loading: false,
        loadingText: '努力加载中...'
      }
    },
    mounted () {
      this.fetchData()
    },
    // 计算当前搜索的值
    computed: {
      query () {
        return this.$route.query.val
      }
    },
    // query变化重新搜索
    watch: {
      query () {
        this.playlists = []
        this.fetchData()
      }
    },
    methods: {
      toAlbum (id) {
        this.$router.push({path: `/playlist/${id}`})
      },
      fetchData () {
        const offset = this.playlists.length
        this.loading = true
        this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=1000&limit=15&offset=${offset}`)
          .then((res) => {
            for (let list of res.data.result.playlists) {
              this.playlists.push(list)
            }
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .each-songlist {
    display: flex;
    .each-songlist-left {
      width: 1rem;
      padding: 0.1rem;
      img {
        width: 100%;
      }
    }
    .each-songlist-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid #F9FAFC;
      .each-songlist-name {
        font-size: 0.20rem;
        font-weight: 400;
      }
      .each-songlist-msg {
        font-size: 0.15rem;
        color: #666;
      }
    }
  }
</style>
