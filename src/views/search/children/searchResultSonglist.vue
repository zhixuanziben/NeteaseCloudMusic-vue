<template>
  <div>
    <div v-for="item in data.playlists" @click="toAlbum(item.id)" class="each-songlist">
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: ''
      }
    },
    mounted () {
      this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=1000`)
        .then((res) => {
          this.data = res.data.result
        })
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
        this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=1000`)
        .then((res) => {
          this.data = res.data.result
        })
      }
    },
    methods: {
      toAlbum (id) {
        this.$router.push({path: `/playlist/${id}`})
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
