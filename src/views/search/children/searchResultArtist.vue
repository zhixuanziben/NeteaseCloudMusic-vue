<template>
  <div>
    <div v-for="item in data.artists" @click="toArtistMsg(item.id)" class="each-artist">
      <div class="each-artist-pic">
        <img :src="item.img1v1Url" alt="">
      </div>
      <div class="each-artist-name">
        {{item.name}}
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
      // console.log(this.$route.query.val)
      this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=100`)
        .then((res) => {
          console.log(res.data.result)
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
        this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=100`)
        .then((res) => {
          this.data = res.data.result
          console.log(this.data)
        })
      }
    },
    methods: {
      toArtistMsg (id) {
        this.$router.push({path: `/artist/${id}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .each-artist {
    display: flex;
    .each-artist-pic {
      width: 1rem;
      padding: 0.1rem;
      img {
        width: 100%;
      }
    }
    .each-artist-name {
      margin-left: 0.1rem;
      flex: 1;
      line-height: 1rem;
      border-bottom: 1px solid #999;
    }
  }
</style>
