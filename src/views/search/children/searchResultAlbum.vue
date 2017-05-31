<template>
  <div>
    <div v-for="item in albums" @click="toAlbumMsg(item.id)" class="each-album">
      <div class="each-album-pic">
        <img :src="item.blurPicUrl" alt="">
      </div>
      <div class="each-album-msg">
        <h3>
          {{item.name}}
        </h3>
        <p>
          {{item.artist.name}}
        </p>
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
        albums: [],
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
        this.albums = []
        this.fetchData()
      }
    },
    methods: {
      toAlbumMsg (id) {
        this.$router.push({path: `/album/${id}`})
      },
      fetchData () {
        const offset = this.albums.length
        this.loading = true
        this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=10&limit=15&offset=${offset}`)
          .then((res) => {
            this.data = res.data.result.albums
            for (let album of res.data.result.albums) {
              this.albums.push(album)
            }
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .each-album {
    display: flex;
    .each-album-pic {
      width: 1rem;
      height: 1rem;
      padding: 0.1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .each-album-msg {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid #F9FAFC;
      > h3 {
        font-size: 0.20rem;
        font-weight: 400;
      }
      > p {
        font-size: 0.12rem;
        color: #999;
      }
    }
  }
</style>
