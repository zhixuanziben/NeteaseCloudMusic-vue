<template>
  <div>
    <div v-for="item in data.albums" @click="toAlbumMsg(item.id)" class="each-album">
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
      this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=10`)
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
        this.$http.get(`http://localhost:3000/search?keywords=${this.$route.query.val}&type=10`)
        .then((res) => {
          this.data = res.data.result
        })
      }
    },
    methods: {
      toAlbumMsg (id) {
        this.$router.push({path: `/album/${id}`})
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
